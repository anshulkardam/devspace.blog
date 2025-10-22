import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import Like from '@/models/like';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '@/utils/CustomError';

const unLikeBlog = async (
  req: Request<never, never, never, never>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { blogId } = req.params;
  const userId = req.userId;

  try {
    const existingLike = await Like.findOne({ blogId, userId }).lean().exec();

    if (!existingLike) {
      throw new CustomError('Like not found', 404, 'notfound');
    }

    await Like.deleteOne({ _id: existingLike._id });

    const blog = await Blog.findById(blogId).select('likesCount').exec();

    if (!blog) {
      throw new CustomError('Blog not found', 404, 'notfound');
    }

    blog.likesCount--;
    await blog.save();

    res.sendStatus(204);
  } catch (err) {
    logger.error('Error during like creation', err);
    next(err);
  }
};

export default unLikeBlog;
