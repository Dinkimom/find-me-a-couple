import axios, {
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import { SERVER_ENTRY_POINT } from 'constants/serverEntryPoint';
import { ErrorDto } from 'dtos/ErrorDto';
import { EntityEnum } from 'enums/EntityEnum';

export class AbstractControl {
  protected axios: AxiosInstance;

  public constructor(entity: EntityEnum) {
    this.axios = axios.create({
      baseURL: `${SERVER_ENTRY_POINT}/${entity}`,
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
      throw { errorMessage: 'No response from the server' };
    } else {
      throw { errorMessage: error.message };
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
        throw res.data;

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
    if (res.data) {
      const { token } = res.data.result;

      if (token) {
        localStorage.setItem('token', res.data.result.token);
      }
    }

    return res;
  };
}
