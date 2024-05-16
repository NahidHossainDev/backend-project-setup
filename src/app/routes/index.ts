import { Router } from 'express';
import { UserRouter } from '../modules/users/user.router';

const appRouter = Router();

const routerModule = [{ path: '/user', router: UserRouter }];

routerModule.forEach(el => appRouter.use(el?.path, el?.router));

export default appRouter;
