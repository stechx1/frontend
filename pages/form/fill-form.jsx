import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import FormItem from "../../components/Form/FormItem";
import NewFormItem from "../../components/Form/NewFormItem";
import SelectItem from "../../components/Form/SelectItem";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const FillForm = () => {
  const [formTitle, setFormTitle] = useLocalStorage("formTitle", "");
  const [fieldTypes, setFieldTypes] = useLocalStorage("inputFields", []);
  const [inputFields, setInputFields] = useState([]);
  const [formResponse, setFormResponse] = useState({});
  const [selectedOptions, setSelectedOptions] = useState("");
  const [userResponses, setUserResponses] = useLocalStorage("userResponses","");
  const [newValue, setNewValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    setInputFields(fieldTypes);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setUserResponses([...userResponses, formResponse]);
    localStorage.removeItem("inputFields");
    localStorage.removeItem("formTitle");
    router.push('/form/responses')
  }

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <div className=" bg-white p-10 rounded w-[500px]">
        <div className="flex justify-end">
          <button className="bg-white outline-2 outline-pink-700 outline focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2 text-right">
            Wallet
          </button>
        </div>
        <form className="mt-5">
          <p className="text-2xl text-center mb-8">{formTitle}</p>
          {inputFields.map((field, index) =>
            field.fieldType !== "select" ? (
              <NewFormItem
                key={Math.random()}
                type={field.fieldType}
                label={field.fieldName}
                name={field.fieldName}
                value={newValue}
                formResponse={formResponse}
                setFormResponse={setFormResponse}
              />
            ) : (
              <SelectItem
                name={field.fieldName}
                options={field.options}
                value={selectedOptions}
                formResponse={formResponse}
                setFormResponse={setFormResponse}
              />
            )
          )}
          <button
            onClick={onSubmit}
            className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FillForm;
