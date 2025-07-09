import express, { Application, Request, Response } from "express";
import cors  from "cors";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8081";
    //Middlewares
    this.middlewares();
    //Rutas de la aplicacion
    this.routes();
  }

  middlewares() {
    //Cors
    this.app.use(cors())

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/api", (req: Request, res: Response) => {
        res.json(
          {
            ok: true,
            msg: 'get Api'
          }
        );
    });
    this.app.put("/api", (req: Request, res: Response) => {
        res.status(400).json(
          {
            ok: true,
            msg: 'put Api'
          }
        );
    });
    this.app.post("/api", (req: Request, res: Response) => {
        res.status(201).json(
          {
            ok: true,
            msg: 'post Api'
          }
        );
    });
    this.app.delete("/api", (req: Request, res: Response) => {
        res.json(
          {
            ok: true,
            msg: 'delete Api'
          }
        );
    });
    this.app.patch("/api", (req: Request, res: Response) => {
        res.json(
          {
            ok: true,
            msg: 'patch Api'
          }  
        );
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puesto ${this.port}`);
    });
  }
}

export default Server;
