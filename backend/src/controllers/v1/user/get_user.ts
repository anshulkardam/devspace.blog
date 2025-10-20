import { logger } from '@/lib/winston';
import User from '@/models/user';
import { CustomError } from '@/utils/CustomError';
import { NextFunction, Request, Response } from 'express';

const getUserbyId = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select('-__v').lean().exec();

    if (!user) {
      throw new CustomError('User not found', 404, 'NotFound');
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    logger.error('Error while getting a user', err);
    next(err);
  }
};

export default getUserbyId;
