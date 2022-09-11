import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createMessage } from '../api';

const SendMessage = ({ postID, token }) => {
    const [message, setMessage] = useState({content: ''});

    async function addMessage() {
        await createMessage({postID, message, token})
    }

    return (
        <form onSubmit={(ev) => {
            ev.preventDefault();
            addMessage();

        }}>
            <input
                type='text'
                placeholder='Enter Message'
                onChange={(ev) => setMessage({content: ev.target.value})}
            />
            <button type='submit'>Send Message</button>
        </form>
    )
}

const SinglePostView = ({ posts, token }) => {
    const [activateMessage, setActivateMessage] = useState(false);
    const { postID } = useParams();
    console.log(posts)
    const [currentPost] = posts.filter(post => post._id === postID);
    console.log(currentPost)
    const { title, description, location, price, willDeliver } = currentPost;

    return (
        <div>
            <div>
                <h3>{title}</h3>
                <p>Description:{description}</p>
                <p>Price: {price}</p>
                <p>Location: {location}</p>
                <p>Will Deliver: {willDeliver}</p>
            </div>
            <button onClick={() => setActivateMessage(!activateMessage)}>Send a Message</button>
            {
                activateMessage && <SendMessage postID={ postID } token={ token } />
            }
        </div>
    )
}

export default SinglePostView;