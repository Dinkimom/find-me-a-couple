import axios, { AxiosResponse } from 'axios';
import { imageApiEntryPoint } from '../constants/imageApiEntryPoint';
import { ImageDto } from '../dtos/ImageDto';

export class ImageControl {
  public uploadImage = (image: File): Promise<AxiosResponse<ImageDto>> => {
    return axios.post(`${imageApiEntryPoint}/upload`, { image });
  };
}
