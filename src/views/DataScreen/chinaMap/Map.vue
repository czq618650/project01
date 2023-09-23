<template>
  <div>
    <div ref="chart" id="map"></div>
  </div>
</template>

<script >
import { ref, reactive, onMounted, toRefs } from 'vue'
import * as echarts from 'echarts'
import mapJson from '../assets/china.json'
export default {
  setup() {
    const state = reactive({
      chart: ref()
    })
    const methods = {
      init() {
        let myChart = echarts.init(state.chart)
        echarts.registerMap('china', mapJson)
        let option = {
          grid: {
            left: '0px',
            right: '80px',
            top: '50px',
            bottom: '10px'
          },

          //配置属性
          series: [
            {
              type: 'map',
              map: 'china',
              /// 是否开启缩放和平移漫游如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
              roam: false,
              // 滚轮缩放的极限控制，通过min, max最小和最大的缩放值，默认的缩放为1
              scaleLimit: {
                min: 1,
                max: 1.2
              },
              // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
              label: {
                normal: {
                  show: true, //省份名称
                  color: '#ccc',
                  fontSize: 8
                },
                emphasis: {
                  show: true
                }
              },
              // 每一个地区的颜色渐变
              itemStyle: {
                color: '#fff',
                // 地图区域的颜色。
                areaColor: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#073684' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#061E3D' // 100% 处的颜色
                    }
                  ]
                },
                // 图形描边颜色的渐变
                // 使用渐变前两个参数 (0, 0) 指定渐变的起点。
                // 接下来的两个参数 (0, 1) 指定渐变的终点。第三个参数是一个色标数组，每个色标都是一个对象，有一个                 offset属性和一个color属性。该offset属性指定梯度上停止点的位置，0 为起点，1 为终点。该color属性指定                停止的颜色。第四个参数 ( false) 指定渐变是否为重复模式。
                borderColor: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#00F6FF'
                    },
                    {
                      offset: 1,
                      color: '#87ADCB'
                    }
                  ],
                  false
                ),
                // 阴影颜色
                shadowColor: 'rgba(10,76,139,1)',
                // 阴影垂直方向上的偏移距离
                shadowOffsetY: 0,
                // 图形阴影的模糊大小
                shadowBlur: 60,
                // 描边线宽
                borderWidth: 1
              },

              zoom: 1.2, // 控制地图的放大缩小
              emphasis: {
                //高亮状态下的多边形和标签样式
                // 控制地图滑过后的颜色
                label: {
                  color: '#096',
                  fontSize: 10
                },
                itemStyle: {
                  areaColor: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#073684' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#2B91B7' // 100% 处的颜色
                      }
                    ]
                  },
                  borderColor: 'blue'
                }
              },
              data: [
                { name: '北京', value: 100 },
                { name: '天津', value: 50 },
                { name: '上海', value: 80 },
                { name: '重庆', value: 70 },
                { name: '湖北', value: 120 },
                { name: '湖南', value: 90 },
                { name: '广东', value: 110 },
                { name: '广西', value: 60 },
                { name: '海南', value: 40 },
                { name: '河南', value: 130 },
                { name: '河北', value: 70 },
                { name: '山东', value: 140 },
                { name: '山西', value: 60 },
                { name: '陕西', value: 80 },
                { name: '黑龙江', value: 50 },
                { name: '吉林', value: 30 },
                { name: '辽宁', value: 40 },
                { name: '江苏', value: 100 },
                { name: '浙江', value: 90 },
                { name: '安徽', value: 80 },
                { name: '福建', value: 70 },
                { name: '江西', value: 60 },
                { name: '四川', value: 110 },
                { name: '云南', value: 50 },
                { name: '贵州', value: 40 },
                { name: '西藏', value: 20 },
                { name: '新疆', value: 30 },
                { name: '青海', value: 20 },
                { name: '甘肃', value: 30 },
                { name: '宁夏', value: 10 },
                { name: '内蒙古', value: 50 },
                { name: '台湾', value: 0 },
                { name: '香港', value: 0 },
                { name: '澳门', value: 0 }
              ] //数据
            }
          ]
        }
        myChart.setOption(option)
      }
    }
    onMounted(() => {
      methods.init()
    })
    return { ...toRefs(state), ...methods }
  }
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 420px;
}
</style>