import { Router } from 'express';
import register from '@/controllers/v1/auth/register';
import { validateData } from '@/middlewares/validator';
import login from '@/controllers/v1/auth/login';
import refreshToken from '@/controllers/v1/auth/refresh_token';
import authenticateUser from '@/middlewares/authenticateUser';
import logout from '@/controllers/v1/auth/logout';
import { loginSchema, registerSchema } from '@/validators/auth.validator';

const router: Router = Router();

router.post('/register', validateData(registerSchema), register);

router.post('/login', validateData(loginSchema), login);

router.post('/logout', authenticateUser, logout);

router.post('/refreshToken', refreshToken);

export default router;
