<template>
    <div class="progress_bar">
        <div class="time_now">01:19</div>
        <div class="bar">
            <div class="pan">
                <svg><circle cx="50%" cy="50%" r="2"/></svg>
            </div>
        </div>
        <div class="time_total">03:50</div>
    </div>    
</template>

<script>
    export default {
        name: "ProgressBar",
    }
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/var.styl"
    .progress_bar
        display: flex
        align-items: center
        font-family: "方正苏新诗柳楷简体"
        .time_now,.time_total
            font-size: 12px
            margin: 0 8px
        .bar
            display: flex
            align-items: center
            position: relative
            flex: 1
            height: 5px
            border-radius: 4px
            background: rgba(103,170,209,0.3)
            .pan
                position: absolute
                left: 0
                width: 13px
                height: 13px
                border-radius: 40%
                background: $color-text
                >svg
                    display: flex
                    position: absolute
                    width: 13px
                    height: 13px
                    circle
                        fill: $color-spec
            
        

</style>


