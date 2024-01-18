import React from "react";
import Select  from "react-select";
import { useSorting } from "./context/sorting-context";
import { useUserContext } from "./context/user-context";

const Controls = () => {
  const { users } = useUserContext();
  const { setSortField, setSortDirection, handleSort } = useSorting();

  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];

  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  const handleFieldChange = (selectedOption: any) => {
    if (selectedOption) {
      setSortField(selectedOption.value);
      handleSort(users);
    }
  };

  const handleDirectionChange = (selectedOption: any) => {
    if (selectedOption) {
      setSortDirection(selectedOption.value);
      handleSort(users);
    }
  };  

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select
          options={fieldOptions}
          inputId="sort-field"
          className="input"
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          onChange={handleDirectionChange}
        />
      </div>
    </div>
  );
};

export default Controls;