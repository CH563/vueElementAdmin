<template>
  <el-row class="container">
    <el-col :span="24" class="header">
			<el-col :span="16">
				<h1 class="logo"><router-link to="home">{{sysName}}</router-link></h1>
				<div class="tools" @click.prevent="collapse" :class="collapsed?'open':'close'">
					<span></span>
				</div>
			</el-col>
			<el-col :span="8" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><i class="fa fa-user-circle" aria-hidden="true"></i>{{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的账号</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
    <el-col :span="24" class="main" :class="collapsed?'show':''">
      <div class="overly" @click.prevent="collapse"></div>
      <aside class="content-sider">
				<!--导航菜单-->
				<el-menu :default-active="navActive" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router>
					<template v-for="(item,index) in menuList">
						<el-submenu :index="index+''">
							<template slot="title"><i class="fa" :class="item.iconCls" aria-hidden="true"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.url" :key="child.url">{{child.name}}</el-menu-item>
						</el-submenu>
					</template>
				</el-menu>
			</aside>
      <div class="content-title"><!-- 行为事件分析<i class="el-icon-arrow-right"></i> --><router-link :to="navActive" v-if="this.$route.path.split('/').length > 2" class="toBack"><i class="el-icon-arrow-left"></i>返回</router-link>{{$route.name}}</div>
      <section class="content-container">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
			</section>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
			return {
				sysName:'后台管理系统',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
        menuList: [
          {
            name: '导航一',
            url: '/01',
            iconCls: 'fa-tachometer',
            children: [
              {
                name: '表格',
                url: '/02'
              }
            ]
          },
          {
            name: 'Form',
            url: '/03',
            iconCls: 'fa-sitemap',
            children: [
              {
                name: '表单',
                url: '/form'
              }
            ]
          },
          {
            name: 'Charts',
            url: '/10',
            iconCls: 'fa-bar-chart',
            children:[
              {
                name: '图表',
                url: '/chart'
              }
            ]
          }
        ]
			}
		},
    computed: {
      navActive: function(){
        return '/' + this.$route.path.split('/')[1]
      }
    },
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('BIGDATA_PLATFORM');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			var user = sessionStorage.getItem('BIGDATA_PLATFORM');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.account || '';;
			}
		}
  }
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background-color: #2b83f9;
      background-image: linear-gradient(143deg,#2945cb 20%,#2b83f9 81%,#3a9dff);
      color:#fff;
      .userinfo {
        padding-right: 30px;
        padding-top: 5px;
        line-height: 50px;
        text-align: right;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          i{
            margin-right: 5px;
          }
        }
        @media (max-width: 480px){
          padding-right: 15px;
        }
      }
      .logo {
        height:60px;
        font-size: 22px;
        padding: 0 10px 0 20px;
        white-space: nowrap;
        display: block;
        float:left;
        a{
          color:#fff;
          &:hover{
            text-decoration: none;
          }
        }
        @media (max-width: 750px){
          font-size: 18px;
        }
        @media (max-width: 480px){
          font-size: 16px;
          padding:0 5px 0 15px;
        }
      }
      .tools{
        padding: 0px 5px;
        width:40px;
        height: 60px;
        line-height: 60px;
        display: none;
        float:left;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        @media (max-width: 750px){
          display: block;
        }
        &:after,&:before,span{
          display: block;
          content: "";
          width:24px;
          height: 3px;
          border-radius: 2px;
          background: #fff;
          position: absolute;
          left:50%;
          margin-left: -12px;
          transition: all .3s;
        }
        &:before{
          top:20px;
        }
        span{
          top:28px;
        }
        &:after{
          top:36px;
        }
        &.open{
          span{
            opacity: 0;
          }
          &:before{
            transform: rotate(45deg);
            top:50%;
          }
          &:after{
            transform: rotate(-45deg);
            top:50%;
          }
        }
      }
    }
    .main {
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      .content-sider {
        width: 200px;
        position: absolute;
        top:0;
        left:0;
        height: 100%;
        background: #fff;
        border-right:1px solid #d7dde4;
        padding:15px 0;
        transition: left .3s;
        overflow-x: hidden;
        overflow-y: auto;
        @media (max-width: 750px){
          left: -200px;
        }
        .el-menu{
          background: none;
          i{
            margin-right: 8px;
            font-size: 13px;
          }
          &.el-submenu{
            .el-menu{
              background: none;
            }
          }
        }
      }
      .content-title{
        position: absolute;
        border-bottom:1px solid #dfe4e9;
        height: 40px;
        left:200px;
        right:0;
        padding:0 20px;
        font-size: 14px;
        line-height: 40px;
        color:#657180;
        z-index: 10;
        i{
          font-size:12px;
          color:#999;
          margin:0 3px;
          transform: scale(.8);
        }
        @media (max-width: 750px){
          left: 0;
        }
      }
      .toBack{
        display: inline-block;
        margin-right: 10px;
        background: #ffa800;
        line-height: 24px;
        padding:0 8px 0 2px;
        border-radius: 3px;
        font-size: 12px;
        color:#fff;
        i{
          color:#fff;
        }
        &:hover{
          text-decoration: none;
          background: #ffba36;
        }
      }
      .content-container {
        position: absolute;
        top:40px;
        left:200px;
        right:0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 20px;
        transition: left .3s;
        @media (max-width: 750px){
          left: 0;
        }
        .breadcrumb-container {
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
      .overly{
        display: none;
        position: absolute;
        width:100%;
        height: 100%;
        z-index: 15;
        background: #000;
        opacity: .5;
      }
      @media (max-width: 750px){
        &.show{
          display: block;
          .overly{
            display: block;
            z-index: 999;
          }
          .content-sider{
            left:0;
              z-index: 9999;
          }
          .content-container,.content-title{
            z-index: 10;
          }
        }
      }
    }
  }
</style>