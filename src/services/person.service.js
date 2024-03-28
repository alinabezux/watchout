import {axiosService} from "./axios.service";

const personService = {
    person: (personId) => axiosService.get('person/' + personId),
    personMedias: (personName) => axiosService.get('search/person?query=' + personName),
}

export
{
    personService
}