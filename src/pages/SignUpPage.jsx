import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Api from "../api";

function SignUpPage() {
  // These four states hold the input values
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  //

  const navigate = useNavigate();

  const handleSignUp = async (firstName, lastName, email, password) => {
    try {
      // This function fires the post request and the auth endpoint
      await Api.post("/auth/sign-up", {
        firstName,
        lastName,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          // values are given to the handleSignUp function
          handleSignUp(firstName, lastName, email, password);
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            required
            type="firstname"
            placeholder="Enter Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            required
            type="lastname"
            placeholder="Enter Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" to="/login" as={NavLink}>
          Back
        </Button>

        <Button variant="primary" type="submit" className="signUp-button">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default SignUpPage;
