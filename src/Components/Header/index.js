import React, { useState } from 'react';
import { Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


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
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <Link href="/" className='menuIcon'>
                        <MenuIcon />
                    </Link>
                </IconButton>

                <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                    Adventure Time
                </Typography>

                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleOpen} >

                </IconButton>
                <Link href="/">
                    <Button className="nav-button" color="inherit" onClick={handleOpen}>Home</Button>
                </Link>


                <Link href="/sales-info">
                    <Button className="nav-button" color="inherit" onClick={handleOpen}>Events </Button>

                </Link>

                {/* <Link href="/contact">
                    <Button className="nav-button" color="inherit" onClick={handleOpen}>Contact us </Button>
                </Link> */}

                <Link href="/place-order">
                    <Button className="nav-button" color="inherit" onClick={handleOpen}>Weather </Button>
                </Link>

                <Link href="/about">
                    <Button className="nav-button" color="inherit" onClick={handleOpen}>About Us </Button>
                </Link>
            </Toolbar>
        </>
    )
}

export default Header