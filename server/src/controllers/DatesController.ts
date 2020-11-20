import { Controller, Get, Post, Put } from '@overnightjs/core';
import { EntityEnum } from '../enums/EntityEnum';
import { AbstractController } from './AbstractController';
import { Request, Response } from 'express';
import { DateDto } from '../dtos/DateDto';
import { ObjectID } from 'mongodb';
import { DateStatusEnum } from '../enums/DateStatusEnum';

@Controller('api/dates')
export class DatesController extends AbstractController {
  constructor() {
    super(EntityEnum.Dates);
  }

  @Get('/')
  private async getDates(req: any, res: Response) {
    const collection = this.getCollection();

    let list = await collection.find().toArray();

    list.filter((item) => item.inviter == req.user._id);

    return res.status(200).send({ result: list });
  }

  @Post('/')
  private async createDate(req: Request<DateDto>, res: Response) {
    const collection = this.getCollection();

    collection.insertOne({ ...req.body, status: DateStatusEnum.Opened }, () => {
      return res.status(200).send();
    });
  }

  @Put('/:_id')
  private async updateDate(req: Request<Partial<DateDto>>, res: Response) {
    const _id = new ObjectID(req.params._id);

    const collection = this.getCollection();

    collection.findOneAndUpdate({ _id }, { ...req.body }, () => {
      return res.status(200).send();
    });
  }
}
