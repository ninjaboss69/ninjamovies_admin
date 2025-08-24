import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { editorConfig } from './constant';
import { CustomUploadAdapterPlugin } from './CustomUploadAdapter';

function Editor({ setPostContent }) {
    return (
        <div className='w-full'>
            <CKEditor
                editor={editorConfig.editor}
                config={{
                    image: {
                        toolbar: [
                            'imageStyle:block',
                            'imageStyle:side',
                            '|',
                            'toggleImageCaption',
                            'imageTextAlternative',
                            '|',
                            'linkImage'
                        ]
                    },
                    extraPlugins: [CustomUploadAdapterPlugin],
                    licenseKey: editorConfig.licenseKey,
                    plugins: editorConfig.plugins,
                    toolbar: editorConfig.toolbar,
                    initialData: "",
                    // htmlSupport: {
                    //     allow: [
                    //         {
                    //             name: "img",
                    //             attributes: true,
                    //             classes: true,
                    //             styles: true
                    //         }
                    //     ]
                    // },

                    // image: {
                    //     toolbar: [
                    //         'toggleImageCaption',
                    //         'imageTextAlternative',
                    //         '|',
                    //         'imageStyle:inline',
                    //         'imageStyle:wrapText',
                    //         'imageStyle:breakText',
                    //         '|',
                    //         'resizeImage',
                    //         '|',
                    //         'ckboxImageEdit'
                    //     ]
                    // },
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log("data ", data);
                    console.log("hello")
                    setPostContent("content", data);
                }}
            />
        </div>

    );
}

export default Editor;
