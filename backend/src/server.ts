import express from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import config from '@/config';
import limiter from '@/lib/express_rate_limit';
import v1Routes from './routes/v1';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongoose';
import { logger } from '@/lib/winston';
import { errorHandler } from './utils/CustomError';

const app = express();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'DEVELOPMENT' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORS Error: ${origin} is not allowed by CORS`),
        false,
      );
      logger.warn(`CORS Error: ${origin} is not allowed by CORS`);
    }
  },
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '1mb' }));

app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use(cookieParser());

app.use(
  compression({
    threshold: 1024, //Only compress responses larger than 1KB
  }),
);

app.use(helmet()); //Enhances Security by setting various HTTP Headers

app.use(limiter); // Rate Limiter

//IIFE to start the server
(async () => {
  try {
    await connectToDatabase();

    app.use('/api/v1', v1Routes);

    app.use(errorHandler);

    app.listen(config.PORT, () => {
      logger.info(`Server Running: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start the server', err);

    if (config.NODE_ENV === 'PRODUCTION') {
      process.exit(1);
    }
  }
})();

const handleServerShutdown = async () => {
  try {
    await disconnectFromDatabase();

    logger.warn('Server SHUTDOWN');
    process.exit(0);
  } catch (err) {
    logger.error('Error during server shutdown', err);
  }
};

process.on('SIGTERM', handleServerShutdown);
process.on('SIGINT', handleServerShutdown);
