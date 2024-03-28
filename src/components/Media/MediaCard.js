import CircularRate from "../CircularRating";
import {w500Image} from "../../api";

import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import poster from '../../assets/poster.jpg'

const MediaCard = ({media}) => {
    return (
        <Card sx={{
            margin: "10px",
            cursor: "pointer",
            backgroundColor: "inherit",
        }}>
            <CardActionArea>
                <div style={{backgroundColor: "black"}}>
                    <CardMedia
                        component="img"
                        image={media && media.poster_path ? (w500Image(media.poster_path)) : poster}
                        alt={media.original_title || media.name}
                        sx={{
                            zIndex: "1",
                            position: "relative",
                            transition: "all ease 0.5s",
                            "&:hover": {
                                opacity: 0.25
                            },
                        }}
                    />
                    <CardContent sx={{position: "absolute", bottom: "0", color: "white", textAlign: "start"}}>
                        <CircularRate value={media.vote_average}/>
                        <h4 style={{fontWeight: "700"}}>
                            {media.title || media.name}
                        </h4>

                        <p style={{fontFamily: 'Montserrat',}}>
                            <b>
                                {media.release_date ? media.release_date.substring(0, 4) : ''}
                                {media.first_air_date ? media.first_air_date.substring(0, 4) : ''}
                            </b>
                        </p>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
    );
}

export {MediaCard}