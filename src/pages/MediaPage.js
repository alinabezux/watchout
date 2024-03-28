import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {MainBanner, Medias} from "../components";
import {mediaCategory, mediaType} from "../api";
import {mediaActions} from "../redux/slices/media.slice";

import {Box} from "@mui/system";


const MediaPage = ({mediaTyp}) => {
    const dispatch = useDispatch();
    const {moviePopular, tvPopular} = useSelector((state) => state.mediaReducer);
    const [arrayType, setArrayType] = useState([]);

    useEffect(() => {
        if (mediaTyp === "movie") {
            dispatch(mediaActions.getMoviePopular({mediaType: mediaType.movie, mediaCategory: mediaCategory.popular}));
        } else {
            dispatch(mediaActions.getTvPopular({mediaType: mediaType.tv, mediaCategory: mediaCategory.popular}));
        }
    }, [dispatch, mediaTyp]);


    useEffect(() => {
        if (mediaTyp === "movie") {
            setArrayType(moviePopular);
        } else {
            setArrayType(tvPopular);
        }
    }, [mediaTyp, moviePopular, tvPopular]);

    return (
        <Box>
            <MainBanner mediaType={mediaTyp} array={arrayType}/>
            <Medias mediaType={mediaTyp}/>
        </Box>
    );
}


export {MediaPage}