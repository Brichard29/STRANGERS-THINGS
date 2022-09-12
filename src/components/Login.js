import React, { useState } from 'react';
import { userLogin } from '../api';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Login = ({ setToken, navigate }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const results = await userLogin(username, password);
        if (results.success) {
            setToken(results.data.token);
            window.localStorage.setItem('token', results.data.token);
            navigate('/profile');
        } else {
            console.log(results.error.message)
        }
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
        }}>
            <h1>Login</h1>
            <TextField variant="outlined"
                type='text'
                placeholder='Enter Username'
                onChange={(event) => setUsername(event.target.value)}
            />
            <TextField variant="outlined"
                type='text'
                placeholder='Enter Password'
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button type='submit'>Login</Button>
        </form>
    )
}

export default Login;


