import React from "react";
import { appconfig } from "../../../config";
const CustomizedImageCell = ({ cell }) => {
  const value = cell.getValue();
  const imageStyle =
    "inline-flex justify-center w-[150px] h-[5rem] object-center object-cover";

  return (
    <div className="border border-theme max-w-[150px] inline-flex justify-center rounded overflow-hidden">
      {Array.isArray(value) ? (
        <div className="w-150 overflow-hidden overflow-x-auto flex items-center gap-0.5 no-scrollbar">
          {value?.map((img, i) => (
            <>
              <img
                key={i}
               
                src={`${appconfig.api_url}/bucket${value}`}
                alt="New Image"
                width={400}
                height={200}
                priority
                className={imageStyle}
              />
            </>
          ))}
        </div>
      ) : (
        <>
          <img
            
            src={`${appconfig.api_url}/bucket${value}`}
            alt="New Image"
            className={imageStyle}
            width={400}
            height={200}
          />
        </>
      )}
    </div>
  );
};

export default CustomizedImageCell;
