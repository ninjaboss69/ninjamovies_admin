import React, { useState } from 'react'
import { appconfig } from '../../../config';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
const BannerList = ({ data, setModalOpen, setEditFormData, setRowToDelete, setIsOpenEdit }) => {
    const [loading, setLoading] = useState(true)
    return (
        <div className="w-full grid grid-cols-3 gap-y-6 mb-6">
            {data &&
                data.map((banner, index) => (
                    <React.Fragment key={index}>

                        <div className="col-span-2 rounded-l-[20px] overflow-hidden">
                            {loading && (
                                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            <img
                                className="h-auto max-h-[60vh] w-full object-cover"
                                src={`${appconfig.api_url}/bucket${banner.imagefile}`}
                                width={1440}
                                height={573}
                                alt="banner"
                                onLoad={() => setLoading(false)}
                                onError={() => setLoading(false)}
                            />
                        </div>


                        <div className="col-span-1 bg-white p-6 rounded-r-[20px]  shadow">
                            <div className="space-y-6">
                                <div className='flex justify-between'>
                                    <div>   Publish :</div>

                                    <div
                                        className={`${banner.publish
                                            ? "bg-[#2962ff] text-white"
                                            : "bg-[#c3c3c3] text-[#000]"
                                            } rounded-md px-2 mx-2 py-1 shadow-md`}
                                    >
                                        {banner.publish ? "Publish" : "Unpublish"}
                                    </div>
                                </div>
                                <div className='border-t flex justify-between pt-6'>
                                    <div>Action:</div>
                                    <div className="flex items-center justify-evenly w-fit space-x-4">
                                        <BiEdit
                                            onClick={() => {
                                                setIsOpenEdit(true);
                                                setEditFormData(banner)
                                            }}
                                            className="cursor-pointer "
                                            size={25}
                                        />
                                        <MdDelete
                                            onClick={() => {
                                                setModalOpen(true)
                                                setRowToDelete(banner)
                                            }
                                            }
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

export default BannerList