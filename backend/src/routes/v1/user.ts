import { Router } from 'express';
import authenticateUser from '@/middlewares/authenticateUser';
import authorize from '@/middlewares/authorize';
import getCurrentUser from '@/controllers/v1/user/get_current_user';
import updateCurrentUser from '@/controllers/v1/user/update_current_user';
import { validateData } from '@/middlewares/validator';
import deleteCurrentUser from '@/controllers/v1/user/delete_current_user';
import getAllUser from '@/controllers/v1/user/get_all_users';
import getUserbyId from '@/controllers/v1/user/get_user';
import deleteUserbyId from '@/controllers/v1/user/delete_user';
import { updateUserSchema } from '@/validators/user.validator';

const router: Router = Router();

router.get('/', authenticateUser, authorize(['admin']), getAllUser);

router.get(
  '/current',
  authenticateUser,
  authorize(['admin', 'user']),
  getCurrentUser,
);

router.patch(
  '/current',
  authenticateUser,
  authorize(['admin', 'user']),
  validateData(updateUserSchema),
  updateCurrentUser,
);

router.delete(
  '/current',
  authenticateUser,
  authorize(['admin', 'user']),
  deleteCurrentUser,
);

router.get('/:userId', authenticateUser, authorize(['admin']), getUserbyId);

router.delete(
  '/:userId',
  authenticateUser,
  authorize(['admin']),
  deleteUserbyId,
);

export default router;
