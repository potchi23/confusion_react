import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import DateFormat from '../utils/DateFormat';
import { Link } from 'react-router-dom';

function renderComments(comments){

    if(comments != null){
        const comment = comments.map((comment) => {

            const date = DateFormat.formatDate(comment.date);

            return(
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author} , {date}</p>
                </div>
            );
        });

        return(
            <div>
                <h4>Comments</h4>
                {comment}
            </div>
        );
    }
    else{
        return(<div></div>);
    }
}

function renderDish(dish){
    return(
        <Card>
            <CardImg width="100%" object src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function DishDetail(props) {

    const dish = props.dish;
    const comments = props.comments;

    if(dish != null){
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
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm col-md-5 m-1">
                        {renderDish(dish)}
                    </div>
                    <div className="col-sm col-md-5 m-1">
                        {renderComments(comments)}
                    </div>
                </div>
                
            </div>
        );
    }
    else{
        return(<div></div>);
    }
}

export default DishDetail;
