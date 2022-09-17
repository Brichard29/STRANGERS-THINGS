import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './style.css';
import {
    Navbar,
    Posts,
    Profile,
    Home,
    Register,
    Login,
    CreatePost,
    SinglePostView,
    EditPost,
    DeletePost
} from './components';
import {
    getPosts,
    getUserDetails,
    deletePost    
} from './api';




const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});


    const navigate = useNavigate();

    console.log(token)

    function logout() {
        window.localStorage.removeItem('token');
        setToken('');
        setUser({});
    }


    async function fetchPosts() {
        const results = await getPosts(token)
        setPosts(results.data.posts);
    }

    async function getMe() {
        const storedToken = window.localStorage.getItem('token');

        if (!token) {
            if (storedToken) {
               setToken(storedToken);
            }
            return;
        }

        const results = await getUserDetails(token)
        if (results.success) {
            setUser(results.data);
        } else {
            console.log(results.error.message);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [token])

    useEffect(() => {
        getMe();
    }, [token])

    const handleDeleteFunction = async (postId) => {
        console.log('postId',postId);

        if(token){
            const deleteUser = await deletePost(postId._id,token);
            console.log('deleteUser', deleteUser);
            fetchPosts();

        }


    }
    return (
        <div>
            <Navbar logout={ logout } token={ token } />
            <Routes>
                <Route 
                    path='/' 
                    element={<Home 
                    /> } 
                />
                <Route 
                    path='/posts' 
                    element={<Posts 
                    posts={posts} 
                    handleDeleteFunction={handleDeleteFunction}
                    />} 
                />
                <Route
                    path='/posts/:postID'
                    element={<SinglePostView 
                    posts={ posts } 
                    token={ token }
                    navigate={ navigate }
                    /> }
                />
                <Route 
                    path='/profile' 
                    element={<Profile user={ user}
                    navigate={ navigate } 
                    />} 
                />
                <Route
                    exact path='/posts/create-post'
                    element={<CreatePost 
                        token={ token } 
                        fetchPosts={ fetchPosts } 
                        navigate={ navigate } 
                        /> }
                />
                <Route 
                    exact path='/posts/edit-post/:postID'
                    element={<EditPost 
                    posts={ posts }
                    token={ token }
                    fetchPosts={ fetchPosts }
                    navigate={ navigate }
                    /> } 
                />
                <Route
                    path='/register'
                    element={<Register
                    setToken={setToken}
                    token={token}
                    navigate={navigate} />}
                     />
                <Route
                    path='/login'
                    element={<Login
                        setToken={ setToken }
                        navigate={ navigate }/>}
                />
            </Routes>
        </div>
    )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
    <CssBaseline>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CssBaseline>
);


/*
Components:
Login
Registration
Posts
Profile
Navbar
AddPost
*/