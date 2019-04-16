// play_flag
// full_flag
// play_song
// play_index
// play_list

const mutations = {

    set_play_flag(state,play_flag){
        state.play_flag = play_flag;
    },

    set_full_flag(state,full_flag){
        state.full_flag = full_flag;
    },

    set_play_song(state,play_song){
        state.play_song = play_song;
    },

    set_play_index(state,play_index){
        state.play_index = play_index;
    },

    //设置当前播放的歌曲的 url 地址。
    set_play_audio(state,audio){
        state.play_song.audio = audio;
    },

    set_play_list(state,play_list){
        state.play_list = play_list;
    },
    
}

export default mutations;