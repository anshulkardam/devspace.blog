import { logger } from '@/lib/winston';
import Blog from '@/models/blog';
import { NextFunction, Request, Response } from 'express';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
const window = new JSDOM('').window;

const purify = DOMPurify(window);

const createBlog = async (
  req: Request<never, never, { title: string; content: string }, never>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { content, title } = req.body;
    const userId = req.userId;

    const cleanContent = purify.sanitize(content);

    const newBlog = await Blog.create({
      title,
      content: cleanContent,
      author: userId,
    });

    logger.info('New Blog created', newBlog);

    res.status(201).json({
      blog: newBlog,
    });
  } catch (err) {
    logger.error('Error during blog creation', err);
    next(err);
  }
};

export default createBlog;
