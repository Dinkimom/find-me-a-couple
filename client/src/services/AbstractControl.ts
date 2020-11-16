import axios, {
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import { serverEntryPoint } from '../constants/serverEntryPoint';
import { ErrorDto } from '../dtos/ErrorDto';
import { EntityEnum } from '../enums/EntityEnum';

export class AbstractClient {
  protected axios: AxiosInstance;

  public constructor(entity: EntityEnum) {
    this.axios = axios.create({
      baseURL: `${serverEntryPoint}/${entity}`,
      timeout: 20000,
    });
    this.axios.interceptors.request.use(this.useRequestToken);
    this.axios.interceptors.response.use(this.useResponseToken);
    this.axios.interceptors.response.use(
      (res: AxiosResponse) => res,
      this.handleError
    );
  }

  private handleError = (error: AxiosError<ErrorDto>) => {
    if (error.response) {
      return this.handleErrorResponse(error.response);
    } else if (error.request) {
      console.log(error.request);
      throw new Error('No response from the server');
    } else {
      console.log('Error', error.message);
      throw new Error(error.message);
    }
  };

  private handleErrorResponse = (res: AxiosResponse) => {
    switch (res.status) {
      case 404:
        window.location.href = '/not-found';
        break;

      case 401:
        window.location.href = '/account/form';
        break;

      case 403:
        localStorage.clear();
        break;

      default:
        throw res.data;
    }
  };

  private useRequestToken = (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  };

  private useResponseToken = (res: AxiosResponse) => {
    const { token } = res.data.result;

    if (token) {
      localStorage.setItem('token', res.data.result.token);
    }

    return res;
  };
}
