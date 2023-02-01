import React, { useState } from "react";
import { useEffect } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Api from "../api";

function LoginPage() {
  // These two states hold the input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // This gets the token from local storage
  const token = localStorage.getItem("token");

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // Login function
  const handleLogin = async (email, password) => {
    // First it will try to run the auth function in the backend to
    // check if the values exist
    try {
      const newLogin = await Api.post("/auth/login", {
        email,
        password,
      });

      // Then if it does exist the token given to a user when logging in will
      // be saved to localStorage

      localStorage.setItem("token", newLogin.token);

      // This will nagivate you to the todolist page
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  // It will only navigate if a token is valid
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <div>
        {/* conditionally renders depending on if a user has entered valid values */}
        {error && <Alert variant="danger">Invalid email or password</Alert>}
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            // This gets the values entered and gives it to the function to get verified
            handleLogin(email, password);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email Address"
              // Values is set to this state
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
              // Values is set to this state
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log In
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="signUp-button"
            to="/sign-up"
            as={NavLink}
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;
