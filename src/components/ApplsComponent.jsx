import React from "react";
import {
    Button,
    CardHeader,
    CardBody,
    Card,
    CardFooter,
  } from "reactstrap";

function ApplsComponent(props) {
  return(
    <>
      <h1>Applications</h1>
      <div>
      {props.appls.map((appls)=>{
      return(
      <Card key={appls._id}> 
        <CardHeader>{appls.userid.name}</CardHeader>
        <CardBody>{appls.reason}</CardBody>
        <CardFooter>
          <div className="row">
            <Button>Accept</Button>
            <Button>Reject</Button>
          </div>
        </CardFooter>
      </Card>)
  })}
      </div>
    </>
  )}

export default ApplsComponent;
