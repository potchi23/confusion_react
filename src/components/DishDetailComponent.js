import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import DateFormat from '../utils/DateFormat'

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

    if(dish != null){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm col-md-5 m-1">
                        {renderDish(dish)}
                    </div>
                    <div className="col-sm col-md-5 m-1">
                        {renderComments(dish.comments)}
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
