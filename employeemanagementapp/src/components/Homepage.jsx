import React, { useEffect } from "react";
// import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import toast from "react-hot-toast";

const Homepage = () => {
const users={
    fname:"",
    lname:"",
    email:"",
    password:""

}
const[user,setUser]=useState(users);
const[allusers,setAllUsers]=useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
 
useEffect(()=>{
const fetchData=async()=>{
   const response= await axios.get("http://localhost:5000/employees/getAll")
setAllUsers(response.data)
}
fetchData();
},[allusers])

const inputHandler=(e)=>{
 const {name,value}=e.target;
//  console.log(name);
//  console.log(value);
 setUser({...user,[name]:value});
 console.log(user);
}

const submitForm=async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:5000/employees/create",user)
    .then((response)=>{
// console.log(response);
toast.success("new Employee created successfully",{position:'top-right'})
    console.log(response.data);
}).catch(error=>console.log(error))
}

const deleteUser = async (userId) => {
  try {
    await axios.delete(`http://localhost:5000/employees/deleteuser/${userId}`);
    // Update allusers state after successful deletion
    setAllUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    toast.success("Employee deleted successfully", { position: 'top-right' });
  } catch (error) {
    console.log(error);
  }
};
  return (
    <Container>
      <div>
        {/* <Link to={"/add"}>
            <Button className="btn btn-info ms-5">Add</Button>
          </Link> */}

        <>
          <Button variant="primary" className="ms-5 " onClick={handleShow}>
            Add
          </Button>

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
<Form onSubmit={submitForm}>
                <Modal.Body>
              
                  <FloatingLabel
                    controlId="firstNameInput"
                    label="First name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="fname"
                      placeholder="First name"
                      onChange={inputHandler}
                    />
                  </FloatingLabel>
    
                  <FloatingLabel
                    controlId="lastNameInput"
                    label="Last name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="lname"
                      placeholder="Last name"
                      onChange={inputHandler}
    
                    />
                  </FloatingLabel>
    
                  <FloatingLabel
                    controlId="emailInput"
                    label="Email"
                    className="mb-3"
    
                  >
                    <Form.Control 
                     type="email" 
                     name="email" 
                     placeholder="Email"
                     onChange={inputHandler}
                     />
                  </FloatingLabel>
    
                  <FloatingLabel
                    className="mt-3"
                    controlId="passwordInput"
                    label="Password"
                  >
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={inputHandler}
    
                    />
                  </FloatingLabel>
                </Modal.Body>{" "}
                <Modal.Footer>
                  {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button> */}
                  <Button type="submit" variant="primary" onClick={handleClose}>
                    Add user
                  </Button>
                </Modal.Footer>
                
    
</Form>          
</Modal>
        </>

        <Table striped bordered hover className="mt-5 container w-100  ">
          <thead>
            <tr>
              <th>#</th>
              <th>User name</th>
              <th>User Email</th>
              <th>Password</th>
              {/* <th>Phone Number</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                allusers.map((user,index)=>{
                    return(
                        <tr key={user._id}>
                        <td>{index+1}</td>
                        <td>{user.fname} {user.lname}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        {/* <td>1234564123</td> */}
                        <td>
                          <Link to={`/edit/`+user._id}>
                            <Button className="btn btn-primary">
                              <i class="fa-solid fa-pen-to-square"></i>
                            </Button>
                          </Link>
          
                          <Button onClick={()=>deleteUser(user._id)} className="btn btn-danger ms-2">
                            <i class="fa-solid fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
          
                    )
                })
            }
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Homepage;
