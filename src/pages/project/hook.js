import { useState } from "react";
import { instanceForJSON } from "../../api/instance";

export default function Hook() {


    const [post, setPost] = useState({ publish: true, header: "this title unique by suffix" });

    const setPostContent = (type, data) => {
        setPost({ ...post, [type]: data });
    }

    const savePost = async () => {
        const res = await instanceForJSON.post("/backpanel/project/create", post);

    }

    const cancelWrite = () => {
        console.log("saving as preview");
    }

    return {
        post, setPostContent, savePost, cancelWrite
    }

}