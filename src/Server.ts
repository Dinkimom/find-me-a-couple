import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { MongoClient } from 'mongodb';
import { connectionString } from '../config/db';
import * as controllers from './controllers';
import { checkAuth } from './middleware/checkAuth';

const bearerToken = require('express-bearer-token');

class ExampleServer extends Server {
  private readonly SERVER_STARTED = 'Example server started on port: ';
  public mongoClient: MongoClient = new MongoClient(connectionString);

  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bearerToken());
    this.app.use(cors());
    this.app.use(checkAuth);
    this.setupControllers();
    this.setupMongoClient();
  }

  private setupMongoClient(): void {
    return this.mongoClient.connect((err, client) => {
      if (err) return console.log(err);

      this.mongoClient = client;
    });
  }

  private setupControllers(): void {
    const ctlrInstances = [];
    for (const name in controllers) {
      if (controllers.hasOwnProperty(name)) {
        const controller = (controllers as any)[name];
        ctlrInstances.push(new controller());
      }
    }
    super.addControllers(ctlrInstances);
  }

  public start(port: number): void {
    this.app.get('*', (req, res) => {
      res.send(this.SERVER_STARTED + port);
    });
    this.app.listen(port, () => {
      Logger.Imp(this.SERVER_STARTED + port);
    });
  }
}

export default ExampleServer;
