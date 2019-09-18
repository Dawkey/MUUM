<template>   
    <div class="login">
        <div class="login_title">请登录网易云账号</div>
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
            <!-- <div>登录方式</div>
            <div>
                <div>手机</div>
                <div>邮箱</div>
            </div>             -->
        </div>
    </div>
</template>


<script>
</script>


<style lang="stylus" scoped>
    @import "~common/stylus/var.styl"
    
    .login
        position: relative        
        font-size: 14px
        font-family: "方正苏新诗柳楷简体"

        .login_title
            position: absolute
            top: 50px
            left: 50%
            font-size: 20px
            transform: translateX(-50%)            
        .input_box
            position: absolute
            left: 95px
            top: 170px
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
                margin-top: 35px        
            .login_button
                display: inline-block
                margin-left: 100px
                margin-top: 40px
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