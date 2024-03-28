import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {originalImage} from "../api";
import {PersonMediaList} from "./PersonMediaList";
import {personActions} from "../redux/slices/person.slice";

import empty from '../assets/stub-empty.svg';

import {Container, Grid} from "@mui/material";
import {Box, Stack} from "@mui/system";

const PersonDetails = ({personId}) => {

    const dispatch = useDispatch();
    const {person} = useSelector(state => state.personReducer);

    useEffect(() => {
        dispatch(personActions.getPerson(personId))
    }, [dispatch, personId])


    return (
        <Container sx={{color: "white", marginTop: "100px", mb: "20px"}}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box sx={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(5px)",
                        borderRadius: "10px",
                        padding: "15px",
                        fontSize: "14px",
                        boxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)",
                        WebkitBoxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)",
                        MozBoxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)"
                    }}>
                        <Stack spacing={2}>
                            <img
                                src={person && person.profile_path ? originalImage(person.profile_path) : empty}
                                alt={person.name}
                            />


                            {
                                person && person.birthday ? (
                                    person.deathday !== null ? (
                                        <h5 style={{textAlign: "center"}}>( {person.birthday.substring(0, 4)} - {person.deathday.substring(0, 4)} )</h5>
                                    ) : <h5 style={{textAlign: "center"}}>( {person.birthday.substring(0, 4)} )</h5>
                                ) : null
                            }


                            {
                                person && person.place_of_birth ? (
                                    <Stack direction="column"
                                           alignItems="center"
                                           spacing={2}
                                           key={person.id}
                                    >
                                        <p><b>Place of birth : </b></p>
                                        <p style={{textAlign: "center"}}>{person.place_of_birth}</p>
                                    </Stack>
                                ) : null
                            }

                            {
                                person && person.known_for_department ? (
                                    <Stack direction="column"
                                           alignItems="center"
                                           spacing={2}
                                           key={person.id}
                                    >
                                        <p><b>Known for : </b></p>
                                        <p>{person.known_for_department}</p>
                                    </Stack>
                                ) : null
                            }
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <Box sx={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(5px)",
                        borderRadius: "10px",
                        padding: "15px",
                        fontSize: "12px",
                        boxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)",
                        WebkitBoxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)",
                        MozBoxShadow: "0px 0px 39px 7px rgba(0,0,0,0.73)"
                    }}>
                        <Stack direction="column" spacing={2}>
                            <h3 style={{fontWeight: "700"}}>
                                {person.name}
                            </h3>
                            <p><i>{person.biography}</i></p>
                        </Stack>
                    </Box>
                    <Box sx={{mt: "10px"}}>
                        <Stack direction="column" spacing={2}>
                            <h3 style={{fontWeight: "700", marginLeft: "15px"}}>
                                Known for :
                            </h3>
                            <PersonMediaList key={person.id} personName={person.name}/>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
        ;
}

export {PersonDetails}