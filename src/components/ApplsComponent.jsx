import React from "react";
import {
    Button,
    CardHeader,
    CardBody,
    Card,
    CardFooter,
  } from "reactstrap";

function ApplsComponent(props) {
  let acceptedAppls=props.appls.filter((a)=> a.status===true)
  if(props.compe.length){
    if(acceptedAppls.length>=props.compe[0].members){
    props.hideCompe(props.compe[0]._id)
  }}
  return(
    <>
      <h1>Applications</h1>
      <div className="container p-4">
      {props.appls.map((appls)=>{
      return(
      <Card key={appls._id}> 
        <CardHeader className="h3 ">{appls.userid.name}</CardHeader>
        <CardBody className="">{appls.reason}</CardBody>
        <CardFooter className="text-right">
          <div className="col-12 row">
            <div className="col-4">
            {appls.status?(
                <Button color="success">Accepted</Button>)
            :(
            <Button color="success" onClick={(e)=>props.updateAppl(e,appls._id, true)}>Accept</Button>)}
            </div>
            <div className="col-4">
            {appls.status===false?(
                <Button color="danger">Rejected</Button>)
            :(
            <Button color="danger" onClick={(e)=>props.updateAppl(e,appls._id, false)}>Reject</Button>)}
            </div>
          </div>
        </CardFooter>
      </Card>)
      })}
      </div>
    </>
  )}

export default ApplsComponent;
