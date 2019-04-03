<template>
    <div class="songs">

        <div class="top_part">
            <img :src="page_url" class="page">
            <div class="information">
                <div class="name"> <div class="name_decra">歌单</div> {{name}} </div>
                <div class="creator">
                    <img :src="head_img_url" class="head_img">
                    <span class="creator_name"> {{creator_name}} </span>
                    <span class="date">于<span>{{date}}</span>创建</span>
                </div>
                <div class="tag">
                    标签: 
                    <span v-for="(item,index) in tag" :key="index">
                        <span>{{item}}</span> <i v-if="index !== (tag.length - 1)">|</i>
                    </span>
                </div>
                <div class="descript">简介: <span> {{descript}} </span></div>
            </div>
        </div>

        <div class="song_part">
            <div class="button">
                <div><i class="icon-play"></i>播放全部</div>
                <div><i class="icon-mark"></i>收藏歌单</div>
                </div>
            <ul class="songlist">
                <li class="nav_li">
                    <div class="index"></div>
                    <div class="do">操作</div>
                    <div class="song_name">歌名</div>
                    <div class="singer_album">歌手<span>|</span>专辑</div>
                    <div class="time">时长</div>
                </li>
                <li v-for="(item,index) in songs" :key="index"
                    @click="song_select(index)"
                    @dblclick="song_play(item)"
                    :class="{select_li: index === select_index}"
                >
                    <div class="index">{{index >= 9 ? index + 1 : "0" + (index+1)}}</div>
                    <div class="do">
                        <i class="icon-love_min"></i>
                        <i class="icon-download_min"></i>
                    </div>
                    <div class="song_name">{{item.name}}</div>
                    <div class="singer_album">
                        <span v-show="!singer_album_flag">{{item.album.name}}</span>
                        <span v-show="singer_album_flag" 
                              v-for="(singer,index) in item.singer" 
                              :key="index"
                        >
                            <span>{{singer.name}}</span> 
                            <span v-if="index !== (item.singer.length - 1)">|</span>
                        </span>
                    </div>
                    <div class="time">{{item.time.minute}}</div>
                </li>
            </ul>
        </div>

    </div>
</template>


<script>
    import {mapMutations} from "vuex";

    import {get_songs} from "api/common.js";

    import {class_song} from "common/js/class.js";
    export default {
        name: "Songs",

        data(){
            return {
                page_url: "",
                name: "",
                head_img_url: "",
                creator_name: "",
                date: "2016-08-17",
                tag: [],
                descript: "",
                
                songs: [],
                singer_album_flag: true,

                select_index: -1
            }
        },

        created(){
            this.songs_get();
        },

        computed: {

        },

        methods: {
            ...mapMutations([
                "set_full_flag",
                "set_play_song",
                "set_play_list"
            ]),

            songs_get(){

                get_songs("445553614").then((res)=>{

                    let data = res.data;
                    let code = data.code;
                    if(code === 200){
                        let playlist = data.playlist;
                        // console.log(playlist);
                        this.page_url = playlist.coverImgUrl;
                        this.name = playlist.name;

                        this.head_img_url = playlist.creator.avatarUrl;
                        this.creator_name = playlist.creator.nickname;
                        let date = new Date(playlist.createTime);
                        this.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                        this.tag = playlist.tags;
                        this.descript = playlist.description;

                        this.songs = playlist.tracks.map((val) => new class_song(val));
                    }

                });

            },

            song_select(index){
                this.select_index = index;
            },

            song_play(song){
                this.set_full_flag(true);
                this.set_play_song(song);
                // this.set_play_list(this.songs);
            },
        }
    }
</script>


<style lang="stylus" scoped>
    @import "~common/stylus/var.styl"
    .songs
        padding-top: 5px
        font-family: "方正苏新诗柳楷简体"
        .top_part
            display: flex
            margin-left: 30px
            .page
                height: 150px
                width: 150px
                box-shadow: 0 0 3px 0 #444
                border-radius: 3px
            .information
                flex: 1
                margin-left: 25px
                margin-right: 30px
                font-size: 15px
                .name
                    display: flex
                    align-items: center
                    font-size: 24px
                    .name_decra
                        color: $color-spec
                        font-size: 15px
                        line-height: 22px
                        padding: 0 5px
                        box-shadow: 0 0 2px 0
                        margin-right: 2px
                .creator
                    display: flex
                    align-items: center
                    margin-top: 15px
                    .head_img
                        width: 30px
                        height: 30px
                        border-radius: 50%
                        box-shadow: 0 0 1px 0 $color-spec
                        cursor: pointer
                    .creator_name
                        font-size: 17px
                        margin-left: 5px
                        color: $color-spec
                        cursor: pointer
                    .date
                        font-size: 14px
                        margin-left: 5px
                        
                .tag
                    margin-top: 14px
                    >span
                        >span
                            color: $color-spec
                            cursor: pointer
                        >i
                            font-style: normal
                            cursor: default
                    >span:nth-of-type(1)
                        margin-left: 5px
                .descript
                    margin-top: 14px
                    overflow: hidden
                    height: 32px
                    display: -webkit-box
                    -webkit-box-orient: vertical
                    -webkit-line-clamp: 2
                    text-overflow: ellipsis
                    >span
                        margin-left: 5px
                        color: $color-text-2
        
        .song_part
            font-size: 14px
            margin-top: 20px
            margin-left: 8px
            margin-bottom: 27px
            .button
                display: flex
                margin-left: 21px
                line-height: 30px
                >div
                    display: inline-flex
                    align-items: center
                    padding: 0 15px
                    margin-right: 25px
                    margin-bottom: 12px
                    //#e3c4a8
                    background: rgba(227,196,168,0.5)
                    border-radius: 4px
                    cursor: pointer
                    box-shadow: 0 0 1px 0 #e3c4a8
                    >i
                        margin-right: 3px
                    .icon-mark
                        font-size: 15px    
            .songlist
                >li:nth-of-type(2n-1)
                    background: rgba(150,150,150,0.01)
                >li:nth-of-type(2n)
                    background: rgba(150,150,150,0.07)
                >li:hover
                    background: rgba(150,150,150,0.2)
                >li
                    display: flex
                    line-height: 27px
                    &.nav_li
                        background: rgba(150,150,150,0.01)
                        .time
                            font-size: inherit
                    &.select_li
                        background: rgba(150,150,150,0.2)
                    >div
                        box-sizing: border-box
                        white-space: nowrap
                        text-overflow: ellipsis
                        overflow: hidden
                        cursor: default
                    .index
                        font-size: 13px
                        width: 37px
                        text-align: right
                        margin-right: 10px
                    .do
                        display: flex
                        align-items: center
                        width: 55px
                        padding-left: 10px
                        >i
                            cursor: pointer
                        .icon-love_min
                            font-size: 14px
                            margin-right: 8px
                        .icon-download_min
                            margin-top: -1px   
                    .song_name
                        padding-left: 20px
                        padding-right: 145px
                        flex: 1
                    .singer_album
                        width: 27%
                        padding-right: 20px
                    .time
                        font-size: 13px
                        width: 65px




</style>
