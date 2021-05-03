import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
//import { search } from '../../../../../server/routes/blog';

const { Title } = Typography
const { Meta } = Card;

function Blogsearch() {
    const [list , setList] = useState([])
    const [sear , setSear] = useState([])
    function Change(event){

        setSear(event.target.value);
    }

    function hello(event){
        event.preventDefault();
        const sea = { word : event.target.type.value}
        axios.post('/api/blog/FetchBlogs',sea)
            .then(response => {
                if (response.data.success) {
                    setList(response.data.pos)
                    console.log("Success")
                } else {
                    alert('Couldnt get blog`s lists')
                }
            })

    }



    const renderCards = list.map((blog, index) => {
        return <Col key={index} lg={8} md={12} xs={24}>
            <Card
                hoverable
                style={{ width: 370, marginTop: 16 }}
                actions={[
                    <Icon type="setting" key="setting" />,
                    <Icon type="edit" key="edit" />,
                    <a href={`/blog/post/${blog._id}`}> <Icon type="ellipsis" key="ellipsis" /></a>,
                ]}
            >
                <Meta
                    avatar={
                        <Avatar src={blog.writer.image} />
                    }
                    title={blog.writer.name}
                    description="This is the description"
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
            <input type="text" name="type" value={sear} onChange={Change}></input>
            <button type="submit" >Click me!</button>
            </form>
            </div>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default Blogsearch;
