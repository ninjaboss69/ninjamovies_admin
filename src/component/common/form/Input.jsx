import React from "react";

const Input = ({ label, type = "text", register, name, errors,validate={required:false}, ...rest }) => {

  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-2  font-semibold">{label}</label>

      {type === "textarea" ? (
        <textarea
          className="border border-gray-300 rounded px-3 py-2 w-full"
         {...register(name, validate)}
          {...rest}
        />
      ) : type === "checkbox" ? (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
           {...register(name, validate)}
            {...rest}
          />
          <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
        </label>
      ) : (
        <input
          type={type}
          className="border border-gray-300 rounded px-3 py-2 w-full"
         {...register(name, validate)}
          {...rest}
        />
      )}

      {errors &&  errors[name]?.type === "required"  && (
        <p className="text-red-600 text-sm mt-1">This field is required</p>
      )}
    </div>
  );
};

export default Input;
