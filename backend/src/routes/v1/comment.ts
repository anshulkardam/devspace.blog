import commentBlog from '@/controllers/v1/comment/comment_blog';
import getCommentsByBlog from '@/controllers/v1/comment/get_comment_by_blog';
import authenticateUser from '@/middlewares/authenticateUser';
import authorize from '@/middlewares/authorize';
import { Router } from 'express';

const router: Router = Router();

router.post(
  '/blog/:blogId',
  authenticateUser,
  authorize(['admin', 'user']),
  commentBlog,
);
router.get(
  '/blog/:blogId',
  authenticateUser,
  authorize(['admin', 'user']),
  getCommentsByBlog,
);

router.delete(
  '/:commendId',
  authenticateUser,
  authorize(['admin', 'user']),
  commentBlog,
);
export default router;
