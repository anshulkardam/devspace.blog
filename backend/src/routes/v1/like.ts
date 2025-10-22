import likeBlog from '@/controllers/v1/like/like_blog';
import unLikeBlog from '@/controllers/v1/like/unlike_blog';
import authenticateUser from '@/middlewares/authenticateUser';
import authorize from '@/middlewares/authorize';
import { Router } from 'express';

const router: Router = Router();

router.post(
  '/blog/:blogId',
  authenticateUser,
  authorize(['admin', 'user']),
  likeBlog,
);

router.delete(
  '/blog/:blogId',
  authenticateUser,
  authorize(['admin', 'user']),
  unLikeBlog,
);

export default router;
