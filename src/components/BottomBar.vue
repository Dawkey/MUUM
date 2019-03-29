<template>
    <div class="bottom_bar">
        <i class="icon-pre"></i>
        <i class="icon-play"></i>
        <i class="icon-next"></i>
    </div>    
</template>

<script>
    export default {
        name: "BottomBar"
    }
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/var.styl"
    
    .bottom_bar
        position: absolute
        display: flex
        z-index: 11
        align-items: center
        width: 100%
        height: 40px
        bottom: 0
        box-shadow: 0 -1px 1px -1px $color-spec
        font-size: 22px
        i
            margin-left: 10px
            cursor: pointer
        .icon-pre
            margin-left: 15px
        .icon-play,.icon-pause
            font-size: 26px

</style>
