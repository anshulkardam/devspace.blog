import { logger } from '@/lib/winston';
import User from '@/models/user';

import { NextFunction, Request, Response } from 'express';

const deleteCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = req.userId;

  try {
    await User.deleteOne({ _id: userId });

    logger.info('User delete success', userId);

    res.sendStatus(204);
  } catch (err) {
    logger.error('Error while deleting current user', err);
    next(err);
  }
};

export default deleteCurrentUser;
