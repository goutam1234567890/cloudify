# Dynamic Form Component

A React-based dynamic form that allows users to add rows with two labels, `Label 1` and `Label 2`. The form includes functionalities for selecting options, dynamically managing dropdown menus, and adding new rows or options to the dropdown.

---

## Features

### 1. Dynamic Rows
- Add multiple rows to the form with unique configurations.
- Each row contains:
  - **Label 1**: A dropdown to select a single option.
  - **Label 2**: A multi-select dropdown with checkboxes.

### 2. Editable Labels
- **Label 1**:
  - Single-select dropdown for predefined options.
  - Selected value is displayed as a pill with a "remove" option.
- **Label 2**:
  - Multi-select dropdown.
  - Selected options appear as pills with remove functionality.

### 3. Add Custom Options
- Add new options to the **Label 2** dropdown directly from the form.
- Dynamically updates the dropdown list across all rows.

### 4. Interactive Dropdowns
- Dropdown visibility is managed on a per-row basis.
- User-friendly buttons and inputs for better interaction.

---

## How to Run

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd cloudify


## Project Structure

src/
├── App.js           # Root component rendering the FormComponent
├── FormComponent.js # Dynamic form logic and UI
├── App.css          # Styles for the application
└── index.js         # Entry point


## Key Functions
1. addNewRow
Adds a new row to the form with default values.

2. handleLabel1Change
Handles changes in the Label 1 dropdown.

3. handleLabel2Change
Manages the addition and removal of options in the Label 2 multi-select dropdown.

4. handleAddLabel2Option
Adds new options to the global list of Label 2 dropdown values dynamically.

5. toggleDropdown
Toggles the visibility of the dropdown menu for a specific row.

## Technologies Used

React: Functional components and hooks (useState, useRef).

CSS: For styling and layout.

JavaScript: Core logic for handling dynamic data and UI updates.