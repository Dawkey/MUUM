<template>
    <div class="player">

        <audio class="audio" :src="play_song === null ? '' : play_song.audio.src"
               ref="audio"
               @canplay="can_play"
               @timeupdate="time_update"
               @waiting="loading"
               @playing="loaded"
               @progress="buffer_update"
               @ended="ended"
        >
        </audio>

        <div class="main" v-show="full_flag">
            <div class="left">
                <div class="circle">
                    <img class="album_circle" :src="album_pic">
                    <div class="album_hole"></div>
                    <music-move class="music_move"
                        :analyser="analyser" :analyser_flag="analyser_flag"
                    >
                    </music-move>
                </div>
                <div class="button">
                    <div class="button_1">
                        <div class="download"><i class="icon-download"></i> 下载</div>
                        <div class="love"><i class="icon-love"></i> 喜欢</div>
                    </div>
                    <div class="button_2">
                        <div class="mark"><i class="icon-mark"></i> 收藏</div>
                        <div class="unlove"><i class="icon-unlove"></i> 无感</div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="name">{{name}}</div>
                <div class="name_add" v-show="name_add !== ''">—— {{name_add}}</div>
                <div class="information">
                    <div class="album">专辑:<span>{{album}}</span></div>
                    <div class="singer">
                        歌手:<span v-for="(val,index) in singer" :key="index">
                                <span>{{val.name}}</span>
                                <span v-if="index !== (singer.length - 1)">|</span>
                             </span>
                    </div>
                </div>

                <lyric class="lyric" 
                    :lyric="lyric" :lyric_flag="lyric_flag" 
                    :audio="$refs.audio" :bar_is_move="bar_is_move"
                    :play_flag="play_flag" :audio_ready="audio_ready"
                >
                </lyric>

            </div>            
        </div>


        <div class="bottom_bar">
            <div class="mini_page">
                <!-- <img v-show="!full_flag" @click="set_full_flag(true)" :src="album_pic"> -->
                <i   v-show="full_flag"  @click="set_full_flag(false)" class="icon-muum"></i>
            </div>
            <i class="icon-pre" @click="pre_song"></i>
            <i :class="[{'icon-play': !play_flag},{'icon-pause': play_flag}]"
                @click="toggle_play"
            >
            </i>
            <i class="icon-next" @click="next_song"></i>

            <progress-bar class="progress_bar"
                :current_time="current_time" :total_time="total_time" :audio_ready="audio_ready"
                :buffer_precent="buffer_precent" :loading_flag="loading_flag"
                @change_time = "change_time">
            </progress-bar>

            <div class="sound">
                <i class="icon-sound"></i>
                <sound-bar class="sound_bar"
                    :init_volume="init_volume"
                    @change_volume = "change_volume">
                </sound-bar>
            </div>
            <div class="songlist">
                <i class="icon-songlist"></i>
            </div>
        </div>        

    </div>
</template>

<script>
    import {mapGetters,mapMutations,mapActions} from "vuex";

    import {get_lyric} from "api/player.js";
    import {get_song} from "api/player.js";
    import handle_lyric from "common/js/handle_lyric.js";
    import {class_song} from "common/js/class.js";

    import ProgressBar from "components/base/ProgressBar.vue";
    import SoundBar from "components/base/SoundBar.vue";
    import Lyric from "components/base/Lyric.vue";
    import MusicMove from "components/base/MusicMove.vue";

import { setInterval } from 'timers';

    export default{
        name: "Player",

        components: {ProgressBar,SoundBar,Lyric,MusicMove},

        data(){
            return{
                lyric: [],
                name: "",
                name_add: "",
                singer: [],
                album: "",
                album_pic: require("assets/album.svg"),

                audio_ready: false, //控制audio能否播放的关键flag。
                current_time: 0,
                total_time: 0,

                buffer_precent: 0,
                loading_flag: false,
                lyric_flag: false,
                bar_is_move: false,

                init_volume: 0.25,

                analyser: null,
                analyser_flag: true
            }
        },


        computed: {
            ...mapGetters([
                "play_flag",
                "full_flag",
                "play_song",
                "play_index",
                "play_list"
            ]),
        },


        created(){
        },


        mounted(){
            this.$refs.audio.volume = this.init_volume * 0.35;
        },


        methods:{
            ...mapMutations([
                "set_play_flag",
                "set_full_flag",
                "set_play_song",
                "set_play_index"
            ]),

            ...mapActions([
                "set_audio"
            ]),

            lyric_get(id){
                get_lyric(id).then((res)=>{
                    let data = res.data;
                    let ori_lyric = data.lrc.lyric;
                    let tra_lyric = data.tlyric.lyric;
                    let ori_arr = [];
                    let tra_arr = [];
                    
                    if(ori_lyric){
                        ori_arr = handle_lyric(ori_lyric);
                    }
                    if(tra_lyric){
                        let i = 0;
                        tra_arr = handle_lyric(tra_lyric);
                        ori_arr.forEach((val)=>{
                            if(tra_arr[i] && val.time === tra_arr[i].time){
                                val.text = `${val.text}<br/>${tra_arr[i].text}`;
                                i++;
                            }
                        });
                    }

                    this.lyric = ori_arr;
                });
            },

            song_get(){
                get_song("1337938362").then((res)=>{
                    let data = res.data.songs[0];
                    let song = new class_song(data);
                    this.set_play_song(song);
                });
            },

            data_set(){
                let song = this.play_song;
                if(song === null){
                    return;
                }
                this.lyric_get(song.id);
                this.set_audio();
                this.name = song.name;
                this.name_add = song.name_add.length === 0 ? "" : song.name_add[0];
                this.singer = song.singer;
                this.album = song.album.name;
                this.album_pic = song.album.pic_url;

                this.total_time = song.time.second;
            },


            pre_song(){
                if(!this.play_list.length) return;
                let index = this.play_index - 1;
                if(index < 0) index = this.play_list.length - 1;
                this.set_play_index(index);
                this.set_play_song(this.play_list[index]);
            },

            next_song(){
                if(!this.play_list.length) return;
                let index = this.play_index + 1;
                if(index > this.play_list.length - 1) index = 0;
                this.set_play_index(index);
                this.set_play_song(this.play_list[index]);
            },

            toggle_play(){
                if(!this.play_list.length) return;
                this.set_play_flag(!this.play_flag);
            },

            loading(){
                this.loading_flag = true;
                this.lyric_flag = false;
            },

            loaded(){
                this.loading_flag = false;
                this.lyric_flag = true;
            },

            can_play(){
                this.audio_ready = true;
            },
            
            ended(){
                this.next_song();
            },

            time_update(){
                this.current_time = this.$refs.audio.currentTime;
            },

            buffer_update(){
                let buffered = this.$refs.audio.buffered;
                let length = buffered.length;
                if(length > 0){
                    let time = buffered.end(length - 1);
                    this.buffer_precent = time / this.$refs.audio.duration;
                }
            },

            change_time(time){
                this.$refs.audio.currentTime = time;
                this.bar_is_move = !this.bar_is_move;
            },
            
            change_volume(volume){
                this.$refs.audio.volume = volume * 0.35;
            },

            init_analyser(){
                let ctx = new (window.AudioContext || window.webkitAudioContext)();
                let analyser = ctx.createAnalyser();
                let audio_src = ctx.createMediaElementSource(this.$refs.audio);
                audio_src.connect(analyser);
                analyser.connect(ctx.destination);
                this.analyser = analyser;
            }

        },


        watch: {
            play_song(){
                this.buffer_precent = 0;
                this.audio_ready = false;
                this.loading_flag = true;
                this.lyric_flag = false;    
                this.lyric = [];
                this.data_set();
                this.set_play_flag(true);

                if(this.analyser_flag){
                    this.init_analyser();
                    this.analyser_flag = false;
                }
            },

            audio_ready(){
                if(!this.audio_ready){
                    return;
                }

                if(this.play_flag){
                    this.$refs.audio.play();
                }
            },

            play_flag(){
                if(this.play_flag === false){
                    this.loading_flag = false;
                    this.lyric_flag = false;
                }
                if(this.audio_ready){
                    let audio = this.$refs.audio;
                    this.play_flag ? audio.play() : audio.pause();
                }
            },

        }
        
    }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/var.styl"

    @keyframes rotate
        0%
            transform: rotate(0)
        100%
            transform: rotate(360deg)

    .player
        position: fixed
        .main
            position: fixed
            z-index: 10
            width: 100%
            top: 30px
            bottom: 45px
            display: flex
            justify-content: space-between
            background: $color-back
            .left
                display: flex
                flex-direction: column
                align-items: center
                width: 45%
                height: 100%
                .circle
                    position: relative
                    display: flex
                    align-items: center
                    justify-content: center
                    margin-top: 20px
                    width: 280px
                    height: 280px
                    border-radius: 50%
                    .album_circle
                        position: relative
                        z-index: 10
                        width: 200px
                        height: 200px
                        border-radius: 50%
                        object-fit: cover
                        filter: grayscale(85%)
                        animation: rotate 35s linear infinite
                    .album_hole
                        display: none
                        position: absolute
                        z-index: 11
                        width: 40px
                        height: 40px
                        border-radius: 50%
                        background: $color-back
                        box-shadow: 0 0 0 1px rgba(50,50,50,0.3) inset
                        &:before
                            content: ""
                            position: absolute
                            top: 0
                            left: 0
                            width: 20px
                            height: 20px
                            border: solid rgba(50,50,50,0.15) 10px
                            border-radius: 50%
                            box-shadow: 0 0 0 1px rgba(50,50,50,0.3) inset
                    .music_move
                        position: absolute
                        z-index: 11
                .button
                    margin-top: 22px
                    width: 175px
                    font-size: 15px
                    font-family: "方正苏新诗柳楷简体"
                    .button_1,.button_2
                        display: flex
                        justify-content: space-between
                        >div
                            display: flex
                            align-items: center
                            height: 30px
                            padding: 0 10px
                            border-radius: 4px
                            background: $color-button
                            cursor: pointer
                            i
                                font-size: 17px
                                margin-right: 5px
                                margin-bottom: 1px
                            .icon-unlove
                                font-size: 18px
                            &:hover
                                background: $color-button-a
                                color: $color-spec
                    .button_2
                        margin-top: 12px

            .right
                display: flex
                flex-direction: column
                width: 37.5%
                box-sizing: border-box
                height: 100%
                padding-top: 20px
                font-family: "方正苏新诗柳楷简体"
                box-sizing: border-box
                padding-right: 8px
                .name
                    width: 100%
                    font-size: 20px
                    white-space: nowrap
                    text-overflow: ellipsis
                    overflow: hidden
                    flex-shrink: 0
                .name_add
                    font-size: 13px
                    white-space: nowrap
                    text-overflow: ellipsis
                    line-height: 25px
                    overflow: hidden
                    flex-shrink: 0
                .information
                    display: flex
                    justify-content: space-between
                    font-size: 13px
                    margin-top: 10px
                    margin-right: 6px
                    >div
                        display: flex
                        >span
                            max-width: 90px
                            white-space: nowrap
                            text-overflow: ellipsis
                            overflow: hidden
                            margin-left: 8px
                            color: $color-spec
                            cursor: pointer

                .lyric
                    position: relative
                    flex-grow: 1
                    overflow: auto
                    padding-right: 4px
                    margin-top: 20px
                    margin-bottom: 35px
                ::-webkit-scrollbar
                    width: 6px
                    background-color: transparent
                ::-webkit-scrollbar-track
                    display: none
                ::-webkit-scrollbar-thumb
                    border-radius: 10px
                    background-color: $color-spec-o
            

        

        .bottom_bar
            position: fixed
            z-index: 11
            display: flex
            align-items: center
            width: 100%
            height: 45px
            bottom: 0
            box-shadow: 0 -1px 1px -1px $color-spec
            font-size: 23px
            background: $color-back
            .mini_page
                width: 44px
                height: 43px
                margin-left: 1px
                display: flex
                align-items: center
                >img
                    width: 44px
                    height: 100%
                    object-fit: cover
                    filter: grayscale(85%)
                    border-radius: 2px
                    cursor: pointer
                >i
                    font-size: 26px
                    margin-left: 20px
                    cursor: pointer
            >i
                margin-left: 15px
                cursor: pointer
            i
                color: $color-icon
                &:hover
                    color: $color-icon-h 
            .icon-pre
                margin-left: 15px
            .icon-play,.icon-pause
                font-size: 27px      
            .progress_bar
                margin-left: 15px
                flex: 1
            .sound
                display: flex
                align-items: center
                margin-left: 10px
                >i
                    font-size: 15px
                    margin-right: 6px            
            .songlist
                >i
                    font-size: 24px
                    margin-left: 13px
                    margin-right: 16px
                    cursor: pointer

</style>