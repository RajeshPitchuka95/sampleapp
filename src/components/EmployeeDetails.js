import React from "react";
import { useSelector } from "react-redux";

const EmployeeDetails = () => {
  const employeeDetails = useSelector(
    (store) => store.selectedEmployee.selectedEmployee
  );
  console.log(employeeDetails);

  return (
    <div className="app-body">
      <h3>EmployeeDetails:</h3>
      {employeeDetails && (
        <div>
          <span><b>First Name:</b> {employeeDetails?.name?.firstname}</span>
          <br />
          <span><b>Last Name: </b>{employeeDetails?.name?.lastname}</span>
          <br />
          <span><b>User Name: </b>{employeeDetails?.username}</span>
          <br />
          <span><b>Email: </b>{employeeDetails?.email}</span>
          <br />
          <span><b>Phone: </b>{employeeDetails?.phone}</span>
          <br />
          <span><b>City: </b>{employeeDetails?.address?.city}</span>
          <br />
          <span><b>Street: </b>{employeeDetails?.address?.street}</span>
          <br />
          <span><b>Zip Code: </b>{employeeDetails?.address?.zipcode}</span>
          <br />
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
