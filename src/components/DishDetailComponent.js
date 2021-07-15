import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);

        this.status = {

        }
    }

    renderDish(dish){
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

    renderComments(comments){

        if(comments != null){
            const comment = comments.map((comment) => {
                return(
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {comment.date}</p>
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

    render(){
        const dish = this.props.dish;

        if(dish != null){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm col-md-5 m-1">
                            {this.renderDish(dish)}
                        </div>

                        <div className="col-sm col-md-5 m-1">
                            {this.renderComments(dish.comments)}
                        </div>
                    </div>
                </div>

            );
        }
        else{
            return(<div></div>);
        }
    }
}

export default DishDetail;
