import { Router } from 'express';
import userRoutes from './user/user.routes';
import authRoutes from './auth/auth.routes';
import categoriesRoutes from './categories/categories.routes';
import productsRoutes from './products/products.routes';
import searchRoutes from './search/search.routes';
import uploadsRoutes from './uploads/uploads.routes';

const router = Router();
router.use('/users', userRoutes);
router.use('/auth', authRoutes); 
router.use('/categories', categoriesRoutes)
router.use('/products', productsRoutes)
router.use('/search', searchRoutes)
router.use('/uploads', uploadsRoutes)

export default router;  