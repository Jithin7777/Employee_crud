import React, { useEffect } from "react";
// import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Badge, Col, Container, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import toast from "react-hot-toast";
import "./Homepage.css";

const Homepage = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(users);
  const [allusers, setAllUsers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/employees/getAll"
        );
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ ]); // Empty dependency array to fetch data only once when component mounts  
  
  
  
  const inputHandler = (e) => {
    const { name, value } = e.target;
    //  console.log(name);
    //  console.log(value);
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/employees/create", user)
      .then((response) => {
        // console.log(response);
        toast.success("new Employee created successfully", {
          position: "top-right",
        });
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/employees/deleteuser/${userId}`
      );
      // Update allusers state after successful deletion
      setAllUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
      toast.success("Employee deleted successfully", { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container  mx-auto">
      <div>
        {/* <Link to={"/add"}>
            <Button className="btn btn-info ms-5">Add</Button>
          </Link> */}
        <>
          <Button
            className="ms-5 add-button text-dark "
            onClick={handleShow}
            style={{ background: "#61FF7E", border: "none", outline: "none",marginTop:'100px' }}
          >
            <div className="d-flex align-items-center fs-5   ">
              Add<i class="fa-solid fa-plus ms-1"></i>
            </div>
          </Button>
          {/* style={{background:'#617ffe'}} */}

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton  className="bg-light text-dark">
              <Modal.Title >Add new user</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitForm}>
              <Modal.Body className="bg-dark">
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
              <Modal.Footer className="bg-dark" >
                {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button> */}
                <Button type="submit" variant="success" onClick={handleClose}>
                  Add user
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
        <Row>
          <Col>
            <div className="table-responsive ">
              <Container fluid className="mt-5">
                <Table
                  striped
                  hover
                  className="mt-5  container custom-table  "
                  style={{ borderBottom: "1px solid #61FF7E" }}
                >
                  <thead>
                    <tr className="">
                      <th style={{ color: "#61FF7E" }}>#</th>
                      <th style={{ color: "#61FF7E" }} className="ps-3">
                        User name
                      </th>
                      <th style={{ color: "#61FF7E" }} className="ps-3">
                        User Email
                      </th>
                      <th style={{ color: "#61FF7E" }} className="ps-3">
                        Password
                      </th>
                      {/* <th>Phone Number</th> */}
                      <th style={{ color: "#61FF7E" }} className="ps-2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allusers.map((user, index) => {
                      return (
                        <tr key={user._id} style={{}}>
                          <td
                            style={{ color: "#61FF7E", marginTop: "20px" }}
                            className=" "
                          >
                            <Badge bg="light text-dark ">{index + 1}</Badge>
                          </td>
                          <td>
                            <div className="d-flex align-items-center  text-white ms-2 ">
                              <i
                                class="fa-solid fa-circle-user fs-4 me-2 "
                                style={{ color: "#61FF7E" }}
                              ></i>
                              {user.fname} {user.lname}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center  text-white ms-2 ">
                              <i
                                class="fa-solid fa-envelope fs-4 me-2"
                                style={{ color: "#61FF7E" }}
                              ></i>{" "}
                              {user.email}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center   text-white ms-2">
                              <i
                                class="fa-solid fa-key fs-4 me-2"
                                style={{ color: "#61FF7E" }}
                              ></i>
                              {user.password}
                            </div>
                          </td>
                          {/* <td>1234564123</td> */}
                          <td className=" ">
                            <Link to={`/edit/` + user._id}>
                              <Button className="btn btn-primary">
                                <i class="fa-solid fa-pen-to-square"></i>
                              </Button>
                            </Link>

                            <Button
                              onClick={() => deleteUser(user._id)}
                              className="btn btn-danger ms-2"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>{" "}
            </div>{" "}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Homepage;
