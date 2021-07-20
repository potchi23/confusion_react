import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Label, Button, ModalHeader, Modal, ModalBody, Row, Col } from 'reactstrap';
import DateFormat from '../utils/DateFormat';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baseURL';

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
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
                            <Label htmlFor="author">Your Name</Label>
                            <Col>
                                <Control.text model = ".author" id="author" name="author" placeholder="Your name" className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model = ".author"
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

function RenderComments({comments, postComment, dishId}){

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
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );

    }
    else{
        return(<div></div>);
    }
}

function RenderDish({dish}){
    return(
        <Card>
            <CardImg width="100%" object src={baseURL + dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function DishDetail(props) {

    if(props.isLoading){
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }

    else if(props.errMess){
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else if(props.dish != null){
        const dish = props.dish;
        const comments = props.comments;
        const postComment = props.postComment;

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
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-sm col-md-5 m-1">
                        <RenderComments comments={comments} postComment={postComment} dishId={dish.id}/>
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
