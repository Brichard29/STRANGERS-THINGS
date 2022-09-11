import React from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ posts,handleDeleteFunction }) => {

console.log('handleDeleteFunction',handleDeleteFunction);
    const deletePost = (e,postID) =>{
        console.log('postID',postID);
        handleDeleteFunction(postID);

    }


    return (
        <>
        <button>
            <Link className='createBtn' to='/posts/create-post'>Create New Post</Link>
        </button>

        <div id='outer-div-element'>
        {
            posts.map((post) => {
                const {description, location, price, title, _id, isAuthor, willDeliver } = post;
                return (
                    <div className='postDiv' key={_id}>
                        <h3>{title}</h3>
                        <p>Description:{description}</p>
                        <p>Price: {price}</p>
                        <p>Location: {location}</p>
                        <p>WillDeliver: {"" +willDeliver}</p>
                        {
                            isAuthor ? (
                                <>
                                <Link className='viewBtn' to={`/posts/${_id}`}>View</Link>
                                <Link to={`/posts/edit-post/${_id}`}>Edit</Link>
                                <button onClick={(e)=>deletePost(e,{_id})}>Delete</button>
                                </>
                            ) : (
                                <Link className='viewBtn' to={`/posts/${_id}`}>View</Link>
                            )
                        }
                    </div>
                )
            })
        }
        </div>
        </>
    )
}

export default Posts;