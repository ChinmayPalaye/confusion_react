import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    renderComments(){
        return this.props.dish.comments.map(cmt=>{
            return (
                <blockquote key={cmt.id}>
                    {cmt.comment}
                    <footer>--{cmt.author}, {new Date(cmt.date).toDateString().substring(4)}</footer>
                </blockquote>
            );
        });
    }

    render(){
        const dish=this.props.dish;
        if(dish!=null){
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg src={dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h2>Comments</h2>
                        {this.renderComments()}
                    </div>
                </div>  
            );
        }
        else return (<div></div>);
    }
}

export default DishDetail;