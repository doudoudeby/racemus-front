
import axios from 'axios';

export function getAllMacdo() {

    const url = "http://localhost:8085/V0/macdo/2";
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}