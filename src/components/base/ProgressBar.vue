<template>
    <div class="progress_bar">
        <div class="time_now">{{time_now}}</div>
        <div class="bar" @click="bar_click" ref="bar">
            <div class="buffer_bar" 
                :style="{width: buffer_width}"
                :class="{trans_flag: buffer_precent === 0}"
            ></div>
            <div class="play_bar" :style="{width: bar_left}"></div>
            <div class="pan" :style="{left: bar_left}" ref="pan"
                @click.stop="pan_click"
                @mousedown="pan_down"
            >
                <svg>
                    <circle cx="50%" cy="50%" r="2" :class="{loading: loading_flag}"/>
                </svg>
            </div>
        </div>
        <div class="time_total">{{time_total}}</div>
    </div>    
</template>



<script>
    export default {
        name: "ProgressBar",


        data(){
            return {
                time_now: "00:00",
                time_total: "00:00",
                total_width: 0,
                bar_left: "0px",
                drag_flag: false,
                drag_x: 0
            }
        },


        props: {
            current_time: {
                type: Number,
                default: 0
            },
            total_time: {
                type: Number,
                default: 0
            },
            audio_ready: {
                type: Boolean,
                default: false
            },
            buffer_precent: {
                type: Number,
                default: 0
            },
            loading_flag: {
                type: Boolean,
                default: false
            }
        },


        mounted(){
            document.addEventListener("mousemove",(e)=>{
                if(this.drag_flag === true){
                    this.bar_left = (e.clientX - this.drag_x) + "px";
                }
            });

            document.addEventListener("mouseup",()=>{
                this.drag_flag = false;
                console.log("up");
            });            
        },


        computed: {
            buffer_width(){
                return (this.buffer_precent * 100) + "%";
            }
        },


        methods: {
            time_minute(time){
                let minute = parseInt(time/60);
                let second = parseInt(time%60);
                let str_minute = minute < 10 ? ("0"+minute) : minute;
                let str_second = second < 10 ? ("0"+second) : second;
                return str_minute + ":" + str_second;
            },

            bar_click(e){
                if(!this.audio_ready){
                    return;
                }

                let precent = e.offsetX / this.$refs.bar.clientWidth;
                precent = precent > 1 ? 1 : precent;

                let current_time = this.total_time * precent;
                this.bar_left = e.offsetX + "px";
                this.$emit("change_time",current_time);
            },

            pan_click(){
                return;
            },

            pan_down(e){
                this.drag_flag = true;
                let str = this.$refs.pan.style.left;
                this.drag_x = e.clientX - Number(str.substr(0,str.length - 2));
            },
        },


        watch: {
            current_time(){
                let time_now = this.time_minute(this.current_time);
                if(time_now !== this.time_now){
                    this.time_now = time_now;
                    let precent = Math.floor(this.current_time) / this.total_time;
                    this.bar_left = precent * this.$refs.bar.clientWidth + "px";
                }
            },

            total_time(){
                this.time_total = this.time_minute(this.total_time);
            }
        }
    }
</script>



<style lang="stylus" scoped>
    @import "~common/stylus/var.styl"


    @keyframes loading
        0%
            opacity: 1
        100%
            opacity: 0.1


    .progress_bar
        display: flex
        align-items: center
        font-family: "方正苏新诗柳楷简体"
        .time_now,.time_total
            font-size: 12px
            margin: 0 12px
        .bar
            display: flex
            align-items: center
            position: relative
            flex: 1
            height: 5px
            border-radius: 4px
            background: rgba(50,50,50,0.07)
            .buffer_bar
                position: absolute
                left: 0
                height: 100%
                width: 0%
                border-radius: 4px
                background: $color-back
                transition: width 500ms
                &.trans_flag
                    transition: none
                &:before
                    content: ""
                    position: absolute
                    width: 100%
                    height: 100%
                    background: $color-spec-o
            .play_bar
                position: absolute
                left: 0
                height: 100%
                width: 0%
                border-radius: 4px
                background: $color-spec
            .pan
                position: absolute
                left: 0px
                transform: translateX(-50%)
                width: 13px
                height: 13px
                border-radius: 43%
                background: $color-text
                >svg
                    position: absolute
                    width: 13px
                    height: 13px
                    circle
                        fill: $color-spec
                        &.loading
                            animation: loading 0.5s ease-in-out infinite
            
        

</style>


