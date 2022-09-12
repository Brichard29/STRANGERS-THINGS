import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Posts = ({ posts,handleDeleteFunction }) => {

console.log('handleDeleteFunction',handleDeleteFunction);
    const deletePost = (e,postID) =>{
        console.log('postID',postID);
        handleDeleteFunction(postID);

    }


    return (
        <>
        <Button>
            <Link className='createBtn' to='/posts/create-post'>Create New Post</Link>
        </Button>

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
                                <Button>
                                    <Link className='viewBtn' to={`/posts/${_id}`}>View</Link>
                                </Button>
                                <Button>
                                    <Link to={`/posts/edit-post/${_id}`}>Edit</Link>
                                </Button>
                                <Button onClick={(e)=>deletePost(e,{_id})}>Delete</Button>
                                </>
                            ) : (
                                <Button>
                                    <Link className='viewBtn' to={`/posts/${_id}`}>View</Link>
                                </Button>
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