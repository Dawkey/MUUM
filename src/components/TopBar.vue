<template>
    <div class="top_bar">
        <div class="left-icon">
            <i class="icon-route_back"></i>
        </div>
        <div class="right-icon">
            <i class="icon-min"></i>
            <i class="icon-close"></i>
        </div>
    </div>
</template>


<script>
    export default{
        name: "TopBar"
    }
</script>


<style scoped lang="stylus">

    @import "~common/stylus/var.styl"

    .top_bar
        position: absolute
        top: 0
        left: 0
        display: flex
        align-items: center 
        justify-content: center
        background: $color-back
        color: $color-spec
        width: 100%
        height: 30px
        font-size: 22px
        .left-icon
            position: absolute
            left: 8px
            font-size: 14px
            >i
                cursor: pointer
        .right-icon
            position: absolute
            right: 0
            font-size: 18px
            margin-right: 8px
            >i
                cursor: pointer
            .icon-min
                margin-right: 8px

</style>