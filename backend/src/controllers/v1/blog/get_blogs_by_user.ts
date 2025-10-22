import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import User from '@/models/user';
import { CustomError } from '@/utils/CustomError';
import { Request, Response, NextFunction } from 'express';

interface QueryType {
  status?: 'draft' | 'published';
}

const getBlogsbyUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const limit = (req.query.limit as string) || '10';
  const offset = (req.query.offset as string) || '0';
  const userId = req.params.userId;
  const currentUserId = req.userId;

  try {
    const CurrentUser = await User.findById(currentUserId)
      .select('role')
      .lean()
      .exec();

    const query: QueryType = {};
    if (!CurrentUser) {
      throw new CustomError('User not found', 403, 'NotAuthorized');
    }

    if (CurrentUser.role === 'user') {
      query.status = 'published';
    }

    const total = await Blog.countDocuments({ author: userId, ...query });
    const blogs = await Blog.find({ author: userId, ...query })
      .select('-banner.publicId -__v')
      .populate('author', '-createdAt -updatedAt -__v')
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      limit,
      offset,
      total,
      blogs,
    });
  } catch (err) {
    logger.error('Error while getting all blogs by user', err);
    next(err);
  }
};

export default getBlogsbyUserId;
