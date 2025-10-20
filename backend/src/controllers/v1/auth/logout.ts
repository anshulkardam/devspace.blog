import { logger } from '@/lib/winston';
import Token from '@/models/token';
import { Response, Request, NextFunction } from 'express';
import config from '@/config';

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken as string;

    if (refreshToken) {
      await Token.deleteOne({ token: refreshToken });

      logger.info('user token deleted out successfully', {
        userId: req.userId,
        token: refreshToken,
      });
    }
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: config.NODE_ENV === 'PRODUCTION',
      sameSite: 'strict',
    });
    res.sendStatus(204);

    logger.info('user logged out successfully');
  } catch (err) {
    logger.error('Error during logout', err);
    next(err);
  }
};

export default logout;
