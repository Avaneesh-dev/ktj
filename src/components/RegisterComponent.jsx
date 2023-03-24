import React, {useState} from 'react'
import {Form, Button} from "react-bootstrap";
import { Baseurl } from './Baseurl';
import axios from "axios";
function RegisterComponent() {
    const [name, setName] = useState("");
    const [password, setPassword] =useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        const configuration = {
            method: "post",
            url: `https://${Baseurl}/register`,
            data: {
              name,
              password,
            },
          };
          axios(configuration)
          .then((result) => {setRegister(true); console.log(result)})
          .catch((error) => {
            error = new Error();
            alert(error);
            console.log(error);
          });
        e.preventDefault();
        
      }
  return (    
    <div>
        <div className='col-9'>
        <h2>Register</h2>
      <Form onSubmit={(e)=>handleSubmit(e)}>
        <Form.Group className="my-2" controlId="formRegistrationName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Unique Username" value={name} onChange={(e) => setName(e.target.value)}/>
        </Form.Group>

        {/* password */}
        <Form.Group className="my-2" controlId="formRegistrationPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        {/* submit button */}
        <Button className="my-2" variant="primary" type="submit"  onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">If Not Yet Registered, Please Fill The Form.</p>
        )}
      </Form>
    </div>
    </div>
  )
}

export default RegisterComponent