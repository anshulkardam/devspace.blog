import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import User from '@/models/user';
import { CustomError } from '@/utils/CustomError';
import { Request, Response, NextFunction } from 'express';

const getBlogsbySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = req.userId;
  const slug = req.params.slug;

  try {
    const user = await User.findById(userId).select('role').lean().exec();

    if (!user) {
      throw new CustomError('User not found', 403, 'NotAuthorized');
    }

    const blog = await Blog.findOne({ slug })
      .select('-banner.publicId -__v')
      .populate('author', '-createdAt -updatedAt -__v')
      .lean()
      .exec();

    if (!blog) {
      throw new CustomError('Blog not Found', 404, 'NotFound');
    }

    if (user.role === 'user' && blog.status === 'draft') {
      throw new CustomError('access denied', 403, 'AuthError');
    }

    res.status(200).json({
      blog,
    });
  } catch (err) {
    logger.error('Error while getting all blogs by user', err);
    next(err);
  }
};

export default getBlogsbySlug;
