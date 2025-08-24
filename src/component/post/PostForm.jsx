import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { CustomUploadAdapterPlugin } from '../editor/CustomUploadAdapter';
import { editorConfig } from '../editor/constant';
import Input from '../common/form/Input';
import { appconfig } from '../../config';
const PostForm = ({ id, formData, onConfirm }) => {

    const {
        handleSubmit,
        register,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            publish: id === 'edit_form' ? formData.publish : false,
            content: id === 'edit_form' ? formData.content : "",
            imagefile: id === 'edit_form' ? formData.imagefile : null,
            header: id === 'edit_form' ? formData.header : '',
            tags: id === 'edit_form' ? formData.tags.map((tag) => ({ value: tag })) : [{ value: "" }],
        },
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: "tags",
    });
    const [err, setErr] = useState("");
    const [token, setToken] = useState(null);


    function isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp < currentTime;
        } catch (e) {
            return true;
        }
    }

    useEffect(() => {
        const initAuth = async () => {
            let storedToken = localStorage.getItem("accessToken");

            if (!storedToken) {
                window.location.href = "/login";
                return;
            }

            if (isTokenExpired(storedToken)) {
                try {
                    const response = await axios.get(
                        `${appconfig.api_url}/backpanel/swap-token`,
                        { withCredentials: true }
                    );
                    storedToken = response.data.tokens.accessToken;
                    localStorage.setItem("accessToken", storedToken);
                } catch (err) {
                    window.location.href = "/login";
                    return;
                }
            }

            setToken(storedToken);

        };

        initAuth();
    }, []);
    useEffect(() => {
        if (id === "edit_form" && token) {

            const preview = document.getElementById("post-image-preview");

            preview.src = `${appconfig.api_url}/bucket${formData?.imagefile}`;
        }
    }, [id, token]);



    const onUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setValue("imagefile", file);
            const url = URL.createObjectURL(file);
            const preview = document.getElementById("post-image-preview");
            preview.src = url;
        }
    };

    // const previewRef = useRef(null);

    // useEffect(() => {
    //     if (id === "edit_form" && token && previewRef.current && formData?.imagefile) {
    //         previewRef.current.src = `${appconfig.api_url}/bucket${formData.imagefile}`;
    //     }
    // }, [id, token, formData]);

    const imageFile = watch("imagefile");

    useEffect(() => {
        if (imageFile) {
            setErr("");
        }
    }, [imageFile]);

    const onSubmit = (formData) => {

        if (formData.imagefile == null)
            setErr('This field is required')
        else {

            setErr('')
            onConfirm(formData);
        }

    };

    if (!token) return;


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
                    label='Header'
                    name="header"
                    validate={{ required: true, }}
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
                        className="px-2 py-1 bg-blue-600 text-white rounded text-[14px]"
                    >
                        Add Tag
                    </button>
                </div>
                <div className='flex flex-col gap-2'>

                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex flex-col w-full space-y-1"
                        >
                            <div className='flex items-center justify-center w-full space-x-2 '>
                                <input
                                    type="text"
                                    {...register(`tags.${index}.value`, { required: "This field is required" })}
                                    placeholder="Tag"
                                    className="border px-2 py-1 rounded w-full"
                                />


                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="px-2 py-1 bg-red-500 text-white rounded text-[14px]"
                                >
                                    Remove
                                </button>
                            </div>
                            {errors.tags?.[index]?.value && (
                                <p className="text-red-600 text-sm">
                                    {errors.tags[index].value.message}
                                </p>
                            )}
                        </div>
                    ))}
                </div>


            </div>
            {/* content */}
            <label className="mb-2  font-semibold">Content</label>
            <Controller
                name="content"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                    <div className=''>
                        <CKEditor
                            editor={editorConfig.editor}
                            config={{
                                extraPlugins: [CustomUploadAdapterPlugin],
                                licenseKey: editorConfig.licenseKey,
                                plugins: editorConfig.plugins,
                                toolbar: editorConfig.toolbar,
                                   image: {
                                    toolbar: [
                                    'toggleImageCaption',
                                    'imageTextAlternative',
                                    '|',
                                    'imageStyle:inline',
                                    'imageStyle:wrapText',
                                    'imageStyle:breakText',
                                    '|',
                                    'resizeImage',
                                    '|',
                                    'ckboxImageEdit'
                                    ]
                                },
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
                            data={id === "edit_form" ? formData.content : ""}
                            onReady={(editor) => { editor.editing.view.change((writer) => { writer.setStyle("min-height", "200px", editor.editing.view.document.getRoot()); }); }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValue("content", data, { shouldValidate: true });
                            }}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm ">{errors.content.message}</p>
                        )}
                    </div>
                )}
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
                        className='border border-slate-700 cursor-pointer'
                    />
                    <p className="text-orange-600">Recommended resolution is 500 x 400</p>

                    <div className="min-h-[150px] mt-4  w-full items-center justify-center border border-dashed border-[#000f3c]">

                        <div className="flex items-center justify-center">
                            <img
                                // ref={previewRef}
                                id="post-image-preview"
                                className="h-[250px] "
                                alt="post_image"
                            />
                        </div>

                    </div>
                </div>
                {err && (
                    <p className="text-red-500 text-sm mt-1">{err}</p>
                )}
            </div>


        </form>
    )
}

export default PostForm