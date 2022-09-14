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
                                <div className='postBtnCont'>
                                <button className='postBtn'>
                                    <Link className='postBtn' to={`/posts/${_id}`}>View</Link>
                                </button>
                                <button className='postBtn'>
                                    <Link to={`/posts/edit-post/${_id}`}>Edit</Link>
                                </button>
                                <button className='postBtn' onClick={(e)=>deletePost(e,{_id})}>Delete</button>
                                </div>
                                </>
                            ) : (
                                <>
                                <div className='postBtnCont'>
                                <button className='postBtn'>
                                    <Link to={`/posts/${_id}`}>View</Link>
                                </button>
                                </div>
                                </>
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