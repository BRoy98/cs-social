require('dotenv').config();
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import routes from './routes';
import { connectDB } from './models';
import { unless } from './helpers/unless-route';
import { errorMiddleware } from './middlewares/error.middleware';
import { rateLimitMiddleware } from './middlewares/rate-limit.middleware';
import { jwtAuthMiddleware } from './middlewares/auth.middleware';

const PORT = parseInt(process.env.PORT || process.env.NX_PORT || '3000', 10);

class CutShort {
  private app: express.Application;
  private httpServer: http.Server;

  constructor() {
    this.app = express();

    // app configs
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.disable('x-powered-by');

    connectDB();
    this.httpServer = http.createServer(this.app);
  }

  startServer = async () => {
    this.app.use(unless(/^\/auth.*/, jwtAuthMiddleware));
    this.app.use(rateLimitMiddleware);
    this.app.use(routes);
    this.app.use('*', (req, res) => res.status(404).send({}));
    this.app.use(errorMiddleware);

    await new Promise<void>((resolve) => {
      this.httpServer.listen({ port: PORT }, resolve);
    });

    console.log(`🚀 Server ready at http://localhost:${PORT}/`);
  };
}

const handler = () => {
  const cutShort = new CutShort();
  cutShort.startServer();
  return cutShort;
};

export default handler;
