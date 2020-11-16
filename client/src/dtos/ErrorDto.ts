import { Error } from '../types/Error';

export interface ErrorDto {
  errorMessage: string;
  errors: Error[];
}
