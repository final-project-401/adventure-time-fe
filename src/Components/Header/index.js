import React, { useState } from 'react';
import { Button, Drawer, IconButton, Link, List, ListItemButton, Toolbar, Typography } from '@mui/material';
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
                <Typography variant="h3" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontSize: '30px' }}>
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
                <List sx={{ width: 200 }}>
                <ListItemButton onClick={handleClose}>
                    <Link href="/">
                        <Button className="nav-button" color="inherit" sx={{ fontSize: '18px' }}>Home</Button>
                    </Link>
                    </ListItemButton>

                    <ListItemButton onClick={handleClose}>
                    <Link href="/about">
                        <Button className="nav-button" color="inherit" sx={{ fontSize: '18px' }}>About Us </Button>
                    </Link>
                    </ListItemButton>

                    <ListItemButton onClick={handleClose}>
                    <Link href="/sales-info">
                        <Button className="nav-button" color="inherit" sx={{ fontSize: '18px' }}>Events </Button>
                    </Link>
                    </ListItemButton>

                    <ListItemButton onClick={handleClose}>
                    <Link href="/contact">
                        <Button className="nav-button" color="inherit" sx={{ fontSize: '18px' }}>Contact us </Button>
                    </Link>
                    </ListItemButton>

                    <ListItemButton onClick={handleClose}>
                    <Link href="/place-order">
                        <Button className="nav-button" color="inherit" sx={{ fontSize: '18px' }}>Weather </Button>
                    </Link>
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
};

export default Header;