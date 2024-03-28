import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {personActions} from "../redux/slices/person.slice";
import {MediaCard} from "./Media";

import {Grid} from "@mui/material";

const PersonMediaList = ({personName}) => {
    const dispatch = useDispatch();

    const {personSearch} = useSelector(state => state.personReducer);

    useEffect(() => {
        dispatch(personActions.getPersonMedias(personName))
    }, [dispatch, personName])

    return (
        <Grid container columnSpacing={2}>
            {personSearch.map((person) => (
                person.known_for.map((media) => (
                    <Grid item key={media.id} xs={4}>
                        <Link to={`/movie/${media.id}`}
                              style={{color: "white", textDecoration: "none"}}>
                            <MediaCard key={media.id} media={media}/>
                        </Link>
                    </Grid>
                ))
            ))
            }
        </Grid>
    )
};

export {
    PersonMediaList
};