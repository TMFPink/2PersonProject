import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Blog.css'; 

function Blog() {
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
        setListOfPosts(response.data);
    });
    }, []);
    return (
    <div className="blog-container">
        {listOfPosts.map((value, key) => {
        return (
            <div className="post">
            <div className="title"> {value.title} </div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
            </div>
        );
        })}
    </div>
    );
}
export default Blog;