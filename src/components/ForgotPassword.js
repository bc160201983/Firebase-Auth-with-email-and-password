import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../Context";
const ForgotPassword = () => {
  const [message, setMessage] = useState();
  const {
    currentUser,
    signup,
    setErrorMsg,
    setLoading,
    resetPassword,
    errorMsg,
    loading,
  } = useAuth();
  const emailRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");
    setLoading(true);
    const email = emailRef.current.value;
    try {
      await resetPassword(email);
      setMessage("Password reset email sent!");
    } catch (error) {
      setErrorMsg(error.message);
    }
    setMessage("");
    setLoading(false);
  }
  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
