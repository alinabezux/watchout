import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import React, {useEffect} from "react";

import {mediaActions} from "../redux/slices/media.slice";
import {originalImage} from "../api";
import CircularRate from "./CircularRating";

import {Carousel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Button from '@mui/material/Button';
import {Stack} from "@mui/system";
import {Chip} from "@mui/joy";


const MainBanner = ({mediaType, array}) => {

    const dispatch = useDispatch();
    const location = useLocation();

    const {genres} = useSelector((state) => state.mediaReducer);

    useEffect(() => {
        dispatch(mediaActions.getGenres(mediaType))
    }, [dispatch, mediaType]);


    const isHomePage = location.pathname.includes('/home');

    return (
        <Carousel fade indicators={false}>
            {
                array.map((media) =>
                    <Carousel.Item className="item" key={media.id}>
                        <img
                            src={originalImage(media.backdrop_path)}
                            alt={(media.title) || (media.name)}
                        />
                        <Carousel.Caption>
                            {
                                !isHomePage ?
                                    <CircularRate value={media.vote_average}/>
                                    : null
                            }
                            <h1>{(media.title) || (media.name)}</h1>
                            <p>{media.overview}</p>
                            <Stack direction="row" spacing={2} alignItems="center">
                                {[...media.genre_ids].splice(0, 2).map((genreId, index) => (
                                    <Chip
                                        size="lg"
                                        variant="solid"
                                        color="danger"
                                        key={index}
                                        style={{marginBottom: "15px"}}
                                    >{genres.find(e => e.id === genreId) && genres.find(e => e.id === genreId).name}
                                    </Chip>
                                ))}
                            </Stack>
                            {
                                isHomePage ?
                                    <p style={{color: "#C41C1C"}}><b>Release date: </b>{media.release_date} </p>
                                    : null
                            }
                            {
                                !isHomePage ?
                                    <Link to={`/${mediaType}/${media.id}`}>
                                        <Button startIcon={<PlayArrowIcon/>} variant="contained"
                                                style={{backgroundColor: "#C41C1C"}}>watch
                                            now</Button>
                                    </Link>
                                    : null
                            }

                        </Carousel.Caption>
                    </Carousel.Item>)
            }
        </Carousel>
    );
}

export {MainBanner}