<template>
  <div style="width: 80%;height: 90%;display: flex;flex-direction: column;align-items: center">
    <div style="min-width: 8%;width: 60%;display: inline-flex;user-select: none;" title="磁盘使用">
      <div style="font-size: 2px;display: inline-flex;width: 100%">
        <div class="disk_progress_left_text" style="text-align: right;line-height: 14px;color: #0099CC;">
          {{ progressFlexState.progress_text1 }}
        </div>
        <div style="flex: 4;display: inline-flex;">
          <div class="cprogress" title="磁盘已使用" style="background: #f56c6c;border-radius: 5px 0 0 5px"
               :style="{ flex: progressFlexState.progress_flex1}"/>
          <div class="cprogress" title="磁盘未使用" style="background: #5cb87a;border-radius: 0 5px 5px 0"
               :style="{ flex: progressFlexState.progress_flex2}"/>
        </div>
        <div class="disk_progress_right_text" style="text-align: left;line-height: 14px;color: #0099CC;">
          {{ progressFlexState.progress_text2 }}
        </div>
      </div>
    </div>
    <!--      <dv-water-level-pond class="mem_round" :config="memConfig" title="内存使用"/>-->
    <bv-liquid-fill class="mem_round" :config="memConfig" title="内存使用"></bv-liquid-fill>
    <div id='showEcharts' title="cpu负载"></div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import * as echarts from "echarts";
import {ResultRes} from "@/utils/beans";
import {HttpService} from "@/axios/http";
const $http = new HttpService()
const progressFlexState = reactive({progress_flex1: 6, progress_text1: '60%', progress_flex2: 4, progress_text2: '40%'}) // 磁盘使用进度条
const memConfig = reactive({
  data: [60],
  shape: 'round',
  colors: ['#FF3300', '#99CC00'],
  waveHeight: '10',
  formatter: ' 内存已用{value}%'
})
const refreshTime = ref(5)
let myChart = null
onMounted(() => {
  const chartDom = document.getElementById('showEcharts')
  if (myChart == null)
    myChart = echarts.init(chartDom, "purple-passion")
  getSysInfo()
  const waitToRefresh=() => {
    clearTimeout(t)
    getSysInfo()
    t = setTimeout(waitToRefresh, refreshTime.value * 1000)
  }
  let t = setTimeout(waitToRefresh, refreshTime.value * 1000)
})
let index = 0
const cpus = []
const xaris = []
const getSysInfo = () => {
  $http.getData(null, true, null, 'v1', '/monitor/sys').then((res: ResultRes) => {
    const usedMem = Math.round((res.data.totalmem - res.data.freemem) / res.data.totalmem * 100)
    memConfig.data = [usedMem]
    res.data.cpus.forEach(function (i) {
      cpus.push([index,i])
      xaris.push(index)
      index += 1
    })
    const tmp = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      grid: {
        containLabel: true,
      },
      // title: {
      //   left: 'center',
      //   text: 'CPU负载'
      // },
      xAxis: {
        data: xaris,
        boundaryGap: false,
        type: 'value',
        min: 0, // 坐标轴刻度最小值。
        splitNumber: 100, // 坐标轴的分割段数，是一个预估值，实际显示会根据数据稍作调整。
        interval: 1, // 强制设置坐标轴分割间隔。
        axisLabel: {
          show: true // 不显示坐标轴上的文字
        },
        splitLine: {
          show: false // 不显示网格线
        },
        axisTick: {
          show: true // 不显示坐标轴刻度线
        },
        axisLine: {
          show: true // 不显示坐标轴线
        }
      },
      yAxis: {
        // boundaryGap: [0, '50'],
        type: 'value',
        min: 0, // 坐标轴刻度最小值。
        max: 100, // 坐标轴刻度最大值。
        splitNumber: 100, // 坐标轴的分割段数，是一个预估值，实际显示会根据数据稍作调整。
        interval: 10, // 强制设置坐标轴分割间隔。
        axisLabel: {
          show: true // 不显示坐标轴上的文字
        },
        splitLine: {
          show: false // 不显示网格线
        },
        axisTick: {
          show: false // 不显示坐标轴刻度线
        },
        axisLine: {
          show: true // 不显示坐标轴线
        }
      },
      series: [
        {
          data: cpus, type: 'line', name: 'cpu', smooth: true, // 平滑曲线
          // areaStyle: { // 折线填充区域
          //   color: '#ff0',
          //   opacity: 0.8
          // },
          animationDelay: function (idx) {
            return res.data.cpus * 10 + 100;
          }
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return res.data.cpus * 5;
      }
    }
    myChart.setOption(tmp, true)
    window.onresize = function () {
      myChart.resize()
    }
  })
}
</script>

<style scoped>
.cprogress {
  width: 100%;
  height: 14px;
  font-size: 10px;
  line-height: 14px;
  z-index: 5;
}

.mem_round {
  width: 160px;
  height: 160px;
  scale: 0.7;
  cursor: default;
  user-select: none
}
#showEcharts {
  width: 300px;
  height: 300px;
  scale: 0.9;
}
</style>
