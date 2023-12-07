import { Request, Response } from 'express';

const Router = require('express');
const router = new Router();

router.get('/chat', (req: Request, res: Response) => {
  res.json({
    message: 'hello',
  });
});

export default router;
