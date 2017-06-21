<template>
  <div class="login-wrap" id="indexLizi">
    <div class="login-title">后台管理系统</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="login-container">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="account" class="icon-login icon-user">
        <el-input type="text" v-model="ruleForm.account" size="large" :maxlength="20" auto-complete="off" placeholder="用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass" class="icon-login icon-pass">
        <el-input type="password" v-model="ruleForm.checkPass" size="large" :maxlength="32" auto-complete="off" placeholder="登录密码"></el-input>
      </el-form-item>
      <!--<el-form-item prop="checkCode" class="icon-login icon-code">
          <el-input type="text" v-model="ruleForm.checkCode" @keyup.native.enter="handleSubmit" size="large" :maxlength="4" auto-complete="off" placeholder="验证码" ></el-input>
          <div class="login-code-img" @click="getCheckCode"><img :src="checkImg.ImgBase64" alt="验证码"></div>
        </el-form-item>-->
      <el-form-item style="width:100%;" class="login-btn">
        <el-button type="primary" size="large" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">{{logintext}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import THREE from '../common/js/three.min.js';
export default {
  data() {
    //用户名
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入您的登录账户名'))
      } else if (!/[A-Za-z0-9~!@#$%^&*()_+]{4,30}$/.test(value)) {
        callback(new Error('登录账户名格式不符'))
      } else {
        callback();
      }
    };
    //密码验证
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (!/^[A-Za-z0-9~!@#$%^&*()_+]{6,15}$/.test(value)) {
          callback(new Error('请输入6~15位字母、数字或字符组成的密码'));
        }
        if (this.addForm.Checkpass !== '') {
          this.$refs.addForm.validateField('Checkpass');
        }
        callback();
      }
    };
    //验证码
    var validateCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        if (!/^[A-Za-z0-9]{4}$/.test(value)) {
          callback(new Error('请正确输入4位验证码'));
        }
        callback();
      }
    };
    return {
      logining: false,
      logintext: "登录",
      ruleForm: {
        account: 'admin',
        checkPass: '123456',
        checkCode: ''
      },
      checkImg: {},
      rules: {
        account: [
          { required: true, validator: validateUserName, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '请输入6到15个密码', trigger: 'blur' }
        ],
        // checkCode: [
        //   { required: true, validator: validateCheck, trigger: 'blur' },
        // ]
      }
    };
  },
  methods: {
    handleReset() {
      this.$refs.ruleForm.resetFields();
    },
    handleSubmit() {
      var _this = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          _this.logining = true;
          _this.logintext = "正在登录...";
          setTimeout(function () {
            _this.logining = false;
            _this.logintext = "登录";
            _this.$message({
              message: '登录成功',
              type: 'success'
            });
            sessionStorage.setItem('BIGDATA_PLATFORM', JSON.stringify(_this.ruleForm));
            _this.$router.push({ path: '/' });
          }, 1000);
        } else {
          return false;
        }
      });
    },
    //3D
    liziInit () {
      var SCREEN_WIDTH = window.innerWidth;
      var SCREEN_HEIGHT = window.innerHeight;
      var SEPARATION = 90;
      var AMOUNTX = 50;
      var AMOUNTY = 50;
      var container;
      var particles, particle;
      var count;
      var camera;
      var scene;
      var renderer;
      var mouseX = 0;
      var mouseY = 0;
      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;
      init();
      this.interval = setInterval(loop, 2000 / 60);
      function init() {
        container = document.createElement( 'div' );
        container.style.position = 'absolute';
        container.style.top = '180px';
        container.style.zIndex = '0';
        document.getElementById('indexLizi').appendChild( container );
        camera = new THREE.Camera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
        camera.position.z = 1000;
        scene = new THREE.Scene();
        renderer = new THREE.CanvasRenderer();
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        particles = new Array();
        var i = 0;
        var material = new THREE.ParticleCircleMaterial( 0xffffff, .5 );
        for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
          for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
            particle = particles[ i ++ ] = new THREE.Particle( material );
            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
            scene.add( particle );
          }
        }
        count = 0;
        container.appendChild( renderer.domElement );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      }
      function onDocumentMouseMove( event ) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      }
      function onDocumentTouchStart( event ) {
        if ( event.touches.length == 1 ) {
          event.preventDefault();
          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          mouseY = event.touches[ 0 ].pageY - windowHalfY;
        }
      }
      function onDocumentTouchMove( event ) {
        if ( event.touches.length == 1 ) {
          event.preventDefault();
          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          mouseY = event.touches[ 0 ].pageY - windowHalfY;
        }
      }
      function loop() {
        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y = 364;
        var i = 0;
        for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
          for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
            particle = particles[ i++ ];
            particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
            particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;
          }
        }
        renderer.render( scene, camera );
        count += 0.1;
      }
    }
  },
  mounted:function(){
    if(window.innerWidth > 780){
      this.liziInit();
    }
  }
}

</script>

<style lang="scss">
.login-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #193c6d;
  background-image: linear-gradient(-135deg, #0c60d3, #5da2d7, #8bbaf4, #0c60d3);
  overflow: hidden;
}

.login-title {
  text-align: center;
  padding: 50px 20px 30px;
  font-size: 28px;
  font-weight: 700;
  text-shadow: 0 2px 2px rgba(0,0,0,.4);
  letter-spacing: 2px;
  color: #fff;
}

.login-container {
  border-radius: 5px;
  width: 400px;
  max-width: 90%;
  padding: 20px 30px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
  margin: 0 auto;
  position: relative;
  z-index: 10;
  .title {
    text-align: center;
    color: #666;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .icon-login {
    .el-input {
      .el-input__inner {
        padding-left: 40px;
      }
      &:before {
        font:normal normal normal 22px/30px FontAwesome;
        text-rendering:auto;
        -webkit-font-smoothing: antialiased;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 5px;
        left: 5px;
        text-align: center;
        color:#d7dce3;
      }
    }
    &.icon-user {
      .el-input {
        &:before {
          content: "\f2be";
        }
      }
    }
    &.icon-pass {
      .el-input {
        &:before {
          content: "\f023";
        }
      }
    }
    &.icon-code {
      .el-input {
        &:before {
          content: "\f132";
        }
      }
    }
  }
  .login-code-img {
    width: 86px;
    position: absolute;
    top: 5px;
    right: 5px;
    overflow: hidden;
    line-height: 0;
    cursor: pointer;
    img {
      width: 86px;
      height: 33.28px;
    }
  }
  @media (max-width: 480px){
    padding:10px;
    width:auto;
    background: none;
    box-shadow: none;
    .title{
      display: none;
    }
    .icon-login{
      .el-input{
        &:before{
          color:#e9eff5;
        }
        .el-input__inner{
          background: none;
          color:#eff5fb;
          border:none;
          border-bottom:1px solid #e9eff5;
          border-radius: 0;
          padding-left: 50px;
          &::-moz-placeholder { color: #ddd; }
          &::-webkit-input-placeholder { color:#ddd; }
          &:-ms-input-placeholder { color:#ddd; }
        }
      }
    }
    .login-btn{
      padding-top: 20px;
      .el-button--large{
        padding:15px;
        border-radius: 24px;
        background: #fff;
        border-color:#fff;
        color:#1d90e6;
      }
    }
  }
}
</style>