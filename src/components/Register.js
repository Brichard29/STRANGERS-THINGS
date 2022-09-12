import React, { useState } from 'react';
import { registerUser } from '../api';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const Register = ({ setToken, navigate }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const results = await registerUser(username, password);
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
            <h1>Sign up</h1>

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
            <Button type='submit'>Submit</Button>
        </form>
    )
}

export default Register;