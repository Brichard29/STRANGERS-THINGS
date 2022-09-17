import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createMessage } from '../api';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const SendMessage = ({ postID, token, navigate }) => {
    const [message, setMessage] = useState({content: ''});

    async function addMessage() {
        await createMessage({postID, message, token})
    }

    return (
        <form onSubmit={(ev) => {
            ev.preventDefault();
            addMessage();
            navigate('/profile');


        }}>
            <TextField variant="outlined"
                type='text'
                placeholder='Enter Message'
                onChange={(ev) => setMessage({content: ev.target.value})}
            />
            <Button type='submit'>Send Message</Button>
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


    if (token) {
    return (
        <div>
            <div>
                <h3>{title}</h3>
                <p>Description:{description}</p>
                <p>Price: {price}</p>
                <p>Location: {location}</p>
                <p>Will Deliver: {willDeliver}</p>
            </div>
            <Button onClick={() => setActivateMessage(!activateMessage)}>Send a Message</Button>
            {
                activateMessage && <SendMessage postID={ postID } token={ token } />
            }
        </div>
    )
        } else {
            return(
                <div>
                <div>
                    <h3>{title}</h3>
                    <p>Description:{description}</p>
                    <p>Price: {price}</p>
                    <p>Location: {location}</p>
                    <p>Will Deliver: {willDeliver}</p>
                </div>
            </div>
            )
        }
}

export default SinglePostView;