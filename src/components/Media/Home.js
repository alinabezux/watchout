import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import MediaSwiper from "./MediaSwiper";
import {MainBanner} from "../MainBanner";
import {mediaCategory, mediaType} from "../../api";
import {mediaActions} from "../../redux/slices/media.slice";

import 'swiper/css';
import {Box, Container, Typography} from "@mui/material";

const Home = () => {
    const dispatch = useDispatch();
    const {
        moviePopular,
        movieTopRated,
        movieUpcoming,
        tvPopular,
        tvTopRated
    } = useSelector((state) => state.mediaReducer);

    useEffect(() => {
        dispatch(mediaActions.getMoviePopular({mediaType: mediaType.movie, mediaCategory: mediaCategory.popular}))
        dispatch(mediaActions.getMovieTopRated({mediaType: mediaType.movie, mediaCategory: mediaCategory.top_rated}))
        dispatch(mediaActions.getMovieUpcoming({mediaType: mediaType.movie, mediaCategory: mediaCategory.upcoming}))

        dispatch(mediaActions.getTvPopular({mediaType: mediaType.tv, mediaCategory: mediaCategory.popular}))
        dispatch(mediaActions.getTvTopRated({mediaType: mediaType.tv, mediaCategory: mediaCategory.top_rated}))

    }, [dispatch]);
    return (
        <Box>
            <MainBanner mediaType={mediaType.movie} array={movieUpcoming}/>
            <Container sx={{marginTop: "-250px"}}>
                <Box>
                    <Typography variant="h5" fontWeight="700" textTransform="uppercase" color="#C41C1C"
                                textAlign="center"
                                sx={{fontFamily: "Montserrat", position: "relative"}}>Popular movies</Typography>
                    <MediaSwiper mediaType={mediaType.movie} array={moviePopular}/>
                </Box>

                <Box>
                    <Typography variant="h5" fontWeight="700" textTransform="uppercase" color="#C41C1C"
                                textAlign="center"
                                sx={{fontFamily: "Montserrat"}}>Top-rated movies</Typography>
                    <MediaSwiper mediaType={mediaType.movie} array={movieTopRated}/>
                </Box>
                <Box>
                    <Typography variant="h5" fontWeight="700" textTransform="uppercase" color="#C41C1C"
                                textAlign="center"
                                sx={{fontFamily: "Montserrat"}}>Popular tv-series</Typography>
                    <MediaSwiper mediaType={mediaType.tv} array={tvPopular}/>
                </Box>

                <Box>
                    <Typography variant="h5" fontWeight="700" textTransform="uppercase" color="#C41C1C"
                                textAlign="center"
                                sx={{fontFamily: "Montserrat"}}>Top-rated tv-series</Typography>
                    <MediaSwiper mediaType={mediaType.tv} array={tvTopRated}/>
                </Box>
            </Container>
        </Box>
    );
};

export {Home};