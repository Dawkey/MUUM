<template>
    <div class="player">
        <div class="left">
            <div class="circle">
                <img class="album_circle" src="https://p1.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg">
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
            <div class="information">
                <div class="album">专辑:<span>{{album}}</span></div>
                <div class="singer">歌手:<span>{{singer}}</span></div>
            </div>
            <div class="lyric_contain">
                <ul class="lyric">
                    <li v-for="(item,index) in lyric" :key=index v-html="item.text"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {get_lyric} from "api/player.js";
    import {get_song} from "api/player.js";
    import handle_lyric from "common/js/handle_lyric.js"

    export default{
        name: "Player",


        data(){
            return{
                lyric: [],
                name: "shadowgraph",
                name_add: "TV动画《不吉波普不笑》片头曲 / TVアニメ「ブギーポップは笑わない」OPテーマ",
                singer: "MYTH & ROID",
                album: "shadowgraph",
                album_pic: "https://p2.music.126.net/jjRD2sJ8Uz8pgZS47Kz0lw==/109951163792738412.jpg",
            }
        },


        mounted(){
            this.lyric_get();
            // this.song_get();
        },


        methods:{
            lyric_get(){
                get_lyric("1337938362").then((res)=>{
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
                    console.log(this.lyric);
                });
            },

            song_get(){
                get_song("1337938362").then((res)=>{
                    let data = res.data;
                    let song = data.songs[0];
                    this.name = song.name;
                    this.album = {name: song.al.name, id: song.al.id};
                    this.album_pic = song.al.picUrl;
                });
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import "~common/stylus/var.styl"
    .player
        display: flex
        position: relative
        justify-content: space-between
        width: 100%
        height: 100%
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
                margin-top: 25px
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
                .album_hole
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
            width: 38%
            height: calc(100% - 87px)
            margin-top: 25px
            font-family: "方正苏新诗柳楷简体"
            .name
                width: 100%
                text-align: center
                font-size: 20px
            .information
                display: flex
                justify-content: space-between
                font-size: 13px
                margin-top: 10px
                margin-right: 8px
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
                flex-grow: 1
                overflow: auto
                margin-top: 20px
                margin-right: -1px
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
                background-color: #aaa

</style>