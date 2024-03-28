import {axiosService, axiosServiceV4} from "./axios.service";

const userService = {
    account: (account_id) => axiosService.get('account/' + account_id),
    getUserList: (account_object_id, mediaType, nameOfList) => axiosServiceV4.get('account/' + account_object_id + '/' + mediaType + '/' + nameOfList),

    addToFavorite: (account_id, mediaType, media_id) => axiosService.post('account/' + account_id + '/favorite',
        {
            media_type: mediaType,
            media_id: media_id,
            favorite: true
        }),
    addToWatchlist: (account_id, mediaType, media_id) => axiosService.post('account/' + account_id + '/watchlist',
        {
            media_type: mediaType,
            media_id: media_id,
            watchlist: true
        }),
    addRating: (mediaType, mediaId, value) => axiosService.post(mediaType + '/' + mediaId + '/rating',
        {
            value: value
        })
};

export {userService}