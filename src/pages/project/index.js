import React, { useState, useMemo } from "react";
import Editor from "../../component/editor";
import { instanceForJSON, instanceForMultipart } from "../../api/instance";
import { toast, ToastContainer } from "react-toastify";
import FormModal from "../../component/common/form/FormModal";
import Table from "../../component/common/table/Table";
import sampledata from "../../data/data.json"
import Modal from "../../component/common/modal/Modal";
import ActionComponent from "../../component/common/table/ActionComponent";
import CustomizedPublishCell from "../../component/common/table/CustomizedPublishCell";
import CustomizedImageCell from "../../component/common/table/CustomizedImageCell";
import useFetchData from "../../hooks/useFetchData";
import ProjectForm from "../../component/project/ProjectForm";

const Write = () => {

  const defaultData = {
    imagefile: "",
    content: "",
    header: "",
    category: ""

  }
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  const [rowToDelete, setRowToDelete] = React.useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editFormData, setEditFormData] = useState(defaultData);

  const { data, error, loading, fetchData } = useFetchData(`/backpanel/project/get?page=${page}&limit=${limit}`);

  const saveproject = async (projectData, id) => {
    console.log("project Data ", projectData);
    const formData = new FormData();
    formData.append("category", projectData.category);
    formData.append('header', projectData.header);
    if (projectData.imagefile instanceof FileList) {
      formData.append("imagefile", projectData.imagefile[0]);
    } else if (projectData.imagefile instanceof File) {
      formData.append("imagefile", projectData.imagefile);
    }
    formData.append('content', projectData.content)
    if (id) {
      await instanceForMultipart
        .put(`/backpanel/project/${id}`, formData)
        .then((res) => {

          toast(res?.data?.message, { type: "success" });

          fetchData()
          setIsOpenEdit(false);
        })
        .catch((error) => {
          toast(error?.data?.message, { type: "error" });
        });
    } else {
      try {
        const res = await instanceForMultipart
          .post(`/backpanel/project/create`, formData, {
            validateStatus: (status) => status >= 200 && status < 300 || status === 412,
          });
        if (res.status !== 200) {
          toast(res?.data?.message || "Error...", { type: "error" })
          return;
        }
        fetchData()
        setIsOpenCreate(false)
        toast(res?.data?.message || "Success", { type: "success" });
      } catch (err) {
        console.log(err);
        toast("Something went wrong in frotend side", { type: "error" })
      }
    }
  }

  const editData = async (row) => {

    const tableData = {
      id: row._id,
      imagefile: row.imagefile,
      header: row.header,
      tags: row.tags || [],
      content: row.content,
      category: row.category
    };
    setEditFormData(tableData);
    setIsOpenEdit(true);
  };

  const deleteData = async (id) => {
    await instanceForJSON
      .delete(`/backpanel/project/${id}`)
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
      if (col.accessorKey === "imagefile") {

        return {
          ...col,
          cell: ({ cell }) => CustomizedImageCell({ cell })
        }


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
          className="mt-6 w-fit bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition mb-4 "
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
          label='projects'

        />
        <ToastContainer autoClose={3000} />
        <FormModal
          isOpen={isOpenCreate}
          header="Create project"
          onClose={() => {
            setIsOpenCreate(false);
          }}>
          <ProjectForm
            id="create_form"
            onClose={() => {
              setIsOpenCreate(false);
            }}
            onConfirm={(formdata) => saveproject(formdata)}
          />
        </FormModal>
        <FormModal
          isOpen={isOpenEdit}
          onClose={() => {
            setIsOpenEdit(false);
          }}
          header="Edit project"
        >
          <ProjectForm
            id="edit_form"
            formData={editFormData}
            onClose={() => {
              setEditFormData({
                ...defaultData,
              });
              setIsOpenEdit(false);
            }}
            onConfirm={(data) => saveproject(data, editFormData.id)}
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

export default Write;
