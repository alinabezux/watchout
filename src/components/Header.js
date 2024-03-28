import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


import {mediaActions} from "../redux/slices/media.slice";
import {authService} from "../services/auth.service";
import {authActions} from "../redux/slices/auth.slice";
import logo from '../assets/shine 4.svg';
import {MediaCard} from "./Media";
import {mediaType} from "../api";

import {ModalDialog, DialogTitle, Avatar, Tooltip,} from '@mui/joy';
import {AppBar, Box, Container, InputBase, Toolbar, Button, IconButton, Modal} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {styled, alpha} from '@mui/material/styles';
import {Stack} from "@mui/system";
import Button2 from '@mui/joy/Button';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.8, 1, 0.9, 0),
        fontFamily: 'Montserrat',
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


const Header = () => {
    const dispatch = useDispatch();

    const [term, setTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [signInOpen, setSignInOpen] = useState(false);
    const [type, setType] = useState(mediaType.movie);
    const [userId, setUserId] = useState('')

    const {searchList, currentPageMedia} = useSelector((state) => state.mediaReducer);
    const {loading, request_token, access_data} = useSelector((state) => state.authReducer);


    useEffect(() => {
        if (access_data.success) {
            setUserId(authService.getAccountId());
        }
    }, [access_data.account_id]);


    useEffect(() => {
        dispatch(mediaActions.searchMedia({term: term, mediaType: type, page: currentPageMedia}));
    }, [dispatch, term, type, currentPageMedia]);

    const handleSignInModal = () => {
        setSignInOpen(true)
        dispatch(authActions.createRequestToken());
    }

    const handleSignIn = () => {
        if (!loading) {
            window.open(
                `https://www.themoviedb.org/auth/access?request_token=${request_token}`, '_self'
            );
        }
    }

    const handleSignUp = () => {
        if (!loading) {
            window.open(
                "https://www.themoviedb.org/signup", '_self'
            );
        }
    }

    useEffect(() => {
        const requestToken = authService.getRequestToken();
        dispatch(authActions.createAccessToken({request_token: requestToken}));
    }, [dispatch, request_token])

    const handleSearchChange = (event) => {
        const inputValue = event.target.value;
        setTerm(inputValue);
        setModalOpen(inputValue.length > 0);
    }

    const isModalOpen = modalOpen;
    const handleModalClose = () => {
        setTerm('')
        setModalOpen(false);
    }


    return (
        <>
            <AppBar position="fixed" elevation={0}
                    sx={{backgroundColor: "transparent", height: "10vh", zIndex: "2"}}>
                <Toolbar>
                    <Link to={"/"} onClick={handleModalClose}>
                        <IconButton>
                            <img src={logo} alt="logo" height={80} style={{marginBottom: "-15px"}}/>
                        </IconButton>
                    </Link>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <Link to={"/movie"} style={{color: "white", textDecoration: 'none'}} onClick={handleModalClose}>
                            <Button className="btn glow-on-hover">Movies</Button>
                        </Link>
                        <Link to={"/tv"} style={{color: "white", textDecoration: 'none'}} onClick={handleModalClose}>
                            <Button className="btn glow-on-hover">TV series</Button>
                        </Link>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                value={term}
                                onChange={handleSearchChange}
                            />
                        </Search>
                    </Stack>

                    <Box style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
                        {userId ?
                            <Tooltip title="Open my account" variant="solid" color="danger" size="sm" arrow
                                     placement="bottom-start">
                                <Link to={'/account'} style={{color: "grey", textDecoration: "none"}}>
                                    <Avatar color="danger"/>
                                </Link>
                            </Tooltip>
                            :
                            <Button variant="outlined" color="error" className="btn sign"
                                    onClick={handleSignInModal}>Sign in</Button>
                        }
                    </Box>

                </Toolbar>
            </AppBar>

            {/*signIn*/}
            <Modal open={signInOpen} onClose={() => setSignInOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Have account?</DialogTitle>
                    {loading ? <Button2 loading variant="solid">Solid</Button2> :
                        <Button variant="contained" color="error"
                                onClick={handleSignIn}>Sign in</Button>}
                    <DialogTitle>Don't have account?</DialogTitle>
                    <Button variant="contained" color="error"
                            onClick={handleSignUp}>Sign up</Button>
                </ModalDialog>
            </Modal>
            {/*search*/}
            <Modal open={isModalOpen} onClose={handleModalClose} disableEnforceFocus sx={{zIndex: 1, mt: "30px"}}>
                <ModalDialog
                    sx={{
                        border: "none",
                        width: "70%",
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': {
                            width: 0,
                        },
                        py: "20px",
                        backgroundColor: "rgba(0,0,0,0.1)",
                        backdropFilter: "blur(5px)",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)",
                        WebkitBoxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)",
                        MozBoxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)",
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <h2 style={{fontFamily: "Montserrat", color: "white", fontWeight: "700"}}>Search results</h2>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button color="error" className="btn"
                                    onClick={() => setType(mediaType.movie)}
                                    variant={type === mediaType.movie ? "contained" : "text"}
                                    sx={{
                                        p: "5px 15px",
                                        "&:hover": {
                                            color: "white",
                                            backgroundColor: "rgba(255,0,0,0.3)"
                                        }
                                    }}
                            >Movies</Button>
                            <Button color="error" className="btn"
                                    onClick={() => setType(mediaType.tv)}
                                    variant={type === mediaType.tv ? "contained" : "text"}
                                    sx={{
                                        p: "5px 15px",
                                        "&:hover": {
                                            color: "white",
                                            backgroundColor: "rgba(255,0,0,0.3)"
                                        }
                                    }}
                            >TV series</Button>
                        </Stack>

                    </Stack>
                    <Container
                        sx={{
                            px: "20px",
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(20%, 1fr))',
                            gap: '15px',
                        }}
                    >
                        {searchList.map((media) => (
                            <Link key={media.id} to={`/${type}/${media.id}`} style={{color: 'grey'}}
                                  onClick={handleModalClose}>
                                <MediaCard key={media.id} media={media} mediaType={type}/>
                            </Link>
                        ))}
                    </Container>
                </ModalDialog>
            </Modal>
        </>
    )
        ;
};

export {
    Header
};