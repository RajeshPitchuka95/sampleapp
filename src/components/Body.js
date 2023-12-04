import React, { useEffect, useState } from "react";
import { Table, Input, Spinner } from "reactstrap";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../store/selectedEmployeeSlice";
import { useNavigate } from "react-router-dom";
import { updateEmployeeList } from "../store/employeeListSlice";
import Header from "./Header";

const Body = () => {
  const [empDetails, setEmpDetails] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const empList = useSelector((store) => {
    return store.employeeList.employeeList;
  });
  useEffect(() => {
    console.log(empList);
    setEmpDetails(empList);
  }, [empList]);

  const [newEmployee, setNewEmployee] = useState({
    name: { firstname: "", lastname: "" },
    email: "",
    address: { city: "" },
    phone: "",
  });

  // Add state variables for validation
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const url = "https://fakestoreapi.com/users";

  const toggle = () => setModal(!modal);
  const toggleEditModal = () => {
    if (!editModal) {
      resetErrors();
    }
    setEditModal(!editModal);
  };
  const toggleAddModal = () => {
    if (!addModal) {
      resetErrors();
    } else {
      resetNewEmployee();
    }
    setAddModal(!addModal);
  };

  useEffect(() => {
    getEmpDetails();
  }, []);

  async function getEmpDetails() {
    const data = await fetch(url);
    const json = await data.json();
    dispatch(updateEmployeeList(json));
  }

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    toggle();
  };

  const handleConfirmDelete = async () => {
    const updatedEmployees = empDetails.filter(
      (item) => item.id !== selectedEmployee.id
    );
    dispatch(updateEmployeeList(updatedEmployees));
    toggle();
  };

  const handleEdit = (employee) => {
    setEditedEmployee(employee);
    toggleEditModal();
  };

  const validateEmployee = (employee) => {
    // Validate the first name
    if (!employee.name.firstname.trim()) {
      setFirstNameError("First name is required");
      return false;
    }

    // Validate the email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!employee.email.trim() || !emailPattern.test(employee.email.trim())) {
      setEmailError("Invalid email address");
      return false;
    }

    // Validate the phone number
    const phonePattern = /^\d{10}$/; // Change this pattern based on your phone number format
    if (!employee.phone.trim() || !phonePattern.test(employee.phone.trim())) {
      setPhoneError("Invalid phone number");
      return false;
    }
    // Validate the first name
    if (!employee.name.firstname.trim()) {
      setFirstNameError("First name is required");
      return false;
    }
    // Validate the first name
    if (!employee.name.firstname.trim()) {
      setFirstNameError("First name is required");
      return false;
    }

    // Reset errors if validation passes
    resetErrors();
    return true;
  };

  const handleAddNew = () => {
    if (validateEmployee(newEmployee)) {
      // Update the employee list after adding
      setEmpDetails([
        { ...newEmployee, id: empDetails.length + 1 },
        ...empDetails,
      ]);

      // Clear the form and reset validation state
      setNewEmployee({
        name: { firstname: "", lastname: "" },
        email: "",
        address: { city: "" },
        phone: "",
      });
      toggleAddModal();
    }
  };

  const handleSaveEdit = () => {
    if (validateEmployee(editedEmployee)) {
      const updatedEmployees = empDetails?.map((item) =>
        item.id === editedEmployee.id ? editedEmployee : item
      );
      dispatch(updateEmployeeList(updatedEmployees));
      toggleEditModal();
    }
  };
  const handleClickRow = (emp) => {
    dispatch(addEmployee(emp));
    navigate("empdetails/:" + emp.id);
  };

  const resetErrors = () => {
    setFirstNameError("");
    setEmailError("");
    setPhoneError("");
  };

  const resetNewEmployee = () => {
    setNewEmployee({
      name: { firstname: "", lastname: "" },
      email: "",
      address: { city: "" },
      phone: "",
    });
  };

  return (
    <>
      <Header />
      <div className="app-body">
        {empDetails.length !== 0 && (
          <div>
            <Button
              color="primary"
              className="add-employee"
              onClick={toggleAddModal}
              size="sm"
            >
              Add Employee
            </Button>
          </div>
        )}
        {/* Add Modal */}
        <Modal isOpen={addModal} toggle={toggleAddModal}>
          <ModalHeader toggle={toggleAddModal}>Add Employee</ModalHeader>
          <ModalBody>
            <label>First Name</label>
            <Input
              type="text"
              value={newEmployee.name.firstname}
              onChange={(e) => {
                setNewEmployee({
                  ...newEmployee,
                  name: { ...newEmployee.name, firstname: e.target.value },
                });
                setFirstNameError("");
              }}
              className={firstNameError ? "is-invalid" : ""}
            />
            {firstNameError && (
              <div className="invalid-feedback">{firstNameError}</div>
            )}

            <label>Last Name</label>
            <Input
              type="text"
              value={newEmployee.name.lastname}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  name: { ...newEmployee.name, lastname: e.target.value },
                })
              }
            />

            <label>Email</label>
            <Input
              type="text"
              value={newEmployee.email}
              onChange={(e) => {
                setNewEmployee({ ...newEmployee, email: e.target.value });
                setEmailError("");
              }}
              className={emailError ? "is-invalid" : ""}
            />
            {emailError && <div className="invalid-feedback">{emailError}</div>}

            <label>Phone</label>
            <Input
              type="text"
              value={newEmployee.phone}
              onChange={(e) => {
                setNewEmployee({ ...newEmployee, phone: e.target.value });
                setPhoneError("");
              }}
              className={phoneError ? "is-invalid" : ""}
            />
            {phoneError && <div className="invalid-feedback">{phoneError}</div>}

            <label>City</label>
            <Input
              type="text"
              value={newEmployee.address.city}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  address: { ...newEmployee.address, city: e.target.value },
                })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleAddNew}>
              Add
            </Button>
            <Button color="secondary" onClick={toggleAddModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <div>
          {empDetails.length === 0 ? (
            <div className="table-spinner">
              <Spinner color="primary">Loading...</Spinner>
            </div>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Phone</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {empDetails?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name.firstname}</td>
                      <td>{item.name.lastname}</td>
                      <td>{item.email}</td>
                      <td>{item.address.city}</td>
                      <td>{item.phone}</td>
                      <td>
                        <MdDelete
                          color="red"
                          size={20}
                          onClick={() => handleDelete(item)}
                        />
                        <MdModeEdit
                          size={20}
                          color="blue"
                          onClick={() => handleEdit(item)}
                        />
                        <span onClick={() => handleClickRow(item)}>
                          <FaRegUserCircle size={20} color="powderblue" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>

        {/* Delete Modal */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Delete Employee</ModalHeader>
          <ModalBody>Do you want to delete this employee?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleConfirmDelete}>
              Yes
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* Edit Modal */}
        <Modal isOpen={editModal} toggle={toggleEditModal}>
          <ModalHeader toggle={toggleEditModal}>Edit Employee</ModalHeader>
          <ModalBody>
            <label>First Name</label>
            <Input
              type="text"
              value={editedEmployee?.name?.firstname || ""}
              onChange={(e) =>
                setEditedEmployee({
                  ...editedEmployee,
                  name: { ...editedEmployee.name, firstname: e.target.value },
                })
              }
              className={firstNameError ? "is-invalid" : ""}
            />
            {firstNameError && (
              <div className="invalid-feedback">{firstNameError}</div>
            )}

            <label>Last Name</label>
            <Input
              type="text"
              value={editedEmployee?.name?.lastname || ""}
              onChange={(e) =>
                setEditedEmployee({
                  ...editedEmployee,
                  name: { ...editedEmployee.name, lastname: e.target.value },
                })
              }
            />

            <label>Email</label>
            <Input
              type="text"
              value={editedEmployee?.email || ""}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, email: e.target.value })
              }
              className={emailError ? "is-invalid" : ""}
            />
            {emailError && <div className="invalid-feedback">{emailError}</div>}

            <label>Phone</label>
            <Input
              type="text"
              value={editedEmployee?.phone || ""}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, phone: e.target.value })
              }
              className={phoneError ? "is-invalid" : ""}
            />
            {phoneError && <div className="invalid-feedback">{phoneError}</div>}

            <label>City</label>
            <Input
              type="text"
              value={editedEmployee?.address?.city || ""}
              onChange={(e) =>
                setEditedEmployee({
                  ...editedEmployee,
                  address: { ...editedEmployee.address, city: e.target.value },
                })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button color="secondary" onClick={toggleEditModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default Body;
