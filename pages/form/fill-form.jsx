import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import FormItem from "../../components/FormItem";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const CreateFormPage = () => {
  const [formTitle, setFormTitle] = useLocalStorage("formTitle", "");
  const [fieldTypes, setFieldTypes] = useLocalStorage("inputFields", []);
  const [inputFields, setInputFields] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setInputFields(fieldTypes);
  }, []);

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
          {inputFields.map((feild, index) =>
            feild.fieldType !== "select" ? (
              <FormItem
                key={index}
                type={feild.fieldType}
                label={feild.fieldName}
                name={feild.fieldName}
              />
            ) : (
              <div className="mb-8">
                <p className="text-sm mb-4">{feild.fieldName}</p>
                <Select />
              </div>
            )
          )}
          <button
            onClick={() => ""}
            className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFormPage;
