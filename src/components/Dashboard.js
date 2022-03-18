import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, setErrorMsg, errorMsg, logout, loading } = useAuth();

  async function handleLogout() {
    console.log("first");
    setErrorMsg("");

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setErrorMsg(error.massage);
    }
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <strong>Email:</strong> {currentUser?.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
