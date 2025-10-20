import { logger } from '@/lib/winston';
import User from '@/models/user';

import { NextFunction, Request, Response } from 'express';

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select('-__v').lean().exec();

    res.status(200).json({
      user,
    });
  } catch (err) {
    logger.error('Error while getting current user', err);
    next(err);
  }
};

export default getCurrentUser;
