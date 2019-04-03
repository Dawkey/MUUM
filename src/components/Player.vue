<template>
    <div class="player">

        <audio class="audio" :src="play_song === null ? '' : play_song.audio.src"
               ref="audio"
               @canplay="start_play"
        >
        </audio>

        <div class="main" v-show="full_flag">
            <div class="left">
                <div class="circle">
                    <img class="album_circle" :src="album_pic">
                    <div class="album_hole"></div>
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
                <div class="lyric_contain">
                    <ul class="lyric">
                        <li v-for="(item,index) in lyric" :key="index" v-html="item.text"></li>
                    </ul>
                </div>
            </div>            
        </div>


        <div class="bottom_bar">
            <div class="mini_page">
                <img v-show="!full_flag" @click="set_full_flag(true)" :src="album_pic">
                <i   v-show="full_flag"  @click="set_full_flag(false)" class="icon-muum"></i>
            </div>
            <i class="icon-pre"></i>
            <i :class="[{'icon-play': !play_flag},{'icon-pause': play_flag}]"
                @click="toggle_play"
            >
            </i>
            <i class="icon-next"></i>
            <progress-bar class="progress_bar"></progress-bar>
            <div class="sound">
                <i class="icon-sound"></i>
                <div class="sound_bar"></div>
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

    export default{
        name: "Player",

        components: {ProgressBar},

        data(){
            return{
                lyric: [],
                name: "",
                name_add: "",
                singer: [],
                album: "",
                album_pic: "",

                audio_ready: false
            }
        },


        computed: {
            ...mapGetters([
                "play_flag",
                "full_flag",
                "play_song"
            ]),
        },


        created(){
            if(this.play_song === null){
                this.song_get();
            }
            // this.data_set();
        },


        mounted(){
            // this.song_get();
        },


        methods:{
            ...mapMutations([
                "set_play_flag",
                "set_full_flag"
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
                    // console.log(data);
                    let song = new class_song(data);
                    this.lyric_get(song.id);
                    this.name = song.name;
                    this.name_add = song.name_add.length === 0 ? "" : song.name_add[0];
                    this.singer = song.singer;
                    this.album = song.album.name;
                    this.album_pic = song.album.pic_url;
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
            },

            start_play(){
                this.$refs.audio.volume = 0.1;
                this.audio_ready = true;
                // this.$refs.audio.play();
            },

            toggle_play(){
                this.set_play_flag(!this.play_flag);
            }
        },


        watch: {
            play_song(){
                this.audio_ready = false;
                this.data_set();
                this.set_play_flag(true);
            },

            audio_ready(){
                if(this.audio_ready && this.play_flag){
                    this.$refs.audio.play();
                }
            },

            play_flag(){
                if(this.audio_ready){
                    let audio = this.$refs.audio;
                    this.play_flag ? audio.play() : audio.pause();
                }
            }
        }
        
    }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/var.styl"
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
                    // box-shadow: 0 0 5px 0 #666
                    .album_circle
                        position: relative
                        width: 220px
                        height: 220px
                        border-radius: 50%
                        border: solid rgba(50,50,50,0.15) 5px
                        box-shadow: 0 0 3px 0 #777
                        object-fit: cover
                    .album_hole
                        display: none
                        position: absolute
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
                            border-radius: 2px
                            box-shadow: 0 0 3px 0 #777
                            cursor: pointer
                            i
                                font-size: 17px
                                margin-right: 5px
                                margin-bottom: 1px
                            .icon-unlove
                                font-size: 18px
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

                .lyric_contain
                    position: relative
                    flex-grow: 1
                    overflow: auto
                    padding-right: 4px
                    margin-top: 20px
                    margin-bottom: 35px
                    .lyric
                        font-size: 14px
                        color: $color-text-2
                        line-height: 18px
                        >li
                            min-height: 13px
                            margin-top: 13px
                ::-webkit-scrollbar
                    width: 6px
                    background-color: transparent
                ::-webkit-scrollbar-track
                    display: none
                ::-webkit-scrollbar-thumb
                    border-radius: 10px
                    background-color: rgba(103,170,209,0.3)
            

        

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
                width: 45px
                height: 42px
                margin-left: 2px
                display: flex
                align-items: center
                >img
                    width: 45px
                    height: 100%
                    object-fit: cover
                    border-radius: 2px
                    box-shadow: 0 0 1px 0 #666
                    cursor: pointer
                >i
                    font-size: 26px
                    margin-left: 20px
                    // color: #e3c4a8
                    cursor: pointer
            >i
                margin-left: 15px
                cursor: pointer
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
                .sound_bar
                    height: 5px
                    width: 50px
                    border-radius: 4px
                    background: rgba(103,170,209,0.3)
            .songlist
                >i
                    font-size: 24px
                    margin-left: 13px
                    margin-right: 16px

</style>