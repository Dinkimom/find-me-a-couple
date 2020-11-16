import { ErrorDto } from '../dtos/ErrorDto';

interface Props {
  isFetching: boolean;
  error: ErrorDto | null;
  onSubmit: (data: any) => void;
}

export type BaseFormProps<T = null> = Props;
