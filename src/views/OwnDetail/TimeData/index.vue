<template>
    <center>
        <div id="main" style="width: 800px;height:550px;"></div>
    </center>
</template>
<script>
import * as echarts from 'echarts';
export default {
    mounted(){
        var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
        var option = {
            backgroundColor: '#F5FFFA',
            series: [
            {

            name: ' 今日步数（步）',
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
                 name: '今日步数',
                    label: {
                        normal: {
                            
                            formatter: '今日步数',
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
                            
                            formatter: '\n\n\n3000',
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
                            formatter: '\n\n\n\n\n\n步',
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
                            formatter: '\n\n\n150',
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
                            formatter: '\n\n\n\n\n\n斤',
                            textStyle: {
                                color: '#000',
                                fontSize: 16

                            }
                        }
                    }
            }]
        },
        {
            name: ' 现有门店',
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
                            formatter: '\n\n\n500',
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
                            formatter: '\n\n\n\n\n\n焦',
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
                            formatter: '\n\n\n2879',
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
                            formatter: '\n\n\n\n\n\nml',
                            textStyle: {
                                color: '#000',
                                fontSize: 16

                            }
                        }
                    }
            }]
            
        },
        
    ]
    
};
      myChart.setOption(option);
    },
}
</script>