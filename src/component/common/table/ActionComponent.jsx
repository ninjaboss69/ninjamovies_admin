import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';


function ActionComponent({
  row,
  setModalOpen,
  editData,
  setRowToDelete
}) {
  return (
    <div className="flex items-center justify-evenly w-fit space-x-4">
      <BiEdit
        onClick={() => editData(row.original)}
        className="cursor-pointer "
        size={25}
      />
      <MdDelete
        onClick={() => {
          setModalOpen(true)
          setRowToDelete(row.original)
        }
        }
        className="cursor-pointer"
        size={25}
        color="red"
      />
    </div>
  );
}


export default ActionComponent;
