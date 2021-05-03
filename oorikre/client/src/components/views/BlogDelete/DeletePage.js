import React, { useEffect, useState } from 'react'
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";
import { JsonWebTokenError } from 'jsonwebtoken';
import { json } from 'body-parser';
import { object } from 'yup';
const { Meta } = Card;

function del(props,usr){
    const postId = props.match.params.postId;
    const variable = { postId: postId , user: usr}
    
    axios.post('/api/blog/deletePost', variable)
        .then(response => {
            if (response.data.success) {
                window.location = "/blog"
                console.log("done");
            } else {
                
                alert('Not an authentic user')
                window.location = "/blog"
            }
})
}

function DeletePage(props) {
    const user = useSelector(state => state.user);
    if(user === {}){
        var temp = 1;
    }
    else if (Object.keys(user).length  === 1){
        console.log(user.userData.isAuth)
        const a = user.userData.isAuth;
        if(a !== false){
            del(props,user.userData._id);
        }
        else{
            alert("Please login to perform actions");
            window.location ="/login"; 
            console.log("wonnt happen");       
        }
    }
    /*
    var user = useSelector(state => state.user);

        console.log(user)
    if(user === {}){
            var temp = 1;
            console.log(user);
     }
    
    else if (Object.keys(user).length  === 1){
        console.log(user);
        if(user.userData.isAuth === true){
                console.log(user.userData.isAuth)
                const postId = props.match.params.postId;
                const variable = { postId: postId ,user: user}
    
                axios.post('/api/blog/deletePost', variable)
                    .then(response => {
                        if (response.data.success) {
                            window.location = "/blog"
                        } else {
                            alert('That Blog wasnt in database')
                        }
            })
        }
        else{
            console.log("Please login")
            return (<div>nothing</div>)
        }
    }
    */
return (<div></div>)
}

export default DeletePage
