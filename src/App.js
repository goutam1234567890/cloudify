import React, { useState, useRef } from "react";
import "./App.css";

const FormComponent = () => {
  // State to manage rows of the form (each row has Label1 and Label2)
  const [rows, setRows] = useState([{ label1: "", label2: [] }]);

  // State to manage the global list of options for Label2 dropdown
  const [label2Options, setLabel2Options] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ]);

  // State to track the visibility of dropdown menus for each row
  const [dropdownVisibility, setDropdownVisibility] = useState(
    rows.map(() => false)
  );

  // Reference to manage dynamic input elements for adding new Label2 options
  const inputRefs = useRef([]);

  // Function to add a new row to the form
  const addNewRow = () => {
    setRows([...rows, { label1: "", label2: [] }]); // Add a new row with empty Label1 and Label2
    setDropdownVisibility([...dropdownVisibility, false]); // Add corresponding dropdown visibility state
  };

  // Function to handle changes in Label1 (select dropdown)
  const handleLabel1Change = (index, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, label1: value } : row
    );
    setRows(updatedRows);
  };

  // Function to remove the value of Label1 and allow reselection
  const handleRemoveLabel1 = (index) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, label1: "" } : row
    );
    setRows(updatedRows);
  };

  // Function to handle the selection/deselection of Label2 options
  const handleLabel2Change = (index, option) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        // Toggle the option: Add if not present, remove if already present
        const updatedLabel2 = row.label2.includes(option)
          ? row.label2.filter((item) => item !== option)
          : [...row.label2, option];
        return { ...row, label2: updatedLabel2 };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Function to add a new option to Label2 dropdown dynamically
  const handleAddLabel2Option = (index, newOption) => {
    const trimmedOption = newOption.trim();
    if (trimmedOption && !label2Options.includes(trimmedOption)) {
      setLabel2Options([...label2Options, trimmedOption]); // Add new option globally
      handleLabel2Change(index, trimmedOption); // Select the new option for the current row
    }
  };

  // Function to toggle the visibility of the dropdown menu for a specific row
  const toggleDropdown = (index) => {
    const updatedVisibility = dropdownVisibility.map((isVisible, i) =>
      i === index ? !isVisible : isVisible
    );
    setDropdownVisibility(updatedVisibility);
  };

  return (
    <div className="form-container">
      <table className="form-table">
        <thead>
          <tr>
            <th>Label 1</th>
            <th>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {/* Label 1 Column */}
              <td>
                {row.label1 ? (
                  // Display selected Label1 value as a pill with a remove icon
                  <div className="pill">
                    {row.label1}{" "}
                    <span
                      className="remove-icon"
                      onClick={() => handleRemoveLabel1(index)}
                    >
                      ×
                    </span>
                  </div>
                ) : (
                  // Dropdown for Label1 selection
                  <select
                    value={row.label1}
                    onChange={(e) => handleLabel1Change(index, e.target.value)}
                    className="select"
                  >
                    <option value="">Select One</option>
                    {label2Options.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </td>

              {/* Label 2 Column */}
              <td>
                <div className="dropdown">
                  {/* Display selected Label2 options as pills */}
                  {row.label2.map((selectedOption) => (
                    <div className="pill" key={selectedOption}>
                      {selectedOption}{" "}
                      <span
                        className="remove-icon"
                        onClick={() =>
                          handleLabel2Change(index, selectedOption)
                        }
                      >
                        ×
                      </span>
                    </div>
                  ))}

                  {/* Button to toggle dropdown menu */}
                  <button
                    className="dropdown-toggle"
                    onClick={() => toggleDropdown(index)}
                  >
                    Select Options
                  </button>

                  {/* Dropdown menu for Label2 options */}
                  {dropdownVisibility[index] && (
                    <div className="dropdown-menu">
                      {label2Options.map((option, i) => (
                        <div className="label-option" key={`${option}-${i}`}>
                          <label>
                            <input
                              type="checkbox"
                              checked={row.label2.includes(option)}
                              onChange={() =>
                                handleLabel2Change(index, option)
                              }
                              className="checkbox-value"
                            />
                            {option}
                          </label>
                        </div>
                      ))}

                      {/* Add new Label2 option dynamically */}
                      <div className="add-option-container">
                        <input
                          type="text"
                          placeholder="Add new item"
                          ref={(el) => (inputRefs.current[index] = el)}
                          className="add-option"
                        />
                        <button
                          onClick={() => {
                            const input = inputRefs.current[index];
                            if (input?.value) {
                              handleAddLabel2Option(index, input.value);
                              input.value = "";
                            }
                          }}
                          className="add-button"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to add a new row to the form */}
      <button className="add-row-btn" onClick={addNewRow}>
        + Add New Row
      </button>
    </div>
  );
};

export default FormComponent;
