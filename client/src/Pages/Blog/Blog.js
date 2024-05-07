import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Blog.css'; 

function Blog({ user, isLoggedIn, openLoginForm}) {
    const [listOfPosts, setListOfPosts] = useState([]);
    

    const [newPost, setNewPost] = useState({ title: '', postText: '', username: '' });
    const [showCreateForm, setShowCreateForm] = useState(false);


    
    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPosts(response.data.reverse());
        });
    }, []);

    const handlePostSubmit = async () => {
        const postWithUsername = {
            ...newPost,
            username: user ? user.Name : '' // Set username to user's name if user is logged in
        };
    
        await axios.post("http://localhost:3001/posts", postWithUsername);
        setListOfPosts([postWithUsername, ...listOfPosts]); // Prepend the new post
        setNewPost({ title: '', postText: '', username: user ? user.Name : '' });
        setShowCreateForm(false); // Hide form after submitting
    };

   

    return (
        <div className="blog-container">
            {isLoggedIn ? ( // Show "Create Blog" button and form only if user is logged in
                <div>
                    <button onClick={() => setShowCreateForm(!showCreateForm)}>Create Blog</button>
                    {showCreateForm && (
                        <div>
                            <input type="text" placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
                            <textarea placeholder="Write your post here..." value={newPost.postText} onChange={(e) => setNewPost({ ...newPost, postText: e.target.value })}></textarea>
                            <button onClick={handlePostSubmit}>Post</button>
                        </div>
                    )}
                </div>
            ) : (
                <button onClick={openLoginForm}>Login to Create Blog</button>
            )}

            {listOfPosts.map((value, key) => {
                return (
                    <div className="post" key={key}>
                        <div className="title">{value.title}</div>
                        <div className="body">{value.postText}</div>
                        <div className="footer">{value.username}</div>
                    </div>
                );
            })}
            
        </div>
    );
}

export default Blog;
