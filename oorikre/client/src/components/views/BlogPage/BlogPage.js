import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
//import { search } from '../../../../../server/routes/blog';
import Blogsearch from "../Blogsearch/Blogsearch"
import { useSelector } from "react-redux";
const { Title } = Typography
const { Meta } = Card;

function BlogPage() {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        axios.get('/api/blog/getBlogs')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.blogs)
                    setBlogs(response.data.blogs)
                } else {
                    alert('Couldnt get blog`s lists')
                }
            })
    }, [])

    const [list , setList] = useState([])
    const [sear , setSear] = useState([])
    function Change(event){

        setSear(event.target.value);
    }

    function hello(event ,user){
        event.preventDefault();
        const sea = { word : event.target.type.value}
        axios.post('/api/blog/FetchBlogs',sea)
            .then(response => {
                if (response.data.success) {
                    setList(response.data.pos)
                    console.log(response.data.pos)
                    setBlogs(response.data.pos)
                    console.log("Success")
                } else {
                    alert('Couldnt get blog`s lists')
                }
            })

    }

   

    const renderCards = blogs.map((blog, index) => {
        var a =new Date(blog.createdAt);
        var ret = a.toDateString();
        return <Col key={index} lg={8} md={12} xs={24}>
            <Card
                hoverable
                style={{ width: 370, marginTop: 16 }}
                actions={[
                    <a href={`/blog/post/delete/${blog._id}`}><Icon type="delete" key="setting" /></a>,
                    <a href={`/blog/post/edit/${blog._id}`}><Icon type="edit" key="edit" /></a>,
                    <a href={`/blog/post/${blog._id}`}> <Icon type="more" key="ellipsis" /></a>,
                ]}
            >
                <Meta
                    avatar={
                        <Avatar src={blog.writer.image} />
                    }
                    title={blog.writer.name}
                    //extra ={blog.createdAt}
                    
                    description={ret}
                />
                <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </Card>
        </Col>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Blog Lists </Title>
            <div>
            <form onSubmit={hello}>

            <div class="row g-3 align-items-center">

  <div class="col-auto">
    <input type="text" class="form-control" name="type" value={sear} onChange={Change}/>
  </div>
  <div class="col-auto">
  <button class="btn" type="submit"><i class="fa fa-search"></i></button>
  </div>
</div>
            
            </form>
            </div>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        
        </div>
    )
}

export default BlogPage
