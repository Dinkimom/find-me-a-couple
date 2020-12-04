import axios, {
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import { serverEntryPoint } from '../constants/serverEntryPoint';
import { ErrorDto } from '../dtos/ErrorDto';
import { EntityEnum } from '../enums/EntityEnum';
import { AsyncStorage } from 'react-native';

export class AbstractControl {
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

  private handleErrorResponse = async (res: AxiosResponse) => {
    switch (res.status) {
      // case 404:
      //   window.location.href = '/not-found';
      //   break;

      case 401:
        window.location.href = '/login';
        break;

      case 403:
        await AsyncStorage.clear();
        throw res.data;

      default:
        throw res.data;
    }
  };

  private useRequestToken = async (config: AxiosRequestConfig) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  };

  private useResponseToken = async (res: AxiosResponse) => {
    if (res.data) {
      const { token } = res.data.result;
      if (token) {
        await AsyncStorage.setItem('token', res.data.result.token);
      }
    }

    return res;
  };
}
