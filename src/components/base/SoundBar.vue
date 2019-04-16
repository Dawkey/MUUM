<template>

    <div class="sound_bar" ref="bar" @click="bar_click">
        <div class="sound_bar_contain">
            <div class="volume_bar" :style="{width: bar_left}"></div>
            <div class="pan" ref="pan" :style="{left: bar_left}" :class="{show: drag_flag}" 
                @click.stop="pan_click"
                @mousedown="pan_down" >
                <svg>
                    <circle cx="50%" cy="50%" r="2"/>
                </svg>
            </div>
        </div>
                    
    </div>    

</template>


<script>
    import {throttle} from "common/js/tool.js";

    export default {
        name: "SoundBar",


        created(){
            this.bar_left = this.init_volume * this.bar_max_width + "px";
        },


        mounted(){
            document.addEventListener("mousemove",throttle(this.pan_move,30));

            document.addEventListener("mouseup",this.pan_up);            
        },


        data(){
            return {
                bar_left: "0px",
                bar_max_width: 50,
                drag_flag: false,
                drag_x: 0
            }
        },


        props: {
            init_volume: {
                type: Number,
                default: 0.1
            }
        },


        watch: {
            
        },


        methods: {
            bar_click(e){
                let precent = e.offsetX / this.bar_max_width;
                precent = precent > 1 ? 1 : precent;

                this.$emit("change_volume",precent);
                this.bar_left = e.offsetX + "px";      
            },

            pan_click(){
                return;
            },

            pan_down(e){
                this.drag_flag = true;
                let str = this.bar_left;
                this.drag_x = e.clientX - Number(str.substr(0,str.length - 2));
            },

            pan_move(e){
                if(this.drag_flag === true){
                    let left = (e.clientX - this.drag_x);
                    if(left < 0) left = 0;
                    if(left > this.bar_max_width) left = this.bar_max_width;

                    let precent = left / this.bar_max_width;
                    this.$emit("change_volume",precent);
                    this.bar_left = left + "px";
                }
            },

            pan_up(){
                if(this.drag_flag === true){
                    this.drag_flag = false;
                }
            }
        },

    }
</script>


<style lang="stylus" scoped>
    @import "~common/stylus/var.styl"
    
    .sound_bar
        display: flex
        align-items: center        
        height: 13px
        width: 50px
        opacity: 0.8
        &:hover
            .sound_bar_contain
                .pan
                    display: block
        .sound_bar_contain
            position: relative
            display: flex
            align-items: center
            height: 4px
            width: 100%
            border-radius: 4px
            // background: $color-spec-o
            background: rgba(150,150,150,0.15)
            .volume_bar
                position: absolute
                left: 0
                height: 100%
                width: 0px
                border-radius: 4px
                background: $color-spec
            .pan
                display: none
                position: absolute
                left: 0px
                transform: translateX(-50%)
                width: 11px
                height: 11px
                border-radius: 50%
                background: rgb(100,100,100)
                cursor: pointer
                >svg
                    position: absolute
                    width: 11px
                    height: 11px
                    circle
                        fill: $color-spec
                &.show
                    display: block

</style>

