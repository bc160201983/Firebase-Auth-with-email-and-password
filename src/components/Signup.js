import React, { useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, signup, setErrorMsg, setLoading, errorMsg, loading } =
    useAuth();
  const history = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setErrorMsg("passwords do not match");
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const res = await signup(
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
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            {loading ? (
              <Button disabled={loading} className="w-100" type="submit">
                ...loading
              </Button>
            ) : (
              <Button className="w-100" type="submit">
                Sign Up
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
