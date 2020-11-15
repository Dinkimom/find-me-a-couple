import {
  Controller,
  Delete,
  Get,
  Middleware,
  Post,
  Put,
} from '@overnightjs/core';
import { Response } from 'express';
import { check, validationResult } from 'express-validator';
import { ObjectID } from 'mongodb';
import { EntityEnum } from '../enums/EntityEnum';
import { AbstractController } from './AbstractController';

@Controller('api/meetings')
export class MeetingsController extends AbstractController {
  constructor() {
    super(EntityEnum.Meetings);
  }

  @Get('/')
  private getMeetings(req: any, res: Response) {
    const meetings = this.getCollection()
      .find({ party: { $elemMatch: { email: req.user.email } } })
      .toArray();

    return res.status(200).send({ result: meetings });
  }

  @Post('/:_id')
  @Middleware([
    check('party').isArray({ min: 2, max: 2 }).not().isEmpty(),
    check('date').isDate(),
  ])
  private async getMeeting(req: any, res: Response) {
    const { _id } = req.params._id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errorMessage: 'Invalid form data',
        errors: errors.array(),
      });
    } else {
      const users = this.getCollection();
      let errorMessage = '';

      const { party } = req.body;
      let isValid = true;

      for (let i = 0; i < party.length; i++) {
        if (!isValid) {
          errorMessage = "Selected user is doesn't exist";
          break;
        }

        isValid = Boolean(users.findOne({ email: party[length] }));
      }

      if (isValid) {
      }

      return res.status(403).send({ errorMessage });
    }
  }

  @Put('/:_id/setStatus')
  private setStatus(req: any, res: Response) {
    const _id = new ObjectID(req.params._id);
    const collection = this.getCollection();

    collection.findOneAndUpdate(
      { _id, party: { $elemMatch: { email: req.user.email } } },
      { status: req.body.status }
    );

    res.send(200);
  }
}
