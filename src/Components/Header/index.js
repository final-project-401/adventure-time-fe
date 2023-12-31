import React, { useState } from 'react';
import { Button, IconButton, Link, List, ListItemButton, Toolbar, Drawer, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './styling.css';
import LoginButton from '../Auth/loginButton';
import LogoutButton from '../Auth/logoutButton';
import Profile from '../Auth/Profile';


const Header = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <>

            <Toolbar className='header-toolbar'>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, mt: 2 }}
                    onClick={handleOpen}>
                    <MenuIcon sx={{ fontSize: 35 }} />
                </IconButton>
                <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                    <span className="headerTitle">Adventure Time</span>
                </Typography>



            </Toolbar>

            <Drawer anchor="left" open={open} onClose={handleClose}>
                <div
                    role="presentation"
                    onClick={handleClose}
                    onKeyDown={handleClose}
                >
                    <div style={{ padding: '10px' }}>
                        <LoginButton />
                        <Profile />
                        <LogoutButton />
                    </div>
                    <List sx={{ width: 200 }}>
                        <ListItemButton onClick={handleClose}>
                            <Link href="/">
                                <Button className="nav-button" color="inherit" sx={{ fontSize: '18px', color: 'black' }}>Home</Button>
                            </Link>
                        </ListItemButton>

                        <ListItemButton onClick={handleClose}>
                            <Link href="/events">
                                <Button className="nav-button" color="inherit" sx={{ fontSize: '18px', color: 'black' }}>Events </Button>
                            </Link>
                        </ListItemButton>

                        <ListItemButton onClick={handleClose}>
                            <Link href="/about">
                                <Button className="nav-button" color="inherit" sx={{ fontSize: '18px', color: 'black' }}>About Us </Button>
                            </Link>
                        </ListItemButton>

                    </List>
                </div>
            </Drawer>
        </>
    )
}

export default Header