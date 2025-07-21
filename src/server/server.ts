import express, { Application } from 'express';
import fileUpload  from "express-fileupload";
import cors from 'cors';
import { dbConnection } from '../database/config';
import usersRoutes from '../modules/modules.routes';
import authRoutes from '../modules/modules.routes';
import categoriesRoutes from '../modules/modules.routes';
import productsRoutes from '../modules/modules.routes';
import searchRoutes from '../modules/modules.routes';
import uploadsRoutes from '../modules/modules.routes';

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

    this.app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));
  }

  routes() {
    this.app.use('/api', usersRoutes);
    this.app.use('/api', authRoutes);
    this.app.use('/api', categoriesRoutes);
    this.app.use('/api', productsRoutes);
    this.app.use('/api', searchRoutes);
    this.app.use('/api', uploadsRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

export default Server;
