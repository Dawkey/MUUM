<template>
    <div class="Music_move">
        <svg :width="width" :height="height">
            <polygon :points="points"></polygon>
        </svg>        
    </div>
</template>

<script>
    export default {
        name: "MusicMove",

        data(){
            return {
                width: 280,
                height: 280,

                radius_num: 256,
                min_radius: 120,
                radius_items: [],
                points: "",

                analyser: null,
                analyser_array: [],
                play_flag: true,
                wave_timer: null,                
            }
        },

        methods: {

            //把半径转化为相应x,y坐标
            to_coordinate(radius,index,total){
                let angle = Math.PI*2/total*index;
                let x = Math.sin(angle)*radius + svg_x;
                let y = -Math.cos(angle)*radius + svg_y;
                return x + "," + y;

            },
            
            to_points(radius_items){
                let coordinate_items = radius_items.map(function(radius,index){
                    let total = radius_items.length;
                    return this.to_coordinate(radius,index,total);
                });
                return coordinate_items.join(" ");
            },



        }
    }
</script>

<style lang="stylus" scoped>

</style>
