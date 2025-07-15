import express, { Application } from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';
import usersRoutes from '../modules/modules.routes';
import authRoutes from '../modules/auth/auth.routes';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8081';

    //Conectar a base dedatos
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas de la aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //Cors
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio Publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use('/api', usersRoutes);
    this.app.use('/api', authRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puertoo ${this.port}`);
    });
  }
}

export default Server;
