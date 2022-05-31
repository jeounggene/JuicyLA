import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "./UserAuthContext";
import './LoginPage.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/Profile");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/Profile");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
	<div className="background">
		<div className="loginDiv">
		<div className="p-4 box">
			<h2 className="mb-3">Firebase Auth Login</h2>
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Control
				type="email"
				placeholder="Email address"
				onChange={(e) => setEmail(e.target.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Control
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>

			<div className="d-grid gap-2">
				<Button variant="primary" type="Submit">
				Log In
				</Button>
			</div>
			</Form>
			<hr />
			<div>
			<GoogleButton
				className="g-btn"
				type="dark"
				onClick={handleGoogleSignIn}
			/>
			</div>
		</div>
		<div className="p-4 box mt-3 text-center">
			No account? <Link to="/Signup">Sign up</Link>
		</div>
		</div>
	</div>
  );
};

export default Login;