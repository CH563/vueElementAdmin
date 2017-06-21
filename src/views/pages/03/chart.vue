<template>
  <div>
    <div class="cont-title">
      <h4>{{formEvent}}</h4>
      <el-button type="primary" size="small" v-if="!onfocus" @click="onfocus = true">关注事件</el-button>
      <el-button type="danger" size="small" v-if="onfocus" @click="onfocus = false">取消关注</el-button>
      <el-tooltip effect="light" placement="bottom-start" class="title-tip">
        <div slot="content">
          <div class="tip-cont">
            <p>参考值：指定时间段内，每天相应时刻点的数据的平均值。</p>
          </div>
        </div>
        <i class="fa fa-question-circle" aria-hidden="true"></i>
      </el-tooltip>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-col class="col-width">
        <el-form-item label="用户群">
          <el-select v-model="form.version" placeholder="请选用户群" @change="updata">
            <el-option label="所有用户" value="all"></el-option>
            <el-option label="年轻人" value="1.0"></el-option>
            <el-option label="中年人" value="2.0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="col-width">
        <el-form-item label="系统">
          <el-select v-model="form.system" placeholder="请选系统" @change="updata">
            <el-option label="所有系统" value="all"></el-option>
            <el-option label="IOS" value="ios"></el-option>
            <el-option label="Android" value="android"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="col-float">
        <el-form-item label="参考值">
          <el-col class="col-sigle">
            <el-select v-model="form.date" placeholder="请选时间" @change="updata">
              <el-option label="自动" value="auto"></el-option>
              <el-option label="工作日" value="workDay"></el-option>
            </el-select>
          </el-col>
          <el-col class="col-sigle">
            <el-select v-model="form.day" placeholder="请选时间" @change="updata">
              <el-option label="近7天" value="7"></el-option>
              <el-option label="近30天" value="30"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="cont-scroll">
      <!-- 图表st -->
      <div class="cont-chart" id="chartLine"></div>
      <!-- 图表en -->
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        form: {
          version: '年轻人',
          system: 'ios',
          date: 'workDay',
          day: '7'
        },
        chartLine: null,
        chartLine01: null,
        chartLine02: null,
        dialogEvent: false,
        formEvent: '时段分布',
        formLabelWidth: '120px',
        onfocus: false,
        nfa: 200
      };
    },
    computed: {
      timeLine: function(){
        let arr =[];
        for(let i=1; i<=24; i++){
          arr.push(parseInt(i+":00"));
        }
        return arr;
      },
      realData: function(){
        let arr =[];
        for(let i=1; i<=24; i++){
          arr.push(parseInt(Math.floor(800 + Math.random() * this.nfa)))
        }
        return arr;
      },
      addData: function(){
        return this.realData.map(e=>parseInt(e*parseInt(Math.random()*5+1)));
      },
      reduceData: function(){
        return this.realData.map(e=>parseInt(e*parseInt(Math.random()*2+1)))
      }
    },
    methods: {
      creatLine: function(item,id){
        var _this = this;
        //基于准备好的dom，初始化echarts实例
        item = echarts.init(document.getElementById(id));
        item.setOption({
            title: {
              show: false,
              text: ''
            },
            tooltip: {
              trigger: 'axis',
              backgroundColor: '#ffffff',
              borderColor: '#d7dde4',
              borderWidth: '1',
              padding: [5,10],
              textStyle: {
                color: '#666',
                fontSize: '12'
              }
            },
            legend: {
              data: ['今日', '-10%', '+10%'],
              left: 20
            },
            grid: {
              show: false,
              left: '20',
              right: '20',
              bottom: '20',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              max: 'dataMax',
              min: 'dataMax',
              axisLine: {
                lineStyle: {
                  color: '#7f8b9c'
                }
              },
              data: _this.timeLine
            },
            yAxis: {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#7f8b9c'
                }
              }
            },
            series: [
              {
                name: '今日',
                type: 'line',
                stack: null,
                smooth: true,
                showSymbol: false,
                data: _this.realData
              },
              {
                name: '-10%',
                type: 'line',
                stack: null,
                smooth: true,
                showSymbol: false,
                data: _this.reduceData
              },
              {
                name: '+10%',
                type: 'line',
                stack: null,
                smooth: true,
                showSymbol: false,
                data: _this.addData
              }
            ]
        });
      },
      updata: function(){
        this.nfa = parseInt(Math.floor(200 + Math.random() * 100));
        this.creatLine(this.chartLine, 'chartLine');
      },
      selectEvent: function(){
        this.dialogEvent = true;
        setTimeout(function(){
          document.querySelector('.select-event').style.maxHeight = window.innerHeight - 200 -window.innerHeight*0.15 +  'px';
        })
      },
      refurEvent: function(){
        this.dialogEvent = false;
        this.updata();
      },
      toDetail: function(){
        this.$router.push('/commerce/detail')
      }
    },
    mounted: function(){
      var _this = this;
      this.creatLine(this.chartLine, 'chartLine');
      window.onresize= function(){
        if(document.querySelector('.cont-chart').offsetWidth > 1200){
          _this.chartLine=echarts.init(document.getElementById('chartLine'));
          _this.chartLine.resize();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import 'css';
</style>