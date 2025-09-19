import React, { useState } from 'react'
import { appconfig } from '../../../config';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
const PreviewList = ({ data, setModalOpen, setEditFormData, setRowToDelete, setIsOpenEdit }) => {
    const [loading, setLoading] = useState(true)
    return (
        <div className="w-full grid grid-cols-3 gap-y-6 mb-6">
            {data &&
                data.map((preview, index) => (
                    <React.Fragment key={index}>

                        <div className="col-span-2 rounded-l-[20px] overflow-hidden">
                            {loading && (
                                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            <img
                                className="h-auto max-h-[60vh] w-full object-cover"
                                src={`${appconfig.api_url}/bucket${preview.imagefile}`}
                                width={1440}
                                height={573}
                                alt="preview"
                                onLoad={() => setLoading(false)}
                                onError={() => setLoading(false)}
                            />
                        </div>


                        <div className="col-span-1 bg-white p-6 rounded-r-[20px] shadow h-full">
                            <div className="flex flex-col justify-between h-full">
                                <div className="flex justify-between">
                                    <div>Publish :</div>
                                    <div
                                        className={`${preview.publish
                                            ? "bg-[#2962ff] text-white"
                                            : "bg-[#c3c3c3] text-[#000]"
                                            } rounded-md px-2 mx-2 py-1 shadow-md`}
                                    >
                                        {preview.publish ? "Publish" : "Unpublish"}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div>Title :</div>
                                    <div className=" text-[#000] px-2 mx-2">
                                        {preview.title}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div>Content :</div>
                                    <div className=" text-[#000] px-2 mx-2">
                                        {preview.content}
                                    </div>
                                </div>

                                <div className="border-t flex justify-between pt-6">
                                    <div>Action:</div>
                                    <div className="flex items-center justify-evenly w-fit space-x-4">
                                        <BiEdit
                                            onClick={() => {
                                                setIsOpenEdit(true);
                                                setEditFormData(preview);
                                            }}
                                            className="cursor-pointer"
                                            size={25}
                                        />
                                        <MdDelete
                                            onClick={() => {
                                                setModalOpen(true);
                                                setRowToDelete(preview);
                                            }}
                                            className="cursor-pointer"
                                            size={25}
                                            color="red"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </React.Fragment>
                ))}
        </div>


    )
}

export default PreviewList