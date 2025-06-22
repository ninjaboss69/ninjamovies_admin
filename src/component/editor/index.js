import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { editorConfig } from './constant';
import { CustomUploadAdapterPlugin } from './CustomUploadAdapter';

function Editor() {
    return (
        <CKEditor
            editor={editorConfig.editor}
            config={{
                extraPlugins: [CustomUploadAdapterPlugin],
                licenseKey: editorConfig.licenseKey,
                plugins: editorConfig.plugins,
                toolbar: editorConfig.toolbar,
                initialData: '<p>Hello from CKEditor 5 in React!</p>',
            }}


        />
    );
}

export default Editor;
