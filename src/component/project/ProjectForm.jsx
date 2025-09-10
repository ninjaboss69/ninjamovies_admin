import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { CustomUploadAdapterPlugin } from '../editor/CustomUploadAdapter';
import { editorConfig } from '../editor/constant';
import Input from '../common/form/Input';
import { appconfig } from '../../config';

const ProjectForm = ({ id, formData, onConfirm }) => {
    const {
        handleSubmit,
        register,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            content: id === 'edit_form' ? formData.content : "",
            imagefile: id === 'edit_form' ? formData.imagefile : null,
            header: id === 'edit_form' ? formData.header : '',
            category: id === 'edit_form' ? formData.category   : '', 
        },
    });

    console.log("to update form ",formData);

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
            const preview = document.getElementById("project-image-preview");
            preview.src = `${appconfig.api_url}/bucket${formData?.imagefile}`;
        }
    }, [id, token]);

    const onUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue("imagefile", file);
            const url = URL.createObjectURL(file);
            const preview = document.getElementById("project-image-preview");
            preview.src = url;
        }
    };

    const imageFile = watch("imagefile");
    useEffect(() => {
        if (imageFile) setErr("");
    }, [imageFile]);

    const onSubmit = (formData) => {
        if (formData.imagefile == null) {
            setErr('This field is required');
        } else {
            setErr('');
            onConfirm(formData);
        }
    };

    if (!token) return null;

    return (
        <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)} >
            {/* header */}
            <div>
                <Input
                    placeholder='Title'
                    label='Project Name'
                    name="header"
                    validate={{ required: true }}
                    register={register}
                    errors={errors}
                />
            </div>

            {/* dropdown */}
            <div>
                <label className="block mb-2 font-semibold">Select Development</label>
                <select
                    {...register("category", { required: "Please select development" })}
                    className="border rounded p-2 w-full"
                >
                    <option value="">-- Select --</option> {/* Empty option only */}
                    {[
                        "Energy Sector Development",
                        "Agriculture, Livestock and Forestry Development",
                        "Manufacturing",
                        "Tourism and Hospitality Development",
                        "Mining Sector Development"
                    ].map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category.message}</p>
                )}
            </div>

            {/* content */}
            <label className="mb-2 font-semibold">Content</label>
            <Controller
                name="content"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                    <div>
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
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle("min-height", "200px", editor.editing.view.document.getRoot());
                                });
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValue("content", data, { shouldValidate: true });
                            }}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm">{errors.content.message}</p>
                        )}
                    </div>
                )}
            />

            {/* image upload */}
            <div className="w-full mx-auto">
                <label className="py-2 font-semibold" htmlFor="img_input">Upload Image</label>
                <div className="w-full items-center justify-center space-x-3 flex flex-col ">
                    <input
                        id="img_input"
                        type="file"
                        accept="image/*"
                        onChange={onUpload}
                        className='border border-slate-700 cursor-pointer'
                    />
                    <p className="text-orange-600">Recommended resolution is 500 x 400</p>
                    <div className="min-h-[150px] mt-4 w-full items-center justify-center border border-dashed border-[#000f3c]">
                        <div className="flex items-center justify-center">
                            <img id="project-image-preview" className="h-[250px]" alt="project_image" />
                        </div>
                    </div>
                </div>
                {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
            </div>
        </form>
    );
};

export default ProjectForm;
