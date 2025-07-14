import Editor from "../../component/editor";
import Hook from "./hook";

function Write() {


  const { setPostContent, savePost, cancelWrite } = Hook();

    return (<div>
      <Editor setPostContent={setPostContent} />
          <div className="fixed bottom-4 left-0 w-full px-4 flex flex-col sm:flex-row sm:justify-center sm:gap-8 gap-3">
      <button
        onClick={cancelWrite}
        className="w-full sm:w-36 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-xl shadow-md hover:bg-gray-300 transition"
      >
        Cancel
      </button>
      <button
        onClick={savePost}
        className="w-full sm:w-36 bg-blue-600 text-white font-medium py-2 px-4 rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
    </div>)
}

export default Write;
