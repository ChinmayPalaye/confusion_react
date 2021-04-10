import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';
import {DISHES} from '../shared/dishes';

export const addComment = (comment)=>{
    return ({
        type: ActionTypes.ADD_COMMENT,
        payload:comment
    });
}

export const postComment = (dishId, rating, author, comment)=>(dispatch)=>{
    const newComment = {
        dishId :dishId, 
        rating :rating, 
        author :author, 
        comment:comment,
        date: new Date().toISOString()
    }

    return fetch(baseUrl+'comments',{
        method:'POST',
        body: JSON.stringify(newComment),
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'same-origin'
    }).then(res=>{
        if(res.ok){
            return res;
        }
        else{
            var error = new Error('Error '+res.status+': '+res.statusText);
            error.response=res;
            throw error;
        }
    },err=>{
        var error = new Error(err.message);
        throw error;
    })
    .then(res=>res.json())
    .then(res=>dispatch(addComment(res)))
    .catch(err=>console.log('Post comments ',err.message));

}

export const dishesLoading = ()=>({
    type:ActionTypes.DISHES_LOADING,
    payload:{}
});

export const fetchDishes = () => (dispatch)=>{
    dispatch(dishesLoading(true));
    
    return fetch(baseUrl+'dishes')
        .then(res=>{
            if(res.ok){
                return res;
            }
            else{
                var error = new Error('Error '+res.status+': '+res.statusText);
                error.response=res;
                throw error;
            }
        },err=>{
            var error = new Error(err.message);
            throw error;
        })
        .then(res=>res.json())
        .then((dishes)=>dispatch(addDishes(dishes)))
        .catch(err=>dispatch(dishesFailed(err.message)));
}
export const dishesFailed = (errMess)=>({
    type:ActionTypes.DISHES_FAILED,
    payload:errMess
});
export const addDishes = (dishes)=>({
    type:ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch)=>{
    return fetch(baseUrl+'comments')
        .then(res=>{
            if(res.ok){
                return res;
            }
            else{
                var error = new Error('Error '+res.status+': '+res.statusText);
                error.response=res;
                throw error;
            }
        },err=>{
            var error = new Error(err.message);
            throw error;
        })
        .then(res=>res.json())
        .then((comments)=>dispatch(addComments(comments)))
        .catch(err=>dispatch(commentsFailed(err.message)));
}
export const commentsFailed = (errMess)=>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errMess
});
export const addComments = (comments)=>({
    type:ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const promosLoading = ()=>({
    type:ActionTypes.PROMOS_LOADING,
    payload:{}
});

export const fetchPromos = () => (dispatch)=>{
    dispatch(promosLoading(true));
    
    return fetch(baseUrl+'promotions')
        .then(res=>{
            if(res.ok){
                return res;
            }
            else{
                var error = new Error('Error '+res.status+': '+res.statusText);
                error.response=res;
                throw error;
            }
        },err=>{
            var error = new Error(err.message);
            throw error;
        })
        .then(res=>res.json())
        .then((promos)=>dispatch(addPromos(promos)))
        .catch(err=>dispatch(promosFailed(err.message)));
}
export const promosFailed = (errMess)=>({
    type:ActionTypes.PROMOS_FAILED,
    payload:errMess
});
export const addPromos = (promos)=>({
    type:ActionTypes.ADD_PROMOS,
    payload: promos
});
