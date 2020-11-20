import { Controller, Get, Post, Put } from '@overnightjs/core';
import { EntityEnum } from '../enums/EntityEnum';
import { AbstractController } from './AbstractController';
import { Request, Response } from 'express';
import { DateDto } from 'src/dtos/DateDto';
import { ObjectID } from 'mongodb';

@Controller('api/dates')
export class DatesController extends AbstractController {
  constructor() {
    super(EntityEnum.Dates);
  }

  @Get('/')
  private async getDates(req: any, res: Response) {
    const collection = this.getCollection();

    let list = await collection
      .find({ participants: { $all: [req.user._id] } })
      .toArray();

    list = list.map((item) => {
      const users = collection.find({
        _id: {
          $all: [
            new ObjectID(item.participants[0]),
            new ObjectID(item.participants[1]),
          ],
        },
      });

      return {
        ...item,
        users,
      };
    });

    return res.status(200).send({ result: list });
  }

  @Post('/')
  private async createDate(req: Request<DateDto>, res: Response) {
    const collection = this.getCollection();

    collection.insertOne({ ...req.body }, (err, result) => {
      return res.status(200).send();
    });
  }

  @Put('/:_id')
  private async updateDate(req: Request<Partial<DateDto>>, res: Response) {
    const _id = new ObjectID(req.params._id);

    const collection = this.getCollection();

    collection.findOneAndUpdate({ _id }, { ...req.body }, (err, result) => {
      return res.status(200).send();
    });
  }
}
