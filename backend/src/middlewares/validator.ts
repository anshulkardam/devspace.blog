import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));

      res.status(400).json({
        status: 'ValidationError',
        error: errorMessages,
      });
      return;
    }

    next();
  };
}
