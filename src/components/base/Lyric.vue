<template>
    <div class="lyric" ref="lyric" @scroll="scroll">
        <ul class="lyric_body">
            <li ref="lyric_li" v-for="(item,temp_index) in lyric" :key="temp_index" v-html="item.text" 
                :class="{active: temp_index === index}"
            ></li>
        </ul>
    </div>    
</template>


<script>
    import {TweenLite} from "gsap";

    export default {
        name: "lyric",


        data(){
            return{
                index: -1,
                timer: null,

                scroll_timer: null,
                is_scroll: false
            }
        },


        props: {
            lyric: {
                type: Array,
                default: []
            },
            
            lyric_flag: {
                type: Boolean,
                default: false
            },

            bar_is_move: {
                type: Boolean,
                default: false
            },

            play_flag: {
                type: Boolean,
                default: false
            },

            audio_ready: {
                type: Boolean,
                default: false
            },

            audio: null
        },


        watch: {
            //进行每次切歌时的初始操作。
            lyric(){
                //暂停状态下，切歌的处理。
                if(this.lyric.length === 0){
                    this.index = -1;
                }else{
                    //在歌词加载比音频慢的情况下的处理。
                    if(this.audio_ready && this.play_flag){
                        this.reset_index();
                        this.start();
                    }
                }
            },

            lyric_flag(){
                if(this.lyric_flag === false){
                    clearTimeout(this.timer);
                    this.reset_index();
                }else{
                    this.start();
                }
            },

            bar_is_move(){
                if(this.play_flag === false){
                    this.reset_index();
                }
            },

            index(){
                if(!this.is_scroll){
                    this.lyric_move();
                }
            }
        },


        methods: {
            start(){
                if(!this.lyric.length) return;

                let index = this.index + 1;
                let lyric = this.lyric;
                if(!lyric[index]) return;

                let time = lyric[index].time - this.audio.currentTime * 1000;
                this.timer = setTimeout(()=>{
                    this.index = this.index + 1;
                    this.start();
                },time);
            },

            reset_index(){
                if(!this.lyric.length) return;

                let time = this.audio.currentTime * 1000;
                let lyric = this.lyric;

                if(time > lyric[lyric.length - 1].time){
                    this.index = lyric.length - 1;
                    return;
                }
                for(let i=0; i<lyric.length; i++){
                    if(lyric[i].time > time){
                        this.index = i - 1;
                        break;
                    }
                }
            },

            lyric_move(){
                if(this.$refs.lyric_li && this.$refs.lyric_li[this.index]){
                    let lyric = this.$refs.lyric;
                    let lyric_li = this.$refs.lyric_li[this.index];

                    let half_height = lyric.clientHeight/2;
                    let move_y = lyric_li.offsetTop + lyric_li.clientHeight/2;

                    let scroll_top = move_y - half_height;
                    TweenLite.to(lyric,0.4,{scrollTop: scroll_top});
                }
            },

            scroll(){
                clearTimeout(this.scroll_timer);
                this.is_scroll = true;
                this.scroll_timer = setTimeout(()=>{
                    this.is_scroll = false;
                },1000);
            }
        }
        


    }
</script>


<style lang="stylus" scoped>
    @import "~common/stylus/var.styl"
    .lyric
        position: relative
        overflow: auto
        .lyric_body
            position: absolute
            font-size: 13.5px
            color: $color-text-2
            line-height: 18px
            >li
                min-height: 13px
                margin-top: 13px
                &.active
                    color: $color-spec
            >li:nth-of-type(1)
                margin-top: 0
    ::-webkit-scrollbar
        width: 6px
        background-color: transparent
    ::-webkit-scrollbar-track
        display: none
    ::-webkit-scrollbar-thumb
        border-radius: 10px
        background-color: $color-spec-o

</style>
