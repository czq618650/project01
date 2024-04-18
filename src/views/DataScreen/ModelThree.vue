<template>
  <div class="module-box ">
    <div style="flex:0 1 50%">
      <dv-border-box-8 style="width:100%;height:140px;">
        <dv-capsule-chart :config="config5.value" style="width:100%;height:140px" />
      </dv-border-box-8>
    </div>
    <div style="flex:0 1 25%">
      <dv-border-box-9 style="width:100%;height:140px;">
        <dv-capsule-chart :config="config6.value" style="width:100%;height:140px" />
      </dv-border-box-9>
    </div>
    <div style="flex:0 1 25%">
      <dv-border-box-10 style="width:100%;height:140px;">
        <dv-capsule-chart :config="config7.value" style="width:100%;height:140px" />
      </dv-border-box-10>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, toRefs, defineAsyncComponent } from 'vue'
import axios from '@/util/axios.config'
// import Map from './chinaMap/Map.vue'

const Map = defineAsyncComponent(() => import('./chinaMap/Map.vue'))

const components = {
  Map
}

const tableData = ref([])
// 各省人数
const cyCount = ref([])
const nan = ref(0)
const nv = ref(0)
onMounted(async () => {
  await getTableDate()
})
const config1 = reactive({})
const config2 = reactive({})
const config4 = reactive({})
const config5 = reactive({})
const config6 = reactive({})
const config7 = reactive({})
// 水波图
const config3 = {
  data: [66, 45],
  shape: 'roundRect',
  colors: ['#f60', 'green'],
  // 透明度
  waveOpacity: 0.2
}
// 飞行区域数据
const mapData = [
  {
    fromName: '北京',
    toName: '上海',
    coords: [
      [116.4551, 40.2539],
      [121.4648, 31.2891]
    ]
  },
  {
    fromName: '上海',
    toName: '北京',
    coords: [
      [121.4648, 31.2891],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: '北京',
    toName: '广州',
    coords: [
      [116.4551, 40.2539],
      [113.5107, 23.2196]
    ]
  },
  {
    fromName: '广州',
    toName: '北京',
    coords: [
      [113.5107, 23.2196],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: '北京',
    toName: '成都',
    coords: [
      [116.4551, 40.2539],
      [103.9526, 30.7617]
    ]
  },
  {
    fromName: '成都',
    toName: '北京',
    coords: [
      [103.9526, 30.7617],
      [116.4551, 40.2539]
    ]
  },
  {
    fromName: '成都',
    toName: '新疆维吾尔自治区',
    coords: [
      [103.9526, 30.7617],
      [85.294711, 41.371801]
    ]
  },
  {
    fromName: ' 新疆维吾尔自治区',
    toName: '成都',
    coords: [
      [85.294711, 41.371801],
      [103.9526, 30.7617]
    ]
  }
]

// 获取每个省份用户人数
const getTableDate = async () => {
  const res = await axios.get('/adminapi/user/list')
  console.log(res.data.data)
  tableData.value = res.data.data

  // 获取每个省的用户数
  const cityCounts = tableData.value.reduce((counts, user) => {
    // console.log(user)
    const city = user.city
    if (counts[city]) {
      counts[city]++
    } else {
      counts[city] = 1
    }
    return counts
  }, {})
  cyCount.value = cityCounts
  console.log(cyCount.value[1])
  // 左1
  config1.value = {
    data: [
      {
        name: '江西',
        value: cyCount.value[1]
      },
      {
        name: '江苏',
        value: cyCount.value[11]
      },
      {
        name: '北京',
        value: cyCount.value[2]
      },
      {
        name: '上海',
        value: cyCount.value[10]
      },
      {
        name: '四川',
        value: cyCount.value[24]
      }
    ]
  }
  config2.value = {
    data: [
      {
        name: '山西',
        value: cyCount.value[5]
      },
      {
        name: '天津',
        value: cyCount.value[3]
      },

      {
        name: '河南',
        value: cyCount.value[16]
      },
      {
        name: '山东',
        value: cyCount.value[15]
      }
    ],
    colors: ['#e062ae', '#e690d1', '#32c5e9', '#96bfff'],
    unit: '单位',
    showValue: true
  }
  config4.value = {
    data: [
      {
        name: '安徽',
        value: cyCount.value[13]
      },
      {
        name: '福建',
        value: cyCount.value[14]
      },
      {
        name: '浙江',
        value: cyCount.value[12]
      },
      {
        name: '湖南',
        value: cyCount.value[18]
      },
      {
        name: '湖北',
        value: cyCount.value[17]
      }
    ],
    colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
    unit: '单位',
    showValue: true
  }
  config5.value = {
    data: [
      {
        name: '辽宁',
        value: cyCount.value[7]
      },
      {
        name: '黑龙江',
        value: cyCount.value[9]
      },
      {
        name: '吉林',
        value: cyCount.value[8]
      },
      {
        name: '内蒙古',
        value: cyCount.value[6]
      },
      {
        name: '广西壮族自治区',
        value: cyCount.value[20]
      }
    ],
    colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
    unit: '单位',
    showValue: true
  }
  config6.value = {
    data: [
      {
        name: '海南',
        value: cyCount.value[21]
      },
      {
        name: '贵州',
        value: cyCount.value[24]
      },
      {
        name: '云南',
        value: cyCount.value[25]
      },
      {
        name: '西藏',
        value: cyCount.value[26]
      },
      {
        name: '陕西',
        value: cyCount.value[27]
      }
    ],
    colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
    unit: '单位',
    showValue: true
  }
  config7.value = {
    data: [
      {
        name: '甘肃',
        value: cyCount.value[28]
      },
      {
        name: '青海',
        value: cyCount.value[29]
      },
      {
        name: '宁夏回族自治区',
        value: cyCount.value[30]
      },
      {
        name: '新疆',
        value: cyCount.value[31]
      },
      {
        name: '广东',
        value: cyCount.value[19]
      }
    ],
    colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
    unit: '单位',
    showValue: true
  }

  // 获取男女人数
  const GenderCounts = tableData.value.reduce((counts, user) => {
    // console.log(user)
    const gender = user.gender
    if (counts[gender]) {
      counts[gender]++
    } else {
      counts[gender] = 1
    }
    return counts
  }, {})
  console.log(GenderCounts)
  console.log(cityCounts)
  console.log(cyCount.value)
  // 男生人数
  nan.value = (GenderCounts[1] / tableData.value.length).toFixed(2) * 100 + '%'

  // 女士人数
  nv.value = (GenderCounts[2] / tableData.value.length).toFixed(2) * 100 + '%'
}
</script>
