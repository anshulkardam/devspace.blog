import { logger } from '@/lib/winston';
import User from '@/models/user';
import { v2 as cloudinary } from 'cloudinary';
import Blog from '@/models/blog';
import { NextFunction, Request, Response } from 'express';
import blog from '@/models/blog';

const deleteCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = req.userId;

  try {
    const blogs = await Blog.find({ author: userId })
      .select('banner.publicId')
      .lean()
      .exec();

    const publicIds = blogs.map(({banner}) => banner.publicId)

    await cloudinary.api.delete_resources(publicIds)

    logger.info("Multi blog banner deletion", publicIds)

    await blog.deleteMany({author: userId})

    logger.info("blogs deletion",userid,blogs)
    await User.deleteOne({ _id: userId });

      //TODO: do same for delete user by admin
    logger.info('User delete success', userId);

    res.sendStatus(204);
  } catch (err) {
    logger.error('Error while deleting current user', err);
    next(err);
  }
};

export default deleteCurrentUser;
