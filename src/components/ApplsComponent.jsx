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
      <div>
      {props.appls.map((appls)=>{
      return(
      <Card key={appls._id}> 
        <CardHeader>{appls.userid.name}</CardHeader>
        <CardBody>{appls.reason}</CardBody>
        <CardFooter>
          <div className="row">
            {appls.status?(
                <Button>Accepted</Button>)
            :(
            <Button onClick={(e)=>props.updateAppl(e,appls._id, true)}>Accept</Button>)}
            {appls.status===false?(
                <Button>Rejected</Button>)
            :(
            <Button onClick={(e)=>props.updateAppl(e,appls._id, false)}>Reject</Button>)}
          </div>
        </CardFooter>
      </Card>)
      })}
      </div>
    </>
  )}

export default ApplsComponent;
