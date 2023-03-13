require('dotenv').config();
import http from 'http';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import CutShortError from './helpers/cutshort-error';
import { connectDB } from './models';

const PORT = parseInt(process.env.PORT || process.env.NX_PORT || '3000', 10);

class CutShort {
  private app: express.Application;
  private httpServer: http.Server;

  constructor() {
    this.app = express();

    // app configs
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.disable('x-powered-by');

    connectDB();
    this.httpServer = http.createServer(this.app);
  }

  startServer = async () => {
    this.app.use(routes);

    this.app.use('*', (req, res) => res.status(404).send({}));

    this.app.use((err, _, res, __) => {
      if (err instanceof CutShortError) {
        return res.status(err.statusCode || 400).send({
          success: false,
          error: {
            code: err.code,
            message: err.message,
          },
        });
      }

      return res.status(400).send({
        success: false,
        error: {
          code: 'error.something-went-wrong',
          message: 'Sorry, something went wrong.',
        },
      });
    });

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
