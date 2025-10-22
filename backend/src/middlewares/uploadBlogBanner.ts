import UploadToCloudinary from '@/config/cloudinary';
import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import { CustomError } from '@/utils/CustomError';
import { Request, Response, NextFunction } from 'express';

const MAX_FILE = 2 * 1024 * 1024; // 2MB

const uploadBlogBanner = (method: 'post' | 'put') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (method === 'put' && !req.file) {
      next();
      return;
    }

    if (!req.file) {
      throw new CustomError('Blog Banner is required', 400, 'ValidationError');
    }

    if (req.file.size > MAX_FILE) {
      throw new CustomError(
        'File size must be less than 2MB',
        413,
        'ValidationError',
      );
    }

    try {
      const { blogId } = req.params;
      const blog = await Blog.findById(blogId)
        .select('banner.publicId')
        .lean()
        .exec();

      if (!blog) {
        throw new CustomError('Blog not found', 404, 'NotFound');
      }

      const data = await UploadToCloudinary(
        req.file.buffer,
        blog.banner.publicId.replace('devspace/', ''),
      );

      if (!data) {
        logger.error('Error while uploading to cloudinary', {
          blogId,
          publicId: blog?.banner.publicId,
        });
        throw new CustomError('Internal Server Error', 500, 'ServerError');
      }
      const newBanner = {
        publicId: data.public_id,
        url: data.secure_url,
        width: data.width,
        height: data.height,
      };
      logger.info('Blog banner uploaded to cloudinary', {
        blogId,
        banner: newBanner,
      });

      req.body.banner = newBanner;

      next();
    } catch (err) {
      next(err);
      logger.error('Upload blog banner failed', err);
    }
  };
};

export default uploadBlogBanner;
