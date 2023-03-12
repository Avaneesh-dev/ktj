import React, { useState } from "react";
import { Baseurl } from "./Baseurl";
import "./home.css";
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
  CardFooter,
} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "axios";
import Typical from "react-typical";

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
      url: `https://${Baseurl}/compe`,
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
      url: `https://${Baseurl}/compe/${c._id}`,
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
      url: `https://${Baseurl}/appls`,
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
      <Card key={c._id} className="m-3 rounded">
        <CardHeader className="h3 text-capitalize fst-italic">
          {c.name}
        </CardHeader>
        <CardBody className="text-capitalize">
          <b>Teammates required:</b> {c.members} <br />
          <b>Description:</b> {c.description} <br />
          <div className="mt-1 row">
            {user ? (
              <>
                <div className="row">
                  {user === c.user ? (
                    <Button className="col-sm-12 col-md-2 m-2">
                      Posted By You!
                    </Button>
                  ) : result ? (
                    <Button color="success" className="col-sm-12 col-md-3 m-2">
                      Already applied!
                    </Button>
                  ) : (
                    <UncontrolledAccordion
                      className="col-sm-12 col-md-8 m-2"
                      key={c._id}
                      defaultOpen="0"
                    >
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
                            <Button color="primary"
                              className="col-sm-12 col-md-4 m-2"
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
                    <Button className="col-md-2 m-2" href={`/appls/${c._id}`}>
                      Applications
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
             <a href="/login"><span className="text-danger">Login to apply!</span></a> 
            )}
          </div>
        </CardBody>
        <CardFooter>
          {user === c.user ? (
            <Button
              color="danger"
              className="col-sm-3 col-md-2"
              onClick={(e) => handleDelete(e, c)}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
        </CardFooter>
      </Card>
    );
  });
  return (
    <>
      <div id="header" className="h2 row col-12 p-3 vh-90">
        <div className="col-md-6 col-sm-12">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            width="100%"
            id="blobSvg"
            style={{ opacity: 1 }}
          >
            <image
              x="0"
              y="0"
              width="100%"
              height="100%"
              clipPath="url(#shape)"
              href="https://images.unsplash.com/photo-1499540633125-484965b60031?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
              preserveAspectRatio="none"
            ></image>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "rgb(193, 245, 81)" }}
                ></stop>
                <stop
                  offset="100%"
                  style={{ stopColor: "rgb(189, 0, 82)" }}
                ></stop>
              </linearGradient>
            </defs>
            <clipPath id="shape">
              <path id="blob" fill="url(#gradient)">
                <animate
                  attributeName="d"
                  dur="3700ms"
                  repeatCount="indefinite"
                  values="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;M453.78747,319.98894Q416.97789,389.97789,353.96683,436.87838Q290.95577,483.77887,223.95577,447.43366Q156.95577,411.08845,105.64373,365.97789Q54.33169,320.86732,62.67444,252.61056Q71.01719,184.3538,113.01965,135.21007Q155.02211,86.06634,220.52211,66.46683Q286.02211,46.86732,335.5,91.94472Q384.97789,137.02211,437.78747,193.51106Q490.59704,250,453.78747,319.98894Z;M411.39826,313.90633Q402.59677,377.81265,342.92059,407.63957Q283.24442,437.46649,215.13648,432.5428Q147.02853,427.61911,82.23325,380.9572Q17.43796,334.29529,20.45223,250.83809Q23.46649,167.38089,82.5856,115.05707Q141.70471,62.73325,212.19045,63.73015Q282.67618,64.72705,352.67308,84.79839Q422.66998,104.86972,421.43486,177.43486Q420.19974,250,411.39826,313.90633Z;M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;"
                ></animate>
              </path>
            </clipPath>
          </svg>
        </div>
        <div className="col-md-6 d-flex flex-column align-self-center">
          <div className="p-3">
            Welcome to Get A Team, find your dream team and scale new heights,
            or explore the posted events to participate in!
          </div>
          <div className="p-3">
            <Typical
              steps={[
                "Never alone!💪",
                1500,
                "Win Together!🤗",
                1500,
                "All The Best!💯",
                1500,
              ]}
              loop={Infinity}
              wrapper="p"
            />
          </div>
        </div>
      </div>
      <div className="container bc rounded">
        <div className="h1 p-3 text-center text-decoration-underline fw-bold">Competitions</div>
        <div className="p-3">{Competitions}</div>
        {user ? (
          <div className="col-12 col-md-9 p-3">
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
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default HomeComponent;
