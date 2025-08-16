import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { useForm, useFieldArray } from "react-hook-form";
import { CustomUploadAdapterPlugin } from '../editor/CustomUploadAdapter';
import { editorConfig } from '../editor/constant';
import Input from '../common/form/Input';

const PostForm = ({ id, onClose, onConfirm }) => {
    const {
        handleSubmit,
        register,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            tags: [{ value: "" }],
        },
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: "tags",
    });


    const onUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setValue("imagefile", file);
            const url = URL.createObjectURL(file);
            const preview = document.getElementById("post-image-preview");
            preview.src = url;
        }
    };

    const onSubmit = (formData) => {

        onConfirm(formData)
    }
    return (
        <form className='w-full flex flex-col gap-4 ' onSubmit={handleSubmit(onSubmit)} >
            {/* publish */}
            <div >
                <Input
                    label='Publish'
                    name="publish"
                    type="checkbox"
                    register={register}
                    errors={errors}
                />
            </div>
            {/* header */}
            <div >
                <Input
                    placeholder='Title'
                    label='Title'
                    name="title"
                    validate={{ required: true }}
                    register={register}
                    errors={errors}
                />
            </div>
            {/* tags */}
            <div >
                <div className='flex items-center justify-between '>
                    <label className="mb-2  font-semibold">Tags</label>
                    <button
                        type="button"
                        onClick={() => append({ value: "" })}
                        className="px-2 py-1 bg-blue-600 text-white rounded text-[12px]"
                    >
                        Add Tag
                    </button>
                </div>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                        <input
                            type="text"
                            {...register(`tags.${index}.value`, { required: "Tag required" })}
                            placeholder="Tag"
                            className="border px-2 py-1 rounded w-full"
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-[12px]"
                        >
                            Remove
                        </button>
                    </div>
                ))}


            </div>
            {/* content */}
            <label className="mb-2  font-semibold">Content</label>
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
                    setValue("content", data);
                }}
            />

            {/* image upload */}
            <div className="w-full mx-auto">
                <label className="py-2  font-semibold" htmlFor="img_input" >
                    Upload Image

                </label>
                <div className="w-full items-center justify-center space-x-3 flex flex-col ">

                    <input
                        id="img_input"

                        type="file"
                        accept="image/*"
                        onChange={onUpload}
                        className='border border-slate-700'
                    />
                    <p className="text-orange-600">Recommended resolution is 500 x 400</p>

                    <div className="min-h-[150px] mt-4  w-full items-center justify-center border border-dashed border-[#000f3c]">

                        <div className="flex items-center justify-center">
                            <img
                                id="post-image-preview"
                                className="h-[250px] "
                                alt="post_image"
                            />
                        </div>

                    </div>
                </div>
            </div>

        </form>
    )
}

export default PostForm