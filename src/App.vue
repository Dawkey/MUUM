<template>
    <div id="app">
        <top-bar></top-bar>
        <div class="router">
            <router-view/>
        </div>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
    import TopBar from "components/TopBar.vue";
    import BottomBar from "components/BottomBar.vue";

    export default{
        name: "App",
        components: {TopBar,BottomBar}
    }

</script>

<style lang="stylus">
    @import "~common/stylus/var.styl"

    .router
        margin-top: 30px
        height: calc(100% - 30px)
        background-color: $color-back

</style>
