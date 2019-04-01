import axios from "axios";


export function get_songs(id){
    return axios.get(`/api/playlist/detail?id=${id}`);
}