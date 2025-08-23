import React, { useState } from 'react'
import Modal from '../../component/common/modal/Modal';
import FormModal from '../../component/common/form/FormModal';
import { ToastContainer, toast } from 'react-toastify';
import useFetchData from '../../hooks/useFetchData';
import { instanceForJSON, instanceForMultipart } from '../../api/instance';
import BannerForm from '../../component/banner/BannerForm';
import BannerList from '../../component/banner/list/BannerList';
const Banner = () => {
    const defaultData = {
        publish: false,
        imagefile: "",

    }
    const [modalOpen, setModalOpen] = useState(false);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [editFormData, setEditFormData] = useState(defaultData);
    const [rowToDelete, setRowToDelete] = React.useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { data, error, loading, fetchData } = useFetchData(`/backpanel/banners`);

    const savePost = async (postData, id) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("publish", postData.publish);

        if (postData.imagefile instanceof FileList) {
            formData.append("imagefile", postData.imagefile[0]);
        } else if (postData.imagefile instanceof File) {
            formData.append("imagefile", postData.imagefile);
        }

        if (id && editFormData.imagefile) {
            if (
                postData.imagefile instanceof File ||
                postData.imagefile instanceof FileList
            ) {

                formData.append("removeImage", JSON.stringify([editFormData.imagefile]));
            } else {

                formData.append("removeImage", JSON.stringify([]));
            }
        }
        if (id) {
            await instanceForMultipart
                .put(`/backpanel/banners/${id}`, formData)
                .then((res) => {

                    toast(res?.data?.message, { type: "success" });

                    setIsLoading(false);
                    fetchData();
                    setIsOpenEdit(false);
                })
                .catch((error) => {
                    toast(error?.data?.message, { type: "error" });
                });
        } else {
            await instanceForMultipart
                .post(`/backpanel/banners`, formData)
                .then((res) => {

                    toast(res?.data?.message, { type: "success" });

                    setIsLoading(false);
                    fetchData()
                    setIsOpenCreate(false)
                })
                .catch((error) => {
                    toast(error?.data?.message, { type: "error" });
                });
        }
    }

    const deleteData = async (id) => {
        setIsLoading(true);
        await instanceForJSON
            .delete(`/backpanel/banners/${id}`)
            .then((res) => {
                toast(res?.data?.message, { type: "success" });
                setIsLoading(false)
                fetchData()
                setModalOpen(false)
            })
            .catch((error) => {
                setIsLoading(false)
                    ; toast(error?.response?.data?.message || "Something went wrong", {
                        type: "error",
                    });
                setModalOpen(false)
            });

    }

    return (
        <>
            <div className="container mx-auto">

                <button
                    type='submit'
                    onClick={() => setIsOpenCreate(true)}
                    className="mt-6 w-fit bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition mb-10 "
                >
                    CREATE
                </button>
                <BannerList
                    data={data?.banners || []}
                    setModalOpen={setModalOpen}
                    setEditFormData={setEditFormData}
                    setRowToDelete={setRowToDelete}
                    setIsOpenEdit={setIsOpenEdit}
                />
                <ToastContainer autoClose={3000} />
                <FormModal
                    isLoading={isLoading}
                    isOpen={isOpenCreate}
                    header="Create Banner"
                    onClose={() => {
                        setIsOpenCreate(false);
                    }}>
                    <BannerForm
                        id="create_form"
                        onClose={() => {
                            setIsOpenCreate(false);
                        }}
                        onConfirm={(formdata) => savePost(formdata)}
                    />
                </FormModal>
                <FormModal
                    isLoading={isLoading}
                    isOpen={isOpenEdit}
                    onClose={() => {
                        setIsOpenEdit(false);
                    }}
                    header="Edit Banner"
                >
                    <BannerForm
                        id="edit_form"
                        formData={editFormData}
                        onClose={() => {
                            setEditFormData({
                                ...defaultData,
                            });
                            setIsOpenEdit(false);
                        }}
                        onConfirm={(data) => savePost(data, editFormData._id)}
                    />
                </FormModal>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Are u sure to delete?"
                footer={
                    <>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => deleteData(rowToDelete._id)}>
                            Save
                        </button>
                    </>
                }
            >
                <p>You can't redo.</p>
            </Modal>
        </>
    )
}

export default Banner