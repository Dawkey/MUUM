import {get_audio} from "api/player.js";

export function set_audio({commit, getters}){

    let song = getters.play_song;

    let id = song.id;
    let audio = song.audio;

    let date = new Date().getTime();
    let druation = (date - audio.exp) / 1000;

    if(audio.src !== "" && druation > 800){
        return;
    }

    get_audio(id).then((res)=>{

        let res_data = res.data;
        let code = res_data.code;

        if(code === 200){
            let data = res_data.data;
            let src = data[0].url;
            //部分歌曲的 src 为null
            if(src === null){
                console.log("歌曲src为null，无法播放。");
                return;
            }
            src = "/audiourl" + src.substring(24);
            let exp = new Date().getTime();
            let audio = {src, exp};
            commit("set_play_audio", audio);
        }

    });

}

