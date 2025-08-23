import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../common/form/Input';
import { appconfig } from '../../config';
const BannerForm = ({ id, formData, onConfirm }) => {
    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            publish: id === 'edit_form' ? formData.publish : false,
            imagefile: id === 'edit_form' ? formData.imagefile : null,

        },
    })
    const [err, setErr] = useState("");
    useEffect(() => {
       
        if (id === "edit_form" ) {

            const preview = document.getElementById("banner-image-preview");

            preview.src = `${appconfig.api_url}/bucket${formData?.imagefile}`;
        }
    }, [id]);

    const onUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setValue("imagefile", file);
            const url = URL.createObjectURL(file);
            const preview = document.getElementById("banner-image-preview");
            preview.src = url;
        }
    };
    const imageFile = watch("imagefile");

    useEffect(() => {
        if (imageFile) {
            setErr("");
        }
    }, [imageFile]);
    const onSubmit = (formData) => {

        onConfirm(formData)
    }
    return (
        <form className='w-full flex flex-col gap-4 ' onSubmit={handleSubmit(onSubmit)}>
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
                                id="banner-image-preview"
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

export default BannerForm