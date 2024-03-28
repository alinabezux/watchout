import {axiosService} from "./axios.service";
import {mediaType} from "../api";

const mediaService = {
    list: (typeMedia, page, options = {}) => {
        const {sort_by, year, genre, vote_average_gte, vote_average_lte} = options;

        let url = 'discover/' + typeMedia + '?page=' + page;
        if (sort_by) {
            url += `&sort_by=${sort_by}`;
        }
        if (year) {
            if (typeMedia === mediaType.movie) {
                url += `&primary_release_year=${year}`;
            } else {
                url += `&first_air_date_year=${year}`;
            }
        }

        if (genre) {
            url += `&with_genres=${genre}`;
        }

        if (vote_average_gte) {
            url += `&vote_average.gte=${vote_average_gte}`;
        }

        if (vote_average_lte) {
            url += `&vote_average.lte=${vote_average_lte}`;
        }

        return axiosService.get(url)//get all movie or tv

    },
    category: (mediaType, mediaCategory) => axiosService.get(mediaType + '/' + mediaCategory), //get tv or movies by category
    details: (mediaType, mediaId) => axiosService.get(mediaType + '/' + mediaId),//get tv or movie by Id
    genres: (mediaType) => axiosService.get('genre/' + mediaType + '/list'),
    videos: (mediaType, mediaId) => axiosService.get(mediaType + '/' + mediaId + '/videos'),
    credits: (mediaType, mediaId) => axiosService.get(mediaType + '/' + mediaId + '/credits'),
    similar: (mediaType, mediaId) => axiosService.get(mediaType + '/' + mediaId + '/similar'),
    reviews: (mediaType, mediaId) => axiosService.get(mediaType + '/' + mediaId + '/reviews'),
    search: (term, mediaType, page) => axiosService.get('/search/' + mediaType + '?query=' + term + '&page=' + page)
}

export
{
    mediaService
}