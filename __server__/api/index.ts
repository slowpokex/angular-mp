import { Router } from 'express';

const apiRouter = new Router();

apiRouter.get('/echo', (req, res) => res.json({ message: 'Hello' }));

export default apiRouter;
