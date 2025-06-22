import { instanceForJSON, instanceForMultipart } from "../../api/instance";
import { appconfig } from "../../config";


export const uploadImageToServer = async (file) => {

    try {
        const formData = new FormData();
        formData.append('imagefile', file);
        const result = await instanceForMultipart.post('website/upload-custom-image', formData);
        return result.data.message;
    } catch (error) {
        console.error('Error uploading file:', error);
        return appconfig.default_image;
    }


}

export const getDownloadableURL = async (imageLink) => {
    try {
        const response = await instanceForJSON.get(`bucket${imageLink}`);
        console.log("Downloadable URL:", response.data.url);
        return decodeURIComponent(response.data.url);
    } catch (error) {
        console.error('Error getting downloadable URL:', error);
        return appconfig.default_image;
    }
}

