import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import User from '@/models/user';
import { CustomError } from '@/utils/CustomError';
import { Request, Response, NextFunction } from 'express';

interface QueryType {
  status?: 'draft' | 'published';
}

const getAllblogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const limit = (req.query.limit as string) || '10';
  const offset = (req.query.offset as string) || '0';
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select('role').lean().exec();

    const query: QueryType = {};
    if (!user) {
      throw new CustomError('User not found', 403, 'NotAuthorized');
    }

    if (user.role === 'user') {
      query.status = 'published';
    }
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
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
    logger.error('Error while getting all blogs', err);
    next(err);
  }
};

export default getAllblogs;
