import {axiosServiceV4} from "./axios.service";

const authService = {
    createRequestToken: () => axiosServiceV4.post('auth/request_token', {redirect_to: "https://watchoutt.netlify.app/"}),
    createAccessToken: (request_token) => axiosServiceV4.post('auth/access_token', request_token),
    logOut: (access_token) => axiosServiceV4.delete('auth/access_token', access_token),

    getRequestToken: () => localStorage.getItem('request_token'),
    getAccessToken:
        () => localStorage.getItem('access_token'),
    getAccountId:
        () => localStorage.getItem('account_id'),

    deleteInfo:
        () => {
            localStorage.removeItem('request_token')
            localStorage.removeItem('access_token')
            localStorage.removeItem('account_id')
        },
}

export
{
    authService
}