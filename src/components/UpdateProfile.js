import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    currentUser,

    setErrorMsg,
    setLoading,
    errorMsg,
    loading,
    updateNewPassword,
    updateNewEmail,
  } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setErrorMsg("Passwords do not match");
    }
    const promises = [];
    setLoading(true);
    setErrorMsg("");
    if (emailRef.current.value) {
      promises.push(updateNewEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateNewPassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        setMessage("information updated Successfully");
        navigate("/");
      })
      .catch(() => {
        setErrorMsg("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
};

export default UpdateProfile;
