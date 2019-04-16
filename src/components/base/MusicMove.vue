<template>
    <div class="music_move">
         <svg :width="max_radius * 2" :height="max_radius * 2">
             <polygon :points="points"></polygon>
         </svg>
    </div>
</template>

<script>
    import {TweenLite} from "gsap";
    export default {

        name: "MusicMove",


        data(){
            return {
                analyser_array: [],
                wave_timer: null,

                radius_items: [],
                radius_nums: 512,
                min_radius: 105,
                max_radius: 140,
                points: [],
            }
        },


        props: ["analyser","analyser_flag"],


        created(){
            this.radius_items = Array(this.radius_nums).fill(this.min_radius);
            this.points = this.to_points(this.radius_items);
        },


        watch: {
            analyser_flag(){
                if(this.analyser_flag === false){
                    this.analyser.fftSize = this.radius_nums;
                    this.analyser_array = new Uint8Array(this.analyser.frequencyBinCount);
                    this.wave_wave();
                }
            }
        },


        methods: {

            //把半径转化为相应x,y坐标
            to_coordinate(radius,index,total){
                let angle = Math.PI*2/total*index;
                let x = Math.sin(angle)*radius + this.max_radius;
                let y = -Math.cos(angle)*radius + this.max_radius;
                return x + "," + y;

            },
            
            to_points(radius_items){
                let coordinate_items = radius_items.map((radius,index)=>{
                    let total = radius_items.length;
                    return this.to_coordinate(radius,index,total);
                });
                return coordinate_items.join(" ");
            },

            wave_wave(){
                this.wave_timer = setTimeout(()=>{
                    if(this.analyser){
                        this.analyser.getByteTimeDomainData(this.analyser_array);
                    }
                    this.wave_wave();
                    this.wave_change();
                },120);
            },               

            wave_change(){
                let flag = true;
                for(let i=0; i<this.radius_nums; i++){
                    let item;
                    if(i >= this.radius_nums/2){
                        item = 115 + (this.analyser_array[this.radius_nums - 1 - i] - 128) * 4;
                    }else{
                        item = 115 + (this.analyser_array[i] - 128) * 4;
                    }

                    if(item < 105){
                        item = 105;
                    }

                    if(item > 140){
                        item = 140
                    }

                    this.radius_items[i] = item;
                    this.radius_items[i + 1] = item;
                    this.radius_items[i + 2] = item;
                    this.radius_items[i + 3] = item;
                    this.radius_items[i + 4] = item;
                    i = i+4;
                }
                // console.log(this.radius_items);
                TweenLite.to(this.$data,160/1000,{points: this.to_points(this.radius_items)});
            },

        }
    }


</script>

<style lang="stylus" scoped>
    @import "~common/stylus/var.styl"

    .music_move
        position: absolute
        width: 280px
        height: 280px
        >svg
            >polygon
                fill: $color-move

</style>
