import {useParams} from "react-router-dom";

import {PersonDetails} from "../components";


const PersonPage = () => {
    const {id} = useParams();
    return (
        <PersonDetails personId={id}/>
    );
}

export {PersonPage}