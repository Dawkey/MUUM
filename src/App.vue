<template>
    <div id="app">
        <top-bar></top-bar>
        <tab></tab>
        <div class="router">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
        <player></player>
    </div>
</template>

<script>
    import TopBar from "components/TopBar.vue";
    import Tab from "components/Tab.vue";
    import Player from "components/Player.vue";

    export default{
        name: "App",
        components: {TopBar,Tab,Player}
    }

</script>

<style lang="stylus">
    @import "~common/stylus/var.styl"

    .router
        margin-top: 30px
        height: calc(100% - 75px)
        background-color: $color-back
        overflow-x: hidden
        overflow-y: auto
    ::-webkit-scrollbar
        width: 8px
        background-color: transparent
    ::-webkit-scrollbar-track
        display: none
    ::-webkit-scrollbar-thumb
        border-radius: 8px
        background-color: rgba(103,170,209,0.3)

</style>
