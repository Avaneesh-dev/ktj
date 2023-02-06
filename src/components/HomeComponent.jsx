import React, {useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, Col, CardHeader, CardBody, Card } from "reactstrap";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

function HomeComponent() {
    const [name, setName] = useState("");
    const [members, setMembers] =useState(1);
    const [description, setDescription]=useState("");
    const [compe, setCompe]=useState([]);
    const token = cookies.get("TOKEN");
    const user =cookies.get("USER");
    useEffect(()=> {
      const configuration = {
          method: "get",
          url: "http://localhost:3000/compe",
        };
        axios(configuration)
        .then((result) => {setCompe(result.data);})
        .catch((error) => {
          error = new Error();
          setCompe(error);
        });
    })

    const handleSubmit = (e) => {      
      const configuration = {
        headers: {"Authorization": `bearer ${token}`},
          method: "post",
          url: "http://localhost:3000/compe",
          data: {
            user,
            name,
            members,
            description
          },
        };
        axios(configuration)
        .then((result) => {console.log(result)})
        .catch((error) => {
          error = new Error();
          console.log(error);
        });
      // prevent the form from refreshing the whole page
      e.preventDefault();
    }
    const handleDelete = (e,c) => {      
      const configuration = {
        headers: {"Authorization": `bearer ${token}`},
          method: "delete",
          url: `http://localhost:3000/compe/${c._id}`,          
        };
        axios(configuration)
        .then((result) => {console.log(result)})
        .catch((error) => {
          error = new Error();
          console.log(error);
        });
      // prevent the form from refreshing the whole page
      e.preventDefault();
    }
    const Competitions = compe.map((c)=>{
      return(
      <div>
        <Card>
          <CardHeader>{c.name}</CardHeader>
          <CardBody>
            Number of Members needed: {c.members} <br />
            {c.description} <br />
          </CardBody>
          <Button>Apply</Button>
          {user==c.user ? (
          <Button onClick={(e) => handleDelete(e,c)}>Delete</Button>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}        
        </Card>
      </div>)
    });
    return(
    <div>      
      <div>
        {Competitions}
      </div>
      <div className="col-12 col-md-9">
        <Form>
          <FormGroup row>
            <Label htmlFor="name" md={2}>
              Name of Competition
            </Label>
            <Col md={10}>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}                  
              />
            </Col>
          </FormGroup>
          <FormGroup row>
          <Label htmlFor="message" md={2}>
              Number of members needed
          </Label>
          <Col md={10}>
              <Input type="text" id="members" name="members" value={members} onChange={(e) => setMembers(e.target.value)}></Input>
          </Col>
          </FormGroup>                      
          <FormGroup row>
            <Label htmlFor="message" md={2}>
              Description of Competition
            </Label>
            <Col md={10}>
              <Input
                type="textarea"
                id="message"
                name="message"
                rows="12"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md={{ size: 10, offset: 2 }}>
              <Button type="submit" color="primary" onClick={(e)=> handleSubmit(e)}>
                Send Request
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
    )
}

export default HomeComponent