import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login, setErrorMsg, setLoading, errorMsg, loading } =
    useAuth();
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setErrorMsg("");
      setLoading(true);
      const res = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      history("/");
    } catch (error) {
      setErrorMsg(error.message);
    }
    setLoading(false);
  }
  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            {loading ? (
              <Button disabled={loading} className="w-100" type="submit">
                ...loading
              </Button>
            ) : (
              <Button className="w-100" type="submit">
                Log in
              </Button>
            )}
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
