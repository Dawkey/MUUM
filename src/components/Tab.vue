<template>
    <div class="tab">        
        <router-link class="reco_song" to="/songs" tag="div">推荐歌单</router-link>
        <div class="person_fm">私人<span>FM</span></div>
        <div class="person_song">我的歌单</div>
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
        position: absolute
        top: 50%
        left: -84px  
        transform: translateY(-75%)
        font-size: 16px
        font-family: "方正苏新诗柳楷简体"
        z-index: 10
        padding: 4px 0
        padding-right: 2px     
        // opacity: 0.4   
        &:before,&:after
            left: 84px
        &:before
            content: ""
            position: absolute
            z-index: 11
            top: 0            
            width: 5px
            height: 100%
            background: $color-back
        &:after
            content: ""
            position: absolute
            z-index: 12
            top: 0            
            width: 5px
            height: 100%
            background: $color-spec-o
        >div
            position: relative
            z-index: 10
            padding: 4px
            padding-left: 9px
            letter-spacing: 3px
            line-height: 20px
            border-radius: 2px
            box-shadow: 0 0 1px 1px $color-spec-o
            cursor: pointer
            border-right: 4px solid
            background: $color-back
            margin-bottom: 12px            
        .reco_song
            color: #ee4266
            // transform: translateX(84px)
        .person_fm
            color: #5893d4
            >span
                margin-left: 3px
                letter-spacing: 7px
        .person_song
            color: #5dc0a6
            margin-bottom: 0
                
</style>

