import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { updatePost } from '../api'

const EditPost = ({ posts, token, navigate, fetchPosts }) => {
    const { postID } = useParams();
    
    const [currentPost] = posts.filter(post => post._id === postID);
    
    const { title, description, location, price, willDeliver } = currentPost;
    
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDesc] = useState(description);
    const [newLocation, setNewLocation] = useState(location);
    const [newPrice, setNewPrice] = useState(price);
    const [newWillDeliver, setNewWillDeliver] = useState(willDeliver);

    async function editPost() {
        const updatedPost = {
            token: token,
            title: newTitle,
            description: newDescription,
            location: newLocation,
            price: newPrice,
            willDeliver: newWillDeliver,
            _id: postID
        }
        await updatePost(token, updatedPost, postID);
    }
    
    
    return (
        <form onSubmit={(ev) => {
            ev.preventDefault();
            editPost();
            fetchPosts();
            updatePost();
            navigate('/posts');

        }}>
            <input
                type='text'
                placeholder={title}
                onChange={(ev) => setNewTitle(ev.target.value)}
            />

            <input
                type='text'
                placeholder={description}
                onChange={(ev) => setNewDesc(ev.target.value)}
            />

            <input
                type='text'
                placeholder={location}
                onChange={(ev) => setNewLocation(ev.target.value)}
            />

            <input
                type='text'
                placeholder={price}
                onChange={(ev) => setNewPrice(ev.target.value)}
            />

            <input
                label='Will Deliver?'
                type='checkbox'
                checked={newWillDeliver}
                onChange={(ev) => setNewWillDeliver(ev.target.checked)}
            />

            <button type='submit'>Edit Post</button>
        </form>
    )
}

export default EditPost;
