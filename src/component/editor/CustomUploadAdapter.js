import { appconfig } from '../../config'
import { getDownloadableURL, uploadImageToServer } from './util'

class MyUploadAdapter {
    loader = null
    constructor(loader) {
        this.loader = loader
    }

    async singleFileUpload(file) {

        const imageLink = await uploadImageToServer(file);
        return `${appconfig.api_url}/bucket${imageLink}`

    }


    async upload() {
        try {
            return this.loader.file.then(
                (file) =>
                    new Promise((resolve, reject) => {
                        this.singleFileUpload(file)
                            .then((downloadURL) => {
                                console.log("Downloadable url is ",downloadURL);
                                return resolve({
                                    default: downloadURL
                                })
                            })
                            .catch((err) => {
                                console.log(err)
                                reject('something went messed up while uploading the image')
                            })
                    })
            )
        } catch (err) {
            console.log(err)
            return new Promise((resolve, reject) => {
                console.log("resolving error image");
                resolve(
                    { default: "https://uniqenviron.com/images/logo.png" }
                )

            })

        }
    }

    abort() {
        console.log("aborting upload");

        return Promise.resolve({
            default: ""
        })
    }


}


export function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader)
    }
}
