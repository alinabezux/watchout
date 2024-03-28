import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import bg from '../assets/footer-bg.jpg'
import {authService} from "../services/auth.service";
import {userActions} from "../redux/slices/user.slice";
import {authActions} from "../redux/slices/auth.slice";
import {mediaType} from "../api";
import {MediaCard} from "./Media";

import {Box, Stack} from "@mui/system";
import {Button, Container, Grid} from "@mui/material";
import {Avatar, List, ListDivider, ListItem, ListItemButton, ListItemDecorator} from "@mui/joy";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded"

const Account = () => {
    const dispatch = useDispatch();

    const [userId, setUserId] = useState('')
    const [type, setType] = useState(mediaType.movie);
    const [listOf, setListOf] = useState('favorites');

    const {username, favorites, watchlist, rated} = useSelector(state => state.userReducer);

    useEffect(() => {
        const account_id = authService.getAccountId();
        if (account_id) setUserId(account_id);
    }, []);


    useEffect(() => {
        dispatch(userActions.getAccount({account_id: userId}))
    }, [dispatch, userId]);

    useEffect(() => {
        if (listOf === 'favorites') {
            dispatch(userActions.getUserFavorites({account_object_id: userId, mediaType: type}))
        } else if (listOf === 'watchlist') {
            dispatch(userActions.getUserWatchlist({account_object_id: userId, mediaType: type}))
        } else if (listOf === 'rated') {
            dispatch(userActions.getRated({account_object_id: userId, mediaType: type}))
        }

    }, [dispatch, userId, type, listOf]);

    const handleLogOut = () => {
        const accessToken = authService.getAccessToken();
        dispatch(authActions.logOut({access_token: accessToken}));
        setUserId(null)
        authService.deleteInfo()
        window.open(
            "https://watchoutt.netlify.app/", '_self'
        );
    }


    return (
        <Box>
            <img
                src={bg}
                alt='bg'
                style={{
                    top: "0px",
                    width: "100vw",
                    opacity: "0.7",
                    position: "absolute",
                }}
            />

            <Container sx={{mt: "150px", position: "relative", color: "white"}}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box sx={{
                            backgroundColor: "rgba(33,32,32,0.1)",
                            backdropFilter: "blur(5px)",
                            borderRadius: "10px",
                            padding: "15px",
                            textAlign: "center",
                            fontSize: "16px",
                            boxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)",
                            WebkitBoxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)",
                            MozBoxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)"
                        }}>
                            <Stack spacing={2}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}>
                                    <Avatar size="lg"
                                            sx={{
                                                height: "200px",
                                                width: "200px",
                                                margin: "20px"
                                            }}
                                            color="danger"
                                            variant="soft"/>
                                    <h5 style={{fontFamily: "Montserrat", fontWeight: "600"}}>{username}</h5>
                                </Box>
                                <List sx={{color: "white", fontFamily: "Montserrat", fontWeight: "500"}}>
                                    <ListDivider/>
                                    <ListItem>
                                        <ListItemButton onClick={() => setListOf('watchlist')}>
                                            <ListItemDecorator>
                                                <LocalMoviesRoundedIcon/>
                                            </ListItemDecorator>
                                            Watchlist
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem>
                                        <ListItemButton onClick={() => setListOf('favorites')}>
                                            <ListItemDecorator>
                                                <FavoriteBorderRoundedIcon/>
                                            </ListItemDecorator>
                                            Favourites
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem>
                                        <ListItemButton onClick={() => setListOf('rated')}>
                                            <ListItemDecorator>
                                                <StarOutlineRoundedIcon/>
                                            </ListItemDecorator>
                                            Rated
                                        </ListItemButton>
                                    </ListItem>

                                    <ListDivider/>

                                    <ListItem>
                                        <ListItemButton
                                            color="danger"
                                            onClick={handleLogOut}
                                        >
                                            <ListItemDecorator>
                                                <LogoutRoundedIcon/>
                                            </ListItemDecorator>
                                            Log out
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={9}>
                        <Box sx={{
                            backgroundColor: "rgb(33,32,32,0.1)",
                            backdropFilter: "blur(5px)",
                            borderRadius: "10px",
                            padding: "15px",
                            textAlign: "center",
                            color: "white",
                            fontSize: "16px",
                            boxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)",
                            WebkitBoxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)",
                            MozBoxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)"
                        }}>
                            <Stack direction="column" spacing={3}>
                                <h3 style={{fontFamily: 'Montserrat', fontWeight: "600"}}>{listOf.toUpperCase()}</h3>
                                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
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
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fill, minmax(30%, 1fr))",
                                        gap: "15px",
                                        my: "15px",
                                    }}
                                >
                                    {
                                        listOf === 'favorites' && favorites.results && favorites.results.map((media) => (
                                            <Link key={media.id} to={`/${type}/${media.id}`} style={{color: "grey"}}>
                                                <MediaCard media={media} mediaType={type}/>
                                            </Link>
                                        ))
                                    }
                                    {
                                        listOf === 'watchlist' && watchlist.results && watchlist.results.map((media) => (
                                            <Link key={media.id} to={`/${type}/${media.id}`} style={{color: "grey"}}>
                                                <MediaCard media={media} mediaType={type}/>
                                            </Link>
                                        ))
                                    }
                                    {
                                        listOf === 'rated' && rated.results && rated.results.map((media) => (
                                            <Link key={media.id} to={`/${type}/${media.id}`} style={{color: "grey"}}>
                                                <MediaCard media={media} mediaType={type}/>
                                            </Link>
                                        ))
                                    }
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}


export {
    Account
};