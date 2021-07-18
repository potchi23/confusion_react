import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Label, Button, ModalHeader, Modal, ModalBody, Row, Col } from 'reactstrap';
import DateFormat from '../utils/DateFormat';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            isModalOpen : false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    render(){
        return(
            <React.Fragment>
            <Button outline onClick={this.toggleModal} className="mb-5">
                <span className="fa fa-edit fa-lg"></span> Submit Comment
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader>
                    Submit Comment
                </ModalHeader>

                <ModalBody>
                    <LocalForm onSubmit = {(values) => this.handleSubmit(values)}>

                        <Row className="form-group mb-3">
                            <Label htmlFor="rating">Rating</Label>
                            <Col>
                                <Control.select model=".rating" name="rating" className="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>

                        <Row className="form-group mb-3">
                            <Label htmlFor="name">Your Name</Label>
                            <Col>
                                <Control.text model = ".name" id="name" name="name" placeholder="Your name" className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model = ".name"
                                    show="touched"
                                    messages={{
                                        required :"Required",
                                        minLength : "Must be greater than 3 chars",
                                        maxLength : "Must be 15 chars or less"
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group mb-3">
                            <Label htmlFor="comment">Comment</Label>
                            <Col>
                                <Control.textarea model = ".comment" id="comment" name="comment" rows="6" className="form-control"/>
                            </Col>
                        </Row>

                        <Row classname="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>

                    </LocalForm>

                </ModalBody>    
            </Modal>
            </React.Fragment>

        );
    }
}

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
                        <CommentForm/>
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
