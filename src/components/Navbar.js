import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
    return (
        <header>


            <nav>
                <Link className='navBtn' to='/'>Home</Link>
                <Link className='navBtn' to='/posts'>Posts</Link>

                {
                    token ? (
                        <>
                        <Link className='navBtn' to='/profile'>Profile</Link>
                        <Link className='navBtn' to='/' onClick={() => logout()}>Logout</Link>
                        </>

                    ) : (
                      <>
                        <Link className='navBtn' to='/register'>Register</Link>
                        <Link className='navBtn' to='/login'>Login</Link>
                      </>

                    )
                }
                

            </nav>
        </header>
    )
}

export default Navbar;