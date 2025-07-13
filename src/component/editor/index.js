import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { editorConfig } from './constant';
import { CustomUploadAdapterPlugin } from './CustomUploadAdapter';

function Editor() {
    return (
        <div className='w-full'>
            <CKEditor
                editor={editorConfig.editor}
                config={{
                    extraPlugins: [CustomUploadAdapterPlugin],
                    licenseKey: editorConfig.licenseKey,
                    plugins: editorConfig.plugins,
                    toolbar: editorConfig.toolbar,
                    initialData: '<figure class="image image_resized" style="width:19.47%;"><img style="aspect-ratio:2520/1680;" src="http://localhost:5000/bucket/ninja-images/80da8667-1b77-4884-b699-0d07bea896e4-5a4030a0-cde2-45d0-be60-ac6d0f205acb-Photoon11-06-2025 at 11.24.jpg" width="2520" height="1680"></figure>',
                    htmlSupport: {
                        allow: [
                            {
                                name: "img",
                                attributes: true,
                                classes: true,
                                styles: true
                            }
                        ]
                    }
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log(data);
                }}
            />
        </div>

    );
}

export default Editor;
