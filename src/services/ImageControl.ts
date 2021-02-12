import axios, { AxiosResponse } from 'axios';
import { IMAGE_API_ENTRY_POINT } from 'constants/imageApiEntryPoint';
import { ImageDto } from 'dtos/ImageDto';

export class ImageControl {
    public uploadImage = (image: File): Promise<AxiosResponse<ImageDto>> => {
        const formData = new FormData();

        formData.append('image', image, image.name || 'image');

        return axios.post(IMAGE_API_ENTRY_POINT, formData, {
            headers: {
                Authorization: 'Client-ID 4f8d8f71b9bb9ab',
            },
        });
    };
}
