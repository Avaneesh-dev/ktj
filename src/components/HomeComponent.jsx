import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  CardHeader,
  CardBody,
  Card,
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

function HomeComponent(props) {
  const [name, setName] = useState("");
  const [members, setMembers] = useState(1);
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const token = cookies.get("TOKEN");
  const user = cookies.get("USER");
  const userid = cookies.get("USERID");

  const handleSubmit = (e) => {
    const configuration = {
      headers: { Authorization: `bearer ${token}` },
      method: "post",
      url: "http://localhost:3000/compe",
      data: {
        user,
        name,
        members,
        description,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
    // prevent the form from refreshing the whole page
    e.preventDefault();
  };
  const handleDelete = (e, c) => {
    const configuration = {
      headers: { Authorization: `bearer ${token}` },
      method: "delete",
      url: `http://localhost:3000/compe/${c._id}`,
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
    // prevent the form from refreshing the whole page
    e.preventDefault();
  };
  const handleApply = (e, c) => {
    const configuration = {
      headers: { Authorization: `bearer ${token}` },
      method: "post",
      url: `http://localhost:3000/appls`,
      data: {
        userid,
        compe: c,
        reason,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
    // prevent the form from refreshing the whole page
    e.preventDefault();
  };
  const Competitions = props.compe.map((c) => {
    let result = props.appls.find(
      ({ userid, compe }) => compe === c._id && userid.name === user
    );
    return (
      <Card key={c._id}>
        <CardHeader>{c.name}</CardHeader>
        <CardBody>
          Number of Members needed: {c.members} <br />
          {c.description} <br />
        </CardBody>
        {user ? (
          <>    
            <div className="row">
              {user === c.user ? (
                <Button>Posted By You!</Button>
              ) : result ? (
                <Button>Already applied!</Button>
              ) : (
                <UncontrolledAccordion key={c._id} defaultOpen="0">
                  <AccordionItem>
                    <AccordionHeader targetId="1">
                      Apply to this Competition
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                      <Form>
                        <FormGroup>
                          <Input
                            type="text"
                            title="reason"
                            placeholder="Reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                          />
                        </FormGroup>
                        <Button
                          onClick={(e) => {
                            handleApply(e, c._id);
                          }}
                        >
                          Confirm
                        </Button>
                      </Form>
                    </AccordionBody>
                  </AccordionItem>
                </UncontrolledAccordion>
              )}

              {user === c.user ? (
                <Button href={`/appls/${c._id}`}>Applications</Button>
              ) : (
                <p className="text-danger">Not Posted by You!</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-danger">Login to apply to this Competition</p>
        )}
        {user === c.user ? (
          <Button onClick={(e) => handleDelete(e, c)}>Delete</Button>
        ) : (
          <p className="text-danger">Not Posted by You!</p>
        )}
      </Card>
    );
  });
  return (
    <div>
      <div>{Competitions}</div>
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
                title="name"
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
              <Input
                type="text"
                id="members"
                name="members"
                value={members}
                placeholder="enter a number"
                onChange={(e) => setMembers(e.target.value)}
              ></Input>
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
              <Button
                type="submit"
                color="primary"
                onClick={(e) => handleSubmit(e)}
              >
                Send Request
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}

export default HomeComponent;
