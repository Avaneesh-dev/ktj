import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import RegisterComponent from "./RegisterComponent";
import Cookies from "universal-cookie";
const cookies = new Cookies();
function LoginComponent() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const userName = cookies.get("USER");

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    const configuration = {
      method: "post",
      url: "http://localhost:3000/login",
      data: {
        name,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result.data);
        setRegister(true);
        // set the cookie
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        cookies.set("USER", result.data.name, {
          path: "/",
        });
        cookies.set("USERID", result.data.id, {
          path: "/",
        });
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
    e.preventDefault();
  };
  return (
    <div className="container text-white">
      <div className="row col-9 d-flex align-items-center">
        <h2>Login</h2>
        <Form onSubmit={(e) => handleSubmit(e)}>
          {/* email */}
          <Form.Group className="my-2" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          {/* password */}
          <Form.Group className="my-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* submit button */}
          <Button className="my-2" variant="primary" type="submit">
            Submit
          </Button>
          {userName ? (
            <p className="text-success">You Are Logged in as {userName}</p>
          ) : (
            <p className="text-danger">You Are Not Logged in</p>
          )}
        </Form>
      </div>
      <div>
        <RegisterComponent />
      </div>
    </div>
  );
}

export default LoginComponent;
