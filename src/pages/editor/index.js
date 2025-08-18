import React, { useState } from "react";
import Editor from "../../component/editor";
import { instanceForMultipart } from "../../api/instance";
import { toast, ToastContainer } from "react-toastify";
import FormModal from "../../component/common/form/FormModal";
import PostForm from "../../component/post/PostForm";
import Table from "../../component/common/table/Table";
import sampledata from "../../../src/data/data.json"
const Write = () => {

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const defaultData = {
    imagefile: "",
    title: "",
    tags: [],
    content: '',
    publish: false,
  };

  const [data, setData] = useState(defaultData);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const savePost = async (postData) => {
    const formData = new FormData();
    formData.append("publish", true);
    formData.append('header', 'this title');
    formData.append('tags', JSON.stringify(["ninja", "boss"]));
    if (postData.imagefile instanceof FileList) {
      formData.append("imagefile", postData.imagefile[0]);
    } else if (postData.imagefile instanceof File) {
      formData.append("imagefile", postData.imagefile);
    }
    formData.append('content', postData.content)


    await instanceForMultipart
      .post("/backpanel/post/create", formData)
      .then((res) => {

        toast(res?.data?.message, { type: "success" });
      })
      .catch((error) => {
        toast(res?.data?.message, { type: "error" });
      });

  }
  return (
    <div className="container mx-auto">
      
      <button
        type='submit'
        onClick={()=>setIsOpenCreate(true)}
        className="mt-6 w-fit bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition "
      >
        CREATE
      </button>
      {/* <Table
dataRows={sampledata.data||[]}
dataColumns={sampledata.column||[]}
totalItems={0}
pagination
page={page}
setPage={setPage}
limit={limit}
setLimit={setLimit}
      /> */}
      <ToastContainer autoClose={3000} />
      <FormModal
        isOpen={isOpenCreate}
        header="Create Post"
        onClose={() => {
          setIsOpenCreate(false);
        }}>
        <PostForm
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
        header="Edit Post"
      >
        <PostForm
          id="edit_form"
          formData={data}
          onClose={() => {
            setData({
              ...defaultData,
            });
            setIsOpenEdit(false);
          }}
          onConfirm={(data) => savePost(data,data.id)}
        />
      </FormModal>
    </div>)

}

export default Write;
