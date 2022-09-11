import React, { useState } from 'react';
import { createPost as addPost } from '../api';

const CreatePost = ({ token, fetchPosts, navigate }) => {

   // const { title, description, location, price, willDeliver } = newPost;

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
            <input
                type='text'
                placeholder='Title'
                onChange={(ev) => setTitle(ev.target.value)}
            />

            <input
                type='text'
                placeholder='Description'
                onChange={(ev) => setDescription(ev.target.value)}
            />

            <input
                type='text'
                placeholder='Price'
                onChange={(ev) => setPrice(ev.target.value)}
            />

            <input
                type='text'
                placeholder='Location'
                onChange={(ev) => setLocation(ev.target.value)}
            />

            <input
                label='Will Deliver?'
                type='checkbox'
                checked={initWillDeliver}
                onChange={(ev) => setWillDeliver(ev.target.checked)}
            />

         <button type="submit">Create New Post</button>
        </form>
        </>
    )
}

export default CreatePost;