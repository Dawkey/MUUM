<template>
    <div class="tab">
        <router-link class="reco_song" to="/songs" tag="div">推荐<br/>歌单</router-link>
        <div class="person_fm">私人<br/><span>FM</span></div>
        <div class="person_song">我的<br/>歌单</div>
    </div>
</template>

<script>
    export default {
        name: "Tab"
    }
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/var.styl"
    .tab
        display: flex
        display: none
        position: absolute
        top: 30px
        left: 50%
        transform: translateX(-50%)
        font-size: 16px
        font-family: "方正苏新诗柳楷简体"
        padding-left: 10px
        z-index: 10
        margin-top: 14px
        >div
            padding: 4px
            margin-right: 10px
            letter-spacing: 3px
            line-height: 20px
            border-radius: 2px
            box-shadow: 0 0 3px 0 #777            
            cursor: pointer
            border-top: 8px solid
            background: $color-back
        .reco_song
            color: #ee4266
        .person_fm
            color: #5893d4
            >span
                margin-left: 3px
                letter-spacing: 7px
        .person_song
            color: #5dc0a6
                
</style>

