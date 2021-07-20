//Actions
import { baseURL } from '../shared/baseURL';
import * as ActionTypes from './ActionTypes';

export const addComment = (comment) => (
    {
        type : ActionTypes.ADD_COMMENT,
        payload : comment
    }
);

export const postComment = (dishId, rating, author, comment) => (dispatch) =>{

    const newComment = {
        dishId : dishId,
        rating : rating,
        author : author,
        comment : comment
    }

    newComment.date = new Date().toISOString();

    return fetch(baseURL + 'comments', {
        method : 'POST',
        body : JSON.stringify(newComment),
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(comment => dispatch(addComment(comment)))
    .catch((error) => { console.log('Post comments', error.message); alert('Comment could not be posted');});
};

//THUNK
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseURL + 'dishes')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => (
    {
        type : ActionTypes.DISHES_LOADING
    }
);


export const dishesFailed = (errmess) => (
    {
        type : ActionTypes.DISHES_FAILED,
        payload : errmess
    }
);

export const addDishes = (dishes) => (
    {
        type : ActionTypes.ADD_DISHES,
        payload : dishes
    }
);

export const commentsFailed = (errmess) => (
    {
        type : ActionTypes.COMMENTS_FAILED,
        payload : errmess
    }
);

export const addComments = (comments) => (
    {
        type : ActionTypes.ADD_COMMENTS,
        payload : comments
    }
);

export const fetchComments = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseURL + 'comments')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch((error) => dispatch(dishesFailed(error.message)));
};


export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading(true));

    return fetch(baseURL + 'promotions')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => (
    {
        type : ActionTypes.PROMOS_LOADING
    }
);


export const promosFailed = (errmess) => (
    {
        type : ActionTypes.PROMOS_FAILED,
        payload : errmess
    }
);

export const addPromos = (promos) => (
    {
        type : ActionTypes.ADD_PROMOS,
        payload : promos
    }
);

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading(true));

    return fetch(baseURL + 'leaders')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => (
    {
        type : ActionTypes.LEADERS_LOADING
    }
);


export const leadersFailed = (errmess) => (
    {
        type : ActionTypes.LEADERS_FAILED,
        payload : errmess
    }
);

export const addLeaders = (leaders) => (
    {
        type : ActionTypes.ADD_LEADERS,
        payload : leaders
    }
);

export const postFeedback = (id, firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) =>{
    const newFeedback = {
        id : id,
        firstname : firstname,
        lastname : lastname,
        telnum : telnum,
        email : email,
        agree : agree,
        contactType : contactType,
        message : message
    }

    newFeedback.date = new Date().toISOString();

    return fetch(baseURL + 'feedback', {
        method : 'POST',
        body : JSON.stringify(newFeedback),
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(feedback => alert("Feedback:", feedback))
    .catch((error) => { console.log('Post comments', error.message); alert('Comment could not be posted');});
};