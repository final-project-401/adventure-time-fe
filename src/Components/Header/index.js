import React, { useState } from 'react';
import { Button, Drawer, IconButton, Link, Toolbar, Typography } from '@mui/material';
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
                <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                    Your Adventure Starts Here!
                </Typography>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, mt: 2 }}
                    onClick={handleOpen}
                >
                    <MenuIcon sx={{ fontSize: 35 }} />
                </IconButton>
            </Toolbar>

            <Drawer anchor="right" open={open} onClose={handleClose}>
                <div
                    role="presentation"
                    onClick={handleClose}
                    onKeyDown={handleClose}
                >
                    <Link href="/">
                        <Button className="nav-button" color="inherit" onClick={handleOpen}>Home</Button>
                    </Link>

                    <Link href="/about">
                        <Button className="nav-button" color="inherit" onClick={handleOpen}>About Us </Button>
                    </Link>

                    <Link href="/sales-info">
                        <Button className="nav-button" color="inherit" onClick={handleOpen}>Events </Button>

                    </Link>

                    <Link href="/contact">
                        <Button className="nav-button" color="inherit" onClick={handleOpen}>Contact us </Button>
                    </Link>

                    <Link href="/place-order">
                        <Button className="nav-button" color="inherit" onClick={handleOpen}>Weather </Button>
                    </Link>
                </div>
            </Drawer>
        </>
    );
};

export default Header;