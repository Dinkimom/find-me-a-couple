import { Server } from '@overnightjs/core'
import { Logger } from '@overnightjs/logger'
import * as bodyParser from 'body-parser'
import * as controllers from './controllers'
import { MongoClient, ObjectId } from 'mongodb'
import { connectionString } from '../config/db'

class ExampleServer extends Server {
  private readonly SERVER_STARTED = 'Example server started on port: '
  public mongoClient: MongoClient = new MongoClient(connectionString)

  constructor() {
    super(true)
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.setupControllers()
    this.setupMongoClient()
  }

  private setupMongoClient(): void {
    return this.mongoClient.connect((err, client) => {
      if (err) return console.log(err)

      this.mongoClient = client
    })
  }

  private setupControllers(): void {
    const ctlrInstances = []
    for (const name in controllers) {
      if (controllers.hasOwnProperty(name)) {
        const controller = (controllers as any)[name]
        ctlrInstances.push(new controller())
      }
    }
    super.addControllers(ctlrInstances)
  }

  public start(port: number): void {
    this.app.get('*', (req, res) => {
      res.send(this.SERVER_STARTED + port)
    })
    this.app.listen(port, () => {
      Logger.Imp(this.SERVER_STARTED + port)
    })
  }
}

export default ExampleServer
