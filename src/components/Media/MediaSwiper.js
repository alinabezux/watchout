import React from "react";
import {Link} from "react-router-dom";
import {Navigation} from 'swiper/modules';

import {MediaCard} from "./MediaCard";

import {Box} from "@mui/system";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';

const MediaSwiper = ({mediaType, array}) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            my: "15px"
        }}>
            <Swiper
                modules={[Navigation]}
                spaceBetween={2}
                slidesPerView={4}
                grabCursor={true}
                navigation
            >
                {array ? (
                    array.map(item => (
                        <SwiperSlide key={item.id}>
                            <Link to={`/${mediaType}/${item.id}`} style={{color: "grey"}}>
                                <MediaCard media={item}/>
                            </Link>
                        </SwiperSlide>
                    ))
                ) : null}
            </Swiper>
        </Box>
    );
}

export default MediaSwiper;