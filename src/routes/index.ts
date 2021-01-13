import { Router } from 'express';
import { accountRouter } from './AccountRouter';
import { datesRouter } from './DatesRouter';
import { usersRouter } from './UsersRouter';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', usersRouter);
router.use('/account', accountRouter);
router.use('/dates', datesRouter);

// Export the base-router
export default router;
