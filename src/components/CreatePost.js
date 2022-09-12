import React, { useState } from 'react';
import { createPost as addPost } from '../api';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

const CreatePost = ({ token, fetchPosts, navigate }) => {


    const [initTitle, setTitle] = useState("");
    const [initDescription, setDescription] = useState("");
    const [initPrice, setPrice] = useState("");
    const [initLocation, setLocation] = useState("");
    const [initWillDeliver, setWillDeliver] = useState(true);

    async function handleSubmit() {
        
        const newPost = {
            title: initTitle,
            description: initDescription,
            price: initPrice,
            location: initLocation,
            willDeliver: initWillDeliver
        }

        const results = await addPost(token, newPost);
        console.log({newPost}, {results});
        fetchPosts();
        navigate('/posts')
    }

    return (
        //form for creating a new post
        <>
        <form onSubmit={(ev) => {
            ev.preventDefault();
            handleSubmit();
        }}>
            <h1>Create a New Post</h1>

            <TextField className='newPostForm' variant="outlined"
                type='text'
                placeholder='Title'
                onChange={(ev) => setTitle(ev.target.value)}
            />

            <TextField className='newPostForm' variant="outlined"
                type='text'
                placeholder='Description'
                onChange={(ev) => setDescription(ev.target.value)}
            />

            <TextField className='newPostForm' variant="outlined"
                type='text'
                placeholder='Price'
                onChange={(ev) => setPrice(ev.target.value)}
            />

            <TextField className='newPostForm' variant="outlined"
                type='text'
                placeholder='Location'
                onChange={(ev) => setLocation(ev.target.value)}
            />
            <p>Will Deliver?</p>

            <Checkbox className='newPostForm' variant="outlined"
                label='Will Deliver?'
                type='checkbox'
                checked={initWillDeliver}
                onChange={(ev) => setWillDeliver(ev.target.checked)}
            />

         <Button type="submit">Create New Post</Button>
        </form>
        </>
    )
}

export default CreatePost;