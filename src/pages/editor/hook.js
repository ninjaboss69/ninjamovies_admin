import { instanceForJSON } from "../../api/instance";

export default function Hook(){

    var isSavingPostInProgress = false;

    const savePost =async ()=>{
        console.log("post is saved and ready to leave this page");
        isSavingPostInProgress = true;
        const res = await instanceForJSON.post("/backpanel/post/create",{header:"ninja is activated",content:"Ninja is coming back",publish:true});
        console.log("res is ",res);


    }

    const cancelWrite =()=>{
        console.log("saving as preview");
    }

    return {
        savePost, cancelWrite
    }
    
}