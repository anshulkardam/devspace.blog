import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import Like from '@/models/like';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '@/utils/CustomError';

const likeBlog = async (
  req: Request<never, never, { userId: string }, never>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { blogId } = req.params;
  const userId = req.userId;

  try {
    const blog = await Blog.findById(blogId).select('likesCount').exec();

    if (!blog) {
      throw new CustomError('Blog not found', 404, 'NotFound');
    }

    const existingLike = await Like.findOne({ blogId, userId }).lean().exec();

    if (existingLike) {
      throw new CustomError('badreq', 400, 'BadRequest');
    }

    await Like.create({ blogId, userId });

    blog.likesCount++;

    await blog.save();

    res.status(200).json({
      likesCount: blog.likesCount,
    });
  } catch (err) {
    logger.error('Error during like creation', err);
    next(err);
  }
};

export default likeBlog;
