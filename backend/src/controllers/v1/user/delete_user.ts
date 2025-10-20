import { logger } from '@/lib/winston';
import User from '@/models/user';
import { NextFunction, Request, Response } from 'express';

const deleteUserbyId = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.params.userId;

    await User.deleteOne({ _id: userId });
    logger.info('A user account has been deleted', userId);

    res.sendStatus(204);
  } catch (err) {
    logger.error('Error while getting a user', err);
    next(err);
  }
};

export default deleteUserbyId;
