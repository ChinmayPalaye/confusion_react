import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem, Button, Container} from 'reactstrap';
import {Modal, ModalHeader, ModalBody, Label, Col, Row} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import Loading from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const required = value=> value && value.length;
const maxLength = (length)=> (value)=> !value || (value.length <= length);
const minLength = (length)=> (value)=> value && (value.length >= length);


function RenderComments({comments, postComment, dishId}){
    const coms = comments.map(cmt=>{
        return (
            <blockquote key={cmt.id}>
                {cmt.comment}
                <footer>--{cmt.author}, {new Date(cmt.date).toDateString().substring(4)}</footer>
            </blockquote>
        );
    });
    return (
        <>
        {coms}
        <CommentForm postComment={postComment} dishId={dishId}/>
        </>
    );
}

function RenderDish({dish}){
    return (
        <Card>
            <CardImg src={baseUrl+dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    toggleModal= ()=>{
        this.setState({isModalOpen: !this.state.isModalOpen})
    }
    handleSubmit=(values)=>{
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating,values.name,values.comment);
    }

    render(){
        return (
            <>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil"> Submit Comment</span>
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Submit a Comment
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" className="form-control" name="rating" id="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".name" name="name" id="name" placeholder="Your Name"
                                className="form-control" validators={{required, minLength:minLength(3), maxLength:maxLength(15)}}/>
                                <Errors className="text-danger" model=".name" show="touched"
                                    messages={{
                                        required: "Required",
                                        minLength: "Must be greater than 3 characters",
                                        maxLength: "Must be less than 15 characters"
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea rows="6" model=".comment" name="comment" id="comment" placeholder="Comment"
                                className="form-control" validators={{required}}/>
                                <Errors className="text-danger" model=".name" show="touched"
                                    messages={{
                                        required: "Required"
                                    }}
                                />
                            </Row>
                            <Row><Button type="submit" value="submit" className="bg-primary">Submit</Button></Row>
                        </LocalForm>
                    </Container>
                </ModalBody>
            </Modal>
            </>
        );
    }
    
}

function DishDetail(props){
    if(props.isLoading){
        return (
            <div className="container">
                <div className='row'>
                    <Loading/>
                </div>
            </div>
        );
    }
    else if(props.errMess){
        return (
            <div className="container">
                <div className='row'>
                    <h4>props.errMess</h4>
                </div>
            </div>
        );
    }
    else if(props.dish!=null){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h2>Comments</h2>
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
            
    );
    }
    else return (<div/>);
}

export default DishDetail;