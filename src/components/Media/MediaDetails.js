import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {format, parseISO} from 'date-fns';
import {Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import {mediaActions} from "../../redux/slices/media.slice";
import {authService} from "../../services/auth.service";
import {userActions} from "../../redux/slices/user.slice";
import {originalImage, w500Image, youtubePath} from "../../api";
import CircularRate from "../CircularRating";
import {MediaCard} from "./MediaCard";
import imdb from '../../assets/IMDB_Logo_2016.svg.png';
import empty from '../../assets/stub-empty.svg';

import {Box, Stack} from "@mui/system";
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Grid,
    Button, IconButton, Rating
} from "@mui/material";
import 'swiper/css/navigation';
import 'swiper/css';
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import {Chip, Snackbar} from "@mui/joy";
import {yellow} from '@mui/material/colors';


const MediaDetails = ({mediaType, mediaId}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [option, setOption] = useState(null);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchlist, setIsWatchlist] = useState(false);
    const [isRated, setIsRated] = useState(false);

    const {media, videos, credits, reviews, similar, error} = useSelector(state => state.mediaReducer);
    const {favorites, watchlist, rated} = useSelector(state => state.userReducer);
    const userId = authService.getAccountId();
    const TV = location.pathname.includes('/tv');

    useEffect(() => {
        dispatch(mediaActions.getOneMedia({mediaType, mediaId}));
        dispatch(mediaActions.getMediaVideos({mediaType, mediaId}));
        dispatch(mediaActions.getMediaCredits({mediaType, mediaId}));
        dispatch(mediaActions.getMediaReviews({mediaType, mediaId}));
        dispatch(mediaActions.getSimilarMedia({mediaType, mediaId}));

    }, [dispatch, mediaType, mediaId]);


    useEffect(() => {
        if (userId) {
            dispatch(userActions.getUserFavorites({
                account_object_id: userId,
                mediaType: mediaType,
            }));
            dispatch(userActions.getUserWatchlist({
                account_object_id: userId,
                mediaType: mediaType,
            }));
            dispatch(userActions.getRated({
                account_object_id: userId,
                mediaType: mediaType
            }))
        }
    }, [dispatch, userId, mediaType]);


    useEffect(() => {
        setIsFavorite(favorites && favorites.results && favorites.results.some(item => item.id.toString() === mediaId));
        setIsWatchlist(watchlist && watchlist.results && watchlist.results.some(item => item.id.toString() === mediaId));
        setIsRated(rated && rated.results && rated.results.some(item => item.id.toString() === mediaId));

    }, [favorites, watchlist, rated.results, mediaId]);


    const handleAddToFavorite = useCallback(async () => {
        if (userId !== null) {
            if (isFavorite === false) {
                await dispatch(userActions.addToFavorite({
                    account_id: userId,
                    mediaType,
                    media_id: mediaId
                }));
                setOption('favorite');
                setIsFavorite(true);
            }
        }
        setSnackbarVisible(true);

    }, [userId, dispatch, mediaType, mediaId])


    const handleAddToWatchlist = useCallback(async () => {
        if (userId !== null) {
            if (isWatchlist === false) {
                await dispatch(userActions.addToWatchlist({
                    account_id: userId,
                    mediaType,
                    media_id: mediaId
                }))
                setOption('watchlist')
                setIsWatchlist(true);
            }
        }
        setSnackbarVisible(true);
    }, [userId, dispatch, mediaType, mediaId])

    const handleAddRating = useCallback(async (event, newValue) => {
        if (userId !== null) {
            setRating(newValue);
            await dispatch(userActions.addRating({
                mediaType: mediaType,
                mediaId: mediaId,
                value: newValue * 2
            }))
            setOption('rated');
            setIsRated(true);
            console.log(isRated);
        }
        setSnackbarVisible(true);
    }, [dispatch, mediaType, mediaId, userId, isRated]);

    useEffect(() => {
        if (userId !== null && isRated === true) {
            if (rated && rated.results && rated.results.length > 0) {
                const firstRatedMedia = rated.results.find(item => item.id.toString() === mediaId);
                if (firstRatedMedia && firstRatedMedia.account_rating) {
                    setRating(firstRatedMedia.account_rating.value / 2);
                }
            }
        }
    }, [rated, mediaId, userId, isRated]);

    return (
        <Box>
            <img
                src={originalImage(media.backdrop_path)}
                alt={media.name || media.title}
                style={{
                    top: "0px",
                    width: "100vw",
                    opacity: "0.3",
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
                                <img
                                    src={originalImage(media.poster_path)}
                                    alt={media.name || media.title}
                                />

                                <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
                                    <Rating
                                        size="large"
                                        icon={<StarRoundedIcon fontSize="inherit"/>}
                                        emptyIcon={<StarBorderRoundedIcon fontSize="inherit"
                                                                          sx={{color: yellow[100]}}/>}
                                        value={rating}
                                        onChange={(event, newValue) => handleAddRating(event, newValue)}
                                    />
                                    <Stack direction="row">
                                        <IconButton color="error" variant="plain" onClick={handleAddToFavorite}
                                        >
                                            {
                                                isFavorite ?
                                                    <FavoriteRoundedIcon/> : <FavoriteBorderRoundedIcon/>
                                            }
                                        </IconButton>
                                        <IconButton color="error" variant="plain" onClick={handleAddToWatchlist}>
                                            {
                                                isWatchlist ?
                                                    <BookmarkRoundedIcon sx={{color: yellow[400]}}/> :
                                                    <BookmarkBorderRoundedIcon sx={{color: yellow[400]}}/>
                                            }
                                        </IconButton>
                                    </Stack>
                                </Stack>

                                {media && media.production_countries ?
                                    (media.production_countries.slice(0, 1).map((country, index) => (
                                        <p key={index}>
                                            <b>Country : </b><br/>{country.name}</p>
                                    ))) : null
                                }

                                {media && media.production_companies ? (
                                    media.production_companies.slice(0, 1).map((company) => (
                                        <Stack
                                            direction="column"
                                            alignItems="center"
                                            spacing={2}
                                            key={company.id}
                                        >
                                            <p><b>Company : </b></p>
                                            {
                                                company && company.logo_path ? (
                                                        <img src={originalImage(company.logo_path)} alt={company.name}
                                                             width="50%"/>) :
                                                    <h5>{company.name}</h5>
                                            }

                                        </Stack>
                                    ))
                                ) : null}

                                {
                                    !TV ?
                                        <p><b>Runtime : </b><br/>{media.runtime} min</p> : null
                                }

                                {
                                    (media && media.budget ?
                                        (<p><b>Budget : </b><br/>{media.budget} $</p>) : null)
                                }
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
                            <Stack direction="column" spacing={2}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <h4 style={{fontWeight: "700"}}>
                                            {media.title || media.name}
                                        </h4>
                                        {
                                            !TV ?
                                                <h4>( {(media && media.release_date ? (media.release_date.substring(0, 4)) : "")} )</h4> :
                                                <h4>( {(media && media.first_air_date ? (media.first_air_date.substring(0, 4)) : "")} )</h4>
                                        }
                                    </Stack>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <img src={imdb} alt="imdb" height={30}/>
                                        <CircularRate value={media.vote_average}/>
                                    </Stack>
                                </Stack>

                                {
                                    TV ? (
                                        <p style={{textAlign: "start"}}>
                                            {media.number_of_seasons} {media.number_of_seasons === 1 ? 'season' : 'seasons'}
                                        </p>
                                    ) : null
                                }


                                <Stack direction="row" spacing={2} alignItems="center"
                                       justifyContent="flex-start">
                                    {media && media.genres ?
                                        (media.genres.map(genre =>
                                            <Chip
                                                size="lg"
                                                variant="solid"
                                                color="danger"
                                                key={genre.id}
                                            >{genre.name}
                                            </Chip>
                                        )) : null
                                    }
                                </Stack>

                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    grabCursor={true}
                                    navigation
                                    style={{height: "500px", width: "100%"}}
                                >
                                    {videos.slice(0, 5).map(video =>
                                        <SwiperSlide key={video.id}>
                                            <iframe
                                                key={video.key}
                                                src={youtubePath(video.key)}
                                                width="100%"
                                                height="100%"
                                                title={video.id}
                                                style={{border: 0}}
                                            ></iframe>
                                        </SwiperSlide>)}
                                </Swiper>
                                <p>{media.overview}</p>


                                <Box>
                                    {credits && credits.cast && credits.cast.length > 0 ? (
                                        <>
                                            <hr/>
                                            <h4 style={{fontWeight: "700"}}>Cast</h4>
                                            <Grid container rowSpacing={2}>
                                                {credits.cast.slice(0, 6).map(char => (
                                                    <Grid item xs={6} md={4} key={char.credit_id}>
                                                        <Card sx={{
                                                            height: "100px",
                                                            fontSize: "11px",
                                                            backgroundColor: "rgba(33,32,32,0.1)",
                                                            backdropFilter: "blur(5px)",
                                                            borderRadius: "10px",
                                                            mx: "7px",
                                                            boxShadow: "0px 0px 20px 7px rgba(0,0,0,0.4)",
                                                            WebkitBoxShadow: "0px 0px 20px 7px rgba(0,0,0,0.4)",
                                                            MozBoxShadow: "0px 0px 20px 7px rgba(0,0,0,0.4)"
                                                        }}>
                                                            <Link to={`/person/${char.id}`}
                                                                  style={{color: "white", textDecoration: "none"}}>
                                                                <CardActionArea>
                                                                    <Stack direction="row">
                                                                        <CardMedia
                                                                            component="img"
                                                                            image={char && char.profile_path ? w500Image(char.profile_path) : empty}
                                                                            alt={char.name}
                                                                            sx={{width: "25%"}}
                                                                        />
                                                                        <CardContent sx={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                            alignItems: "flex-start"
                                                                        }}>
                                                                            <p><b>{char.name}</b></p>
                                                                            <p>{char.character}</p>
                                                                        </CardContent>
                                                                    </Stack>
                                                                </CardActionArea>
                                                            </Link>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </>
                                    ) : null}
                                </Box>

                                <Box>
                                    {credits && credits.crew && credits.crew.length > 0 ? (
                                        <>
                                            <hr/>
                                            <h4 style={{fontWeight: "700"}}>Crew</h4>
                                            <Grid container rowSpacing={2}>
                                                {credits.crew.slice(0, 5).map(person => (
                                                    <Grid item xs={6} md={4} key={person.credit_id}>
                                                        <Card sx={{
                                                            height: "100px",
                                                            fontSize: "11px",
                                                            backgroundColor: "rgba(33,32,32,0.1)",
                                                            backdropFilter: "blur(5px)",
                                                            borderRadius: "10px",
                                                            mx: "7px",
                                                            boxShadow: "0px 0px 20px 7px rgba(0,0,0,0.4)",
                                                            WebkitBoxShadow: "0px 0px 20px 7px rgba(0,0,0,0.4)",
                                                            MozBoxShadow: "0px 0px 20px 7px rgba(0,0,0,0.4)"
                                                        }}>
                                                            <Link to={`/person/${person.id}`}
                                                                  style={{color: "white", textDecoration: "none"}}>
                                                                <CardActionArea>
                                                                    <Stack direction="row">
                                                                        <CardMedia
                                                                            component="img"
                                                                            image={person && person.profile_path ? w500Image(person.profile_path) : empty}
                                                                            alt={person.name}
                                                                            sx={{width: "25%"}}
                                                                        />
                                                                        <CardContent sx={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                            alignItems: "flex-start"
                                                                        }}>
                                                                            <p><b>{person.name}</b></p>
                                                                            <p>{person.job}</p>
                                                                        </CardContent>
                                                                    </Stack>
                                                                </CardActionArea>
                                                            </Link>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </>
                                    ) : null}
                                </Box>
                            </Stack>
                            <Box>
                                {reviews && reviews.results && reviews.results.length > 0 ? (
                                    <>
                                        <hr/>
                                        <h4 style={{fontWeight: "700"}}>Reviews</h4>
                                        {reviews.results.map((review) => (
                                            <Card key={review.id}
                                                  sx={{
                                                      backgroundColor: "rgba(255,255,255,0.1)",
                                                      backdropFilter: "blur(5px)",
                                                      borderRadius: "10px",
                                                      mx: "7px",
                                                      my: "20px",
                                                      color: 'white',
                                                      textAlign: "center",
                                                      fontSize: "13px",
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      alignItems: "flex-start",
                                                  }}
                                            >
                                                <CardHeader avatar={
                                                    <Avatar sx={{bgcolor: "#C41C1C"}} aria-label="avatar">
                                                        {review.author_details.username.charAt(0).toUpperCase()}
                                                    </Avatar>}
                                                            title={<p
                                                                style={{paddingTop: "17px", fontFamily: "Montserrat",}}>
                                                                <b>{review.author_details.username}</b> • {format(parseISO(review.created_at), 'MMMM d, yyyy HH:mm')}
                                                            </p>}
                                                />
                                                <CardContent style={{paddingTop: "0px"}}>
                                                    <p>
                                                        {review.content}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </>
                                ) : null}
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
                <Box>
                    {similar && similar.results && similar.results.length > 0 ? (
                        <>
                            <hr/>
                            <h4 style={{fontWeight: "700"}}>Similar</h4>
                            <Box sx={{
                                mb: "25px",
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                            }}>
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={2}
                                    slidesPerView={4}  // Set the number of slides per view to 4
                                    grabCursor={true}
                                    navigation
                                >
                                    {similar.results.map(item => (
                                        <SwiperSlide key={item.id}>
                                            <Link to={`/${mediaType}/${item.id}`} style={{color: "grey"}}>
                                                <MediaCard media={item}/>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                        </>
                    ) : null}
                </Box>
            </Container>
            {
                userId === null ?
                    <Snackbar
                        variant="solid"
                        color="danger"
                        open={snackbarVisible}
                        onClose={() => setSnackbarVisible(false)}
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        startDecorator={<ErrorOutlineRoundedIcon/>}
                    >
                        You must be logged in to perform this action
                    </Snackbar> :
                    <Snackbar
                        variant="soft"
                        color="success"
                        open={snackbarVisible}
                        onClose={() => setSnackbarVisible(false)}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        startDecorator={<DoneAllRoundedIcon/>}
                        endDecorator={
                            <Button
                                onClick={() => setSnackbarVisible(false)}
                                size="sm"
                                variant="soft"
                                color="success"
                            >
                                OK
                            </Button>
                        }
                    >
                        This media was added to your {option}.
                    </Snackbar>
            }
            {
                error && <h1>Error:(</h1>
            }
        </Box>
    );
}

export {
    MediaDetails
}
