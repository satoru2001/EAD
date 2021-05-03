import React, { useEffect, useState } from 'react'

import QuillEditor from '../../../editor/QuillEditor';
import { Typography, Button, Form, message } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';
const { Title } = Typography;
function callpost(post,usr){
    
    if(post === ""){
        var temp_1 = 1;
        //console.log("got empty")
    }
    else{
        //console.log(post.writer._id)
        var pt_usr = post.writer._id;
        if(usr === pt_usr){
            console.log("match")
        }
        else{
            console.log("mis-match")
            alert('Not an authentic user')
            window.location = "/blog";
        }
    }
}
function EditPage(props) {
    const [post, setPost] = useState("")
    const postId = props.match.params.postId;
    const [content, setContent] = useState("")
    const [files, setFiles] = useState([])
    const user = useSelector(state => state.user);
    if(user === {}){
        var temp = 1;
    }
    else if (Object.keys(user).length  === 1){
        //console.log(user.userData._id)
        var usr = user.userData._id;
        //console.log(Object.keys(user).length)
        callpost(post,usr);
    }
    //console.log(post)
    
    const onEditorChange = (value) => {
        setContent(value)
        //console.log(content)
    }
    
    const onFilesChange = (files) => {
        setFiles(files)
    }

    useEffect(() => {

        const variable = { postId: postId }

        axios.post('/api/blog/getPost', variable)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.post)
                    setPost(response.data.post)
                    //console.log(response.data.post.content)
                    onEditorChange(response.data.post.content)
                    
                } else {
                    alert('Couldnt get post')
                }
            })
    }, [])
    //console.log(content)

    //console.log(user)
    const onSubmit = (event) => {
        event.preventDefault();

        setContent("");

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        const variables = {
            content: content,
            userID: user.userData._id,
            id : postId
        }

        
        axios.post('/api/blog/EditPost', variables)
            .then(response => {
                if (response) {
                    message.success('Post Created!');

                    setTimeout(() => {
                        props.history.push('/blog')
                    }, 2000);
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2} > Editor</Title>
            </div>
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
                value="doom"
            />

            <Form onSubmit={onSubmit}>
                <div style={{ textAlign: 'center', margin: '2rem', }}>
                    <Button
                        size="large"
                        htmlType="submit"
                        className=""
                        onSubmit={onSubmit}
                    >
                        Submit
                </Button>
                </div>
            </Form>
        </div>
    )
}

export default EditPage
