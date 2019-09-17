<template>   
    <div class="login">
        <div class="input_box">
            <div class="account">
                <label>电话：</label>
                <input type="text">
            </div>
            <div class="password">
                <label>密码：</label>
                <input type="password">
            </div>
            <div class="login_button">登录</div>            
        </div>        
        <div class="login_ways">                
        </div>
    </div>
</template>


<script>
</script>


<style lang="stylus" scoped>
    @import "~common/stylus/var.styl"
    
    .login
        position: absolute
        top: 50%
        left: 90px
        transform: translateY(-50%)
        font-size: 14px
        font-family: "方正苏新诗柳楷简体"
        display: flex
        align-items: center

        .input_box
            input
                background: transparent
                border: none
                color: $color-text
                padding: 1px 4px
                box-shadow: 0 2px 2px -2px $color-text
                width: 175px
                font-family: "方正苏新诗柳楷简体"
                &:focus
                    outline: none
            .password
                margin-top: 25px        
            .login_button
                display: inline-block
                margin-left: 100px
                margin-top: 30px
                font-size: 18px
                height: 25px
                line-height: 25px                
                padding: 0 10px
                color: $color-text            
                background: $color-button
                cursor: pointer
                &:hover
                    background: $color-button-a
                    color: $color-spec
</style>