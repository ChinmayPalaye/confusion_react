import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderComments({comments}){
    return comments.map(cmt=>{
        return (
            <blockquote key={cmt.id}>
                {cmt.comment}
                <footer>--{cmt.author}, {new Date(cmt.date).toDateString().substring(4)}</footer>
            </blockquote>
        );
    });
}

function RenderDish({dish}){
    return (
        <Card>
            <CardImg src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function DishDetail(props){
    const dish = props.dish;
    if(dish!=null){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h2>Comments</h2>
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
            
    );
    }
    else return (<div></div>);
}

export default DishDetail;