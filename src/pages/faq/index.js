import React, { useState, useMemo } from "react";
import { instanceForJSON } from "../../api/instance";
import { toast, ToastContainer } from "react-toastify";
import FormModal from "../../component/common/form/FormModal";
import FAQForm from "../../component/faq/FAQForm";
import Table from "../../component/common/table/Table";
import Modal from "../../component/common/modal/Modal";
import ActionComponent from "../../component/common/table/ActionComponent";
import CustomizedPublishCell from "../../component/common/table/CustomizedPublishCell";
import useFetchData from "../../hooks/useFetchData";

const FAQ = () => {

    const defaultData = {
        publish: false,
        
        question: "",
        answer: "",
      
    }
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const [rowToDelete, setRowToDelete] = React.useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [editFormData, setEditFormData] = useState(defaultData);

    const { data, error, loading, fetchData } = useFetchData(`/backpanel/faq?page=${page}&limit=${limit}`);

    const savePost = async (data, id) => {
        if (data.publish) {
            data.publish = data.publish.toString();
        }

        if (id) {
            await instanceForJSON
                .put(`/backpanel/faq/${id}`, data)
                .then((res) => {

                    toast(res?.data?.message, { type: "success" });

                    fetchData()
                    setIsOpenEdit(false);
                })
                .catch((error) => {
                    toast(error?.data?.message, { type: "error" });
                });
        } else {
            await instanceForJSON
                .post(`/backpanel/faq`, data)
                .then((res) => {

                    toast(res?.data?.message, { type: "success" });

                    fetchData()
                    setIsOpenCreate(false)
                })
                .catch((error) => {
                    toast(error?.data?.message, { type: "error" });
                });
        }
    }

    const editData = async (row) => {

        const tableData = {
            id: row._id,
            question: row.question,
            answer: row.answer,
            publish: row.publish,
        };
        setEditFormData(tableData);
        setIsOpenEdit(true);
    };

    const deleteData = async (id) => {
        await instanceForJSON
            .delete(`/backpanel/faq/${id}`)
            .then((res) => {
                toast(res?.data?.message, { type: "success" });
                fetchData()
                setModalOpen(false)
            })
            .catch((error) => {
                toast(error?.response?.data?.message || "Something went wrong", {
                    type: "error",
                });
                setModalOpen(false)
            });

    }


    const columns = useMemo(() => {
        if (!data?.headers) return [];
        const columnData = [
            {
                header: "Action",
                accessorKey: "action",

                cell: ({ row }) =>
                    ActionComponent({
                        row,
                        setModalOpen,
                        editData,
                        setRowToDelete
                    }),

            },
            ...data?.headers,
        ];
        const changeCol = columnData.map((col) => {


            if (col.accessorKey === "publish") {

                return {
                    ...col,
                    cell: ({ cell }) => <CustomizedPublishCell cell={cell} />,
                };
            }



            return col;
        });
        return changeCol;
    }, [data?.headers]);
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
                <Table
                    dataRows={data?.data || []}
                    columns={columns || []}
                    totalItems={data?.count || 0}
                    pagination
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                     label='FAQs'

                />
                <ToastContainer autoClose={3000} />
                <FormModal
                    isOpen={isOpenCreate}
                    header="Create FAQ"
                    onClose={() => {
                        setIsOpenCreate(false);
                    }}>
                    <FAQForm
                        id="create_form"
                        onClose={() => {
                            setIsOpenCreate(false);
                        }}
                        onConfirm={(formdata) => savePost(formdata)}
                    />
                </FormModal>
                <FormModal
                    isOpen={isOpenEdit}
                    onClose={() => {
                        setIsOpenEdit(false);
                    }}
                    header="Edit FAQ"
                >
                    <FAQForm
                        id="edit_form"
                        formData={editFormData}
                        onClose={() => {
                            setEditFormData({
                                ...defaultData,
                            });
                            setIsOpenEdit(false);
                        }}
                        onConfirm={(data) => savePost(data, editFormData.id)}
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

export default FAQ;
