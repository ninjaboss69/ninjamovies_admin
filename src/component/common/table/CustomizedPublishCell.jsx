

function CustomizePublishCell({ cell }) {
  
  return (
    <div
      className={` font-semibold rounded-md text-center py-2 w-[100px] ${
        cell.getValue() === true
          ? "bg-[#2962ff] text-white "
          : "bg-[#c3c3c3] text-black"
      }`}
    >
      {" "}
      {cell.getValue() === true ? "Publish" : "Unpublish"}{" "}
    </div>
  );
}


export default CustomizePublishCell;
