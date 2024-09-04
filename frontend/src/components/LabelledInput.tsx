import { ChangeEvent } from "react";

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  type,
  value,
  onChange,
}: LabelledInputType) {
  return (
    <>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>

        <input
          type={type || "text"}
          id="first_name"
          placeholder={placeholder}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={onChange}
          value={value}
          required
        />
      </div>
    </>
  );
}

export default LabelledInput;
