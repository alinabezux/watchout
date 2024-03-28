const mediaType = {
    movie: 'movie',
    tv: 'tv'
};

const mediaCategory = {
    popular: 'popular',
    top_rated: 'top_rated',
    upcoming: 'upcoming',
    on_the_air: 'on_the_air'
};

const w500Image = (imgEndpoint) => `https://image.tmdb.org/t/p/w500${imgEndpoint}`;
const originalImage = (imgEndpoint) => `https://image.tmdb.org/t/p/original/${imgEndpoint}`;
const youtubePath = (videoId) => `https://www.youtube.com/embed/${videoId}?controls=0`;



export {
    mediaType, mediaCategory, w500Image, originalImage, youtubePath
}
