import { logger } from '@/lib/winston';
import User from '@/models/user';
import { NextFunction, Request, Response } from 'express';

const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const limit = (req.query.limit as string) || '10';
  const offset = (req.query.offset as string) || '0';

  try {
    const total = await User.countDocuments();

    const users = await User.find()
      .select('-__v')
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .lean()
      .exec();

    res.status(200).json({
      limit,
      offset,
      total,
      users,
    });
  } catch (err) {
    logger.error('Error while getting all user', err);
    next(err);
  }
};

export default getAllUser;
