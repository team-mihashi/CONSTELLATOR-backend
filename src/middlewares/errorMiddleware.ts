import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const errorMiddleware = (): ErrorRequestHandler => (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  next();
};

export default errorMiddleware;
