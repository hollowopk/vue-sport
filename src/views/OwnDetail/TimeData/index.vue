<template>
    <center>
        <div id="main" style="width: 800px;height:550px;" ref="time_ref"></div>
    </center>
</template>
<script>
import * as echarts from 'echarts';
export default {
    data(){
        return {
            chartInstance: null,
            allData: null, //服务器返回的数据
            timeData:null
        }
    },
    mounted(){
        this.initChart()
        this.getData()
        this.handleToadyUserRecode()
        // this.handleToadyUserRecode()

    //   myChart.setOption(option);
    },
    methods:{
        //初始化Echarts对象
        initChart(){
            this.chartInstance = this.$echarts.init(this.$refs.time_ref)
        },
        
        
        //获取服务器的数据

        async handleToadyUserRecode() {
            const res = await this.$api.getTodayUserRecode({timeDiff: 0,});
            this.timeData = res.data.extend.record
            console.log(res.data.extend.record)
            this.updataChart()
        },

        async getData(){
            const ret = await this.$https.get('seller')
            this.allData = ret
            console.log(ret)
            // this.updataChart()
        },
        //更新图表
        updataChart(){
            //今日步数数据，改成了消耗热量
            const timeSteps = this.timeData.map((item)=>{
                return item.steps
            })
            //今日体重数据
            const timeWeight = this.timeData.map((item)=>{
                return item.weight
            })
            //今日摄入量数据
            const timeCalorie = this.timeData.map((item)=>{
                return item.calorie
            })
            //今日饮水量数据
            const timeDrink = this.timeData.map((item)=>{
                return item.drink
            })
            const option = {
                 backgroundColor: '#F5FFFA',
            series: [
            {

            name: ' 今日消耗热量',
            type: 'pie',
            radius: ['25%', '30%'],
            center: ['30%', '30%'],
            startAngle: 225,
            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00a2ff'
            }, {
                offset: 1,
                color: '#70ffac'
            }]), "transparent"],
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                    normal: {
                        position: 'center'
                    }
                },
            data: [{
                value: 75,
                 name: '今日消耗热量',
                    label: {
                        normal: {
                            
                            formatter: '今日消耗热量',
                            textStyle: {
                                color: '#000',
                                fontSize: 16

                            }
                        }
                    }
            }, {
                value: 25,
                name: '%',
                    label: {
                        normal: {
                            
                            formatter: '\n\n\n'+ timeSteps,
                            textStyle: {
                                color: '#007ac6',
                                fontSize: 20

                            }
                        }
                    }
            },
            {
                value: 0,
                name: '%',
                    label: {
                        normal: {
                            formatter: '\n\n\n\n\n\n\n焦',
                            textStyle: {
                                color: '#000',
                                fontSize: 16

                            }
                        }
                    }
            }]
        },
        {
            name: ' 今日体重',
            type: 'pie',
            radius: ['25%', '30%'],
            center: ['70%', '30%'],
            startAngle: 225,
            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00a2ff'
            }, {
                offset: 1,
                color: '#70ffac'
            }]), "transparent"],
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                    normal: {
                        position: 'center'
                    }
                },
            data: [{
                value: 75,
                 name: '今日体重',
                    label: {
                        normal: {
                            formatter: '今日体重',
                            textStyle: {
                                color: '#000',
                                fontSize: 16

                            }
                        }
                    }
            }, {
                value: 25,
                name: '%',
                    label: {
                        normal: {
                            formatter: '\n\n\n' + timeWeight,
                            textStyle: {
                                color: '#007ac6',
                                fontSize: 20

                            }
                        }
                    }
            },
            {
                value: 0,
                name: '%',
                    label: {
                        normal: {
                            formatter: '\n\n\n\n\n\n\n斤',
                            textStyle: {
                                color: '#000',
                                fontSize: 16

                            }
                        }
                    }
            }]
        },
        {
            name: ' 今日摄入热量',
            type: 'pie',
            radius: ['25%', '30%'],
            center: ['30%', '70%'],
            startAngle: 225,
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                    normal: {
                        position: 'center'
                    }
                },
            data: [{
                value: 75,
                "itemStyle": {
                    "normal": {
                        "color": new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            "offset": 0,
                            "color": '#f125ff'
                        }, {
                            "offset": 1,
                            "color": '#2dcbff'
                        }]),
                    }
                },
                 name: '今日摄入热量',
                    label: {
                        normal: {
                            formatter: '今日摄入热量',
                            textStyle: {
                                color: '#000',
                                fontSize: 16

                            }
                        }
                    }
            }, {
                value: 25,
                name: '%',
                    label: {
                        normal: {
                            formatter: '\n\n\n'+ timeCalorie,
                            textStyle: {
                                color: '#f125ff',
                                fontSize: 20

                            }
                        }
                    }
            },
            {
                value: 0,
                name: '%',
                    label: {
                        normal: {
                            formatter: '\n\n\n\n\n\n\n焦',
                            textStyle: {
                                color: '#000',
                                fontSize: 16

                            }
                        }
                    }
            }]
        },
         {
            name: '今日饮水量',
            type: 'pie',
            radius: ['25%', '30%'],
            center: ['70%', '70%'],
            startAngle: 225,
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                    normal: {
                        position: 'center'
                    }
                },
            data: [{
                value: 75,
                "itemStyle": {
                    "normal": {
                        "color": new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            "offset": 0,
                            "color": '#f125ff'
                        }, {
                            "offset": 1,
                            "color": '#2dcbff'
                        }]),
                    }
                },
                 name: '今日饮水量',
                    label: {
                        normal: {
                            formatter: '今日饮水量',
                            textStyle: {
                                color: '#000',
                                fontSize: 16

                            }
                        }
                    }
            }, {
                value: 25,
                name: '%',
                    label: {
                        normal: {
                            formatter: '\n\n\n'+ timeDrink,
                            textStyle: {
                                color: '#f125ff',
                                fontSize: 20

                            }
                        }
                    }
            },
            {
                value: 0,
                name: '%',
                    label: {
                        normal: {
                            formatter: '\n\n\n\n\n\n\nml',
                            textStyle: {
                                color: '#000',
                                fontSize: 16

                            }
                        }
                    }
            }]
            
        },
        
    ]
            }
            this.chartInstance.setOption(option)
        }
        
    },
        
}
</script>