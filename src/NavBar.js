import React, { useState } from 'react';
import './NavBar.css';
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { auth } from './firebase';
import { useUserAuth } from "./UserAuthContext";


const NavBar = () => {
    let navigate = useNavigate();
    const [navbar, setNavbar] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 100) {
            setNavbar(true)
        } else {
            setNavbar(false);
        }
    }

	const { logOut } = useUserAuth();
	const handleLogout = async () => {
		try {
		await logOut();
		navigate("/");
		} catch (error) {
		console.log(error.message);
		}
	};

    window.addEventListener('scroll', changeBackground);
    return (
        <div className={navbar ? 'nav active' : 'nav'}>
            <div className='topBar'>
                <div className='title'>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        JUICYLA
                    </Link>
                </div>
                <div className='ButtonGroup'>
                    <Button className='register' variant="contained"
                        onClick={
                            () => { navigate('/Signup') }
                        }
                        sx={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
                            fontWeight: 'bold',
                            fontSize: 15,
                            width: 120,

                            color: '#F2F2F0',
                            backgroundColor: "#EA4033",
                            '&:hover': {
                                backgroundColor: '#EA4033',
                            }
                        }}

                    >
                        register
                    </Button>
					{ console.log(auth.currentUser) }
					{ auth.currentUser ? console.log("logged in") : console.log("logged out")}
					{ auth.currentUser ?
					<Button
                        onClick={handleLogout}

                        sx={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
                            fontWeight: 'bold',
                            fontSize: 15,
                            width: 120,
                            color: '#F2F2F0',
                        }}
                    >
                        sign out
                    </Button>
					:
                    <Button
                        onClick={
                            () => { navigate('/Login') }
                        }
                        sx={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
                            fontWeight: 'bold',
                            fontSize: 15,
                            width: 120,
                            color: '#F2F2F0',
                        }}
                    >
                        sign in
                    </Button>
					}
                </div>


            </div>
        </div>




    )
}

export default NavBar;