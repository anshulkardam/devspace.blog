import { Router } from 'express';
import authRoutes from '@/routes/v1/auth';
import userRoutes from '@/routes/v1/user';
const router: Router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'devspace.blog API',
    status: 'ok',
    version: '1.0.0',
    docs: 'anshulkardam.vercel.app',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);

router.use('/users', userRoutes);

export default router;
