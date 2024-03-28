import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {mediaActions} from "../../redux/slices/media.slice";
import {MediaCard} from "./MediaCard";

import Pagination from '@mui/material/Pagination';
import {Option, Select, Slider} from "@mui/joy";
import {Box, Container, Grid, PaginationItem} from "@mui/material";
import Button from '@mui/joy/Button';


const Medias = ({mediaType}) => {
    const dispatch = useDispatch();

    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [sort_by, setSort_by] = useState('');
    const [ratingRange, setRatingRange] = useState([0, 10]);
    const [vote_average_gte, setVote_average_gte] = useState('');
    const [vote_average_lte, setVote_average_lte] = useState('');

    const {genres} = useSelector(state => state.mediaReducer);
    const {list, total_pages, currentPageMedia} = useSelector((state) => state.mediaReducer);


    useEffect(() => {
        dispatch(mediaActions.getGenres(mediaType))
    }, [dispatch, mediaType]);

    useEffect(() => {
        dispatch(mediaActions.getAllMedia({
            mediaType: mediaType,
            page: currentPageMedia,
            year: year,
            genre: genre,
            sort_by: sort_by,
            vote_average_gte: vote_average_gte,
            vote_average_lte: vote_average_lte
        }));
    }, [dispatch, mediaType, currentPageMedia, sort_by, year, genre, vote_average_gte, vote_average_lte]);


    const handleChangeSorting = (event, newSort) => {
        setSort_by(newSort);
    }

    const handleChangeGenres = (event, newGenre) => {
        setGenre(newGenre);
    }
    const handleChangeYear = (event, newYear) => {
        setYear(newYear);
    }
    const handleChangeRating = (event, newValue) => {
        setRatingRange(newValue);
        setVote_average_gte(newValue[0]);
        setVote_average_lte(newValue[1]);
    };

    const handleClearFilter = () => {
        setSort_by('');
        setGenre('');
        setYear('');
        setRatingRange([0, 10]);
        setVote_average_lte('');
        setVote_average_gte('');
    }

    const handleSetCurrentPageMedia = async (pageNumber) => {
        dispatch(mediaActions.setCurrentPageMedia(pageNumber));
    }

    return (
        <Box sx={{mt: "-260px", position: "1",}}>

            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={2} sx={{ml: "15px"}}>
                    <Select placeholder="Sort by..." value={sort_by} color="danger" variant="solid"
                            sx={{backgroundColor: "rgba(0,0,0,0.5)", fontFamily: "Montserrat", height: "40px"}}
                            onChange={handleChangeSorting}>
                        <Option sx={{fontFamily: "Montserrat"}}
                                value="popularity.desc">By popularity</Option>
                        <Option sx={{fontFamily: "Montserrat"}} value="vote_average.desc">By rating</Option>
                        <Option sx={{fontFamily: "Montserrat"}} value="primary_release_date.desc">By
                            novelty</Option>
                    </Select>
                </Grid>

                <Grid item xs={2}>
                    <Select placeholder="Choose genre" value={genre}
                            color="danger" variant="solid"
                            sx={{backgroundColor: "rgba(0,0,0,0.5)", height: "40px", fontFamily: "Montserrat",}}
                            onChange={handleChangeGenres}>
                        {
                            genres.map(genre =>
                                <Option value={genre.id} sx={{fontFamily: "Montserrat"}}>{genre.name}</Option>)
                        }
                    </Select>
                </Grid>

                <Grid item xs={1}>
                    <Select placeholder="Year"
                            value={year}
                            color="danger" variant="solid"
                            sx={{backgroundColor: "rgba(0,0,0,0.5)", height: "40px", fontFamily: "Montserrat",}}
                            onChange={handleChangeYear}>
                        <Option value="2023" sx={{fontFamily: "Montserrat"}}>2023</Option>
                        <Option value="2022" sx={{fontFamily: "Montserrat"}}>2022</Option>
                        <Option value="2021" sx={{fontFamily: "Montserrat"}}>2021</Option>
                        <Option value="2020" sx={{fontFamily: "Montserrat"}}>2020</Option>
                        <Option value="2019" sx={{fontFamily: "Montserrat"}}>2019</Option>
                        <Option value="2018" sx={{fontFamily: "Montserrat"}}>2018</Option>
                        <Option value="2017" sx={{fontFamily: "Montserrat"}}>2017</Option>
                        <Option value="2016" sx={{fontFamily: "Montserrat"}}>2016</Option>
                        <Option value="2015" sx={{fontFamily: "Montserrat"}}>2015</Option>
                        <Option value="2014" sx={{fontFamily: "Montserrat"}}>2014</Option>
                    </Select>
                </Grid>

                <Grid item xs={2}>
                    <Slider
                        value={ratingRange}
                        onChange={handleChangeRating}
                        valueLabelDisplay="auto"
                        min={1}
                        max={10}
                        step={1}
                        color="danger"
                        variant="plain"
                        height="40px"
                    />
                </Grid>

                <Grid item xs={2}>
                    <Button variant="outlined" onClick={handleClearFilter} color="danger"
                            sx={{ml: "100px", fontFamily: "Montserrat", height: "40px"}}>
                        Clear filters</Button>
                </Grid>
            </Grid>

            {/*medias*/}
            <Container
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(20%, 1fr))",
                    gap: "15px",
                    my: "15px",
                }}
            >
                {
                    list.map((media) => <Link to={`/${mediaType}/${media.id}`} style={{color: "grey"}}>
                        <MediaCard key={media.id} media={media} mediaType={mediaType}/></Link>)
                }
            </Container>

            <Container sx={{
                display: "flex", justifyContent: "center", my: "25px", position: "relative",
            }}>
                <Pagination count={total_pages} page={currentPageMedia} variant="outlined"
                            shape="rounded"
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: 'white',
                                    fontFamily: 'Montserrat',
                                    fontWeight: "500"
                                },
                                '& .Mui-selected': {borderColor: 'red', color: 'red', fontWeight: "700"},
                            }}
                            renderItem={(item) => (
                                <PaginationItem
                                    component="div"
                                    {...item}
                                    onClick={() => handleSetCurrentPageMedia(item.page)}
                                />
                            )}/>
            </Container>
        </Box>
    );
}

export {
    Medias
}