import { ErrorDto } from '../dtos/ErrorDto';

export interface FormState {
  error: null | ErrorDto;
  isFetching: boolean;
}
