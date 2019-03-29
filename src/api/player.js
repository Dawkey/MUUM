import axios from "axios";


export function get_lyric(id){
    return axios.get(`/api/lyric?id=${id}`);
}

export function get_song(id){
    return axios.get(`/api/song/detail?ids=${id}`);
}