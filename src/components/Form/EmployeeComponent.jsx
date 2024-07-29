import { useState } from "react";
import "./Employee.css";

const EmployeeComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [position, setPosition] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEmployee = {
      name,
      email,
      phone,
      id,
      image,
      position,
    };
    setEmployees([...employees, newEmployee]);
    console.log("Form Data:", newEmployee);
    resetForm();
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === selectedEmployee.id) {
        return {
          name,
          email,
          phone,
          id,
          image,
          position,
        };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
    resetForm();
  };

  const handleDelete = (employeeId) => {
    const updatedEmployees = employees.filter(
      (employee) => employee.id !== employeeId
    );
    setEmployees(updatedEmployees);
  };

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handleImageChange = (event) => setImage(event.target.value);
  const handlePositionChange = (event) => setPosition(event.target.value);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setId("");
    setImage("");
    setPosition("");
    setSelectedEmployee(null);
  };

  const handleEdit = (employee) => {
    setName(employee.name);
    setEmail(employee.email);
    setPhone(employee.phone);
    setId(employee.id);
    setImage(employee.image);
    setPosition(employee.position);
    setSelectedEmployee(employee);
  };

  return (
    <div id="container">
      {/* 1st Column */}
      <div className="form_column">
        <form onSubmit={selectedEmployee ? handleUpdate : handleSubmit}>
          <h1>Employee Form</h1>
          <label htmlFor="name-and-surname">Name and Surname</label>
          <input
            type="text"
            value={name}
            placeholder="Name and Surname"
            onChange={handleNameChange}
          />
          <label htmlFor="email-address">Email Address</label>
          <input
            type="text"
            value={email}
            placeholder="Email Address"
            onChange={handleEmailChange}
          />
          <label htmlFor="phone-number">Phone Number</label>
          <input
            type="tel"
            value={phone}
            placeholder="Phone Number"
            onChange={handlePhoneChange}
          />
          <label>Image</label>
          <input type="file" value={image} onChange={handleImageChange} />

          <label htmlFor="employee-position">Employee Position</label>
          <select
            id="employee-position"
            value={position}
            onChange={handlePositionChange}
          >
            <option></option>
            <option value="intern">Intern</option>
            <option value="employee">Employee</option>
          </select>

          <label htmlFor="ID">ID</label>
          <input
            type="number"
            value={id}
            placeholder="Enter your ID"
            onChange={(event) => setId(event.target.value)}
          />

          <button type="submit">{selectedEmployee ? "Update" : "Add"}</button>
          {selectedEmployee && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* 2nd Column */}
      <div className="output-column">
        <h1>Employee Details</h1>
        {employees.map((employee) => (
          <div key={employee.id}>
            <p>Name: {employee.name}</p>
            <p>Email: {employee.email}</p>
            <p>Phone: {employee.phone}</p>
            <p>Image: {employee.image}</p>
            <p>Position: {employee.position}</p>
            <p>ID: {employee.id}</p>
            <button className="btn" onClick={() => handleEdit(employee)}>
              Edit
            </button>
            <button className="btn" onClick={() => handleDelete(employee.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeComponent;
