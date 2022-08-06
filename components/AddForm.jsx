import React, { useEffect, useState } from "react";
import FormItem from "./FormItem";
import Radio from "./Radio";

const AddForm = ({ id, setInputFields, addingField, setAddingField, inputFields}) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const onFieldTypeChange = (e) => {
    setFieldType(e.target.value);
  }

  useEffect(() => {
    if(!addingField) {
      setInputFields([...inputFields, {id, fieldName, fieldType}])
      setAddingField(true);
    }
  }, [addingField])
  
  return (
    <div className="grid md:grid-cols-2 md:gap-6">
      <div className="relative z-0 mb-6 w-full group">
        <FormItem
          type="text"
          label={"Field Name"}
          name={fieldName}
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <div className="flex flex-col">
          <Radio name={`field-type-${id}`} value="text" label="Text" checked={fieldType === "text"} onChange={onFieldTypeChange} />
          <Radio name={`field-type-${id}`} value="select" label="Select" checked={fieldType === "select"} onChange={onFieldTypeChange} />
          <Radio name={`field-type-${id}`} value="number" label="Number" checked={fieldType === "number"} onChange={onFieldTypeChange} />
        </div>
      </div>
    </div>
  );
};

export default AddForm;
