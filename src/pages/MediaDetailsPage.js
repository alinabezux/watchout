import {useParams} from "react-router-dom";

import {MediaDetails} from "../components";


const MediaDetailsPage = () => {
    const {mediaType, id} = useParams();

    return (
        <MediaDetails key={id} mediaType={mediaType} mediaId={id}/>
    );
}

export {MediaDetailsPage}