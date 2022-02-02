<template>
    <center>
        <div id="main" style="width: 800px;height:550px;">我是身高体重图表</div>
    </center>
</template>
<script>
import * as echarts from 'echarts';
export default {
    mounted(){
        var myChart = echarts.init(document.getElementById('main'));

        let xAxisData = ["2月1日", "2月2日", "2月3日", "2月4日", "2月5日", "2月6日", "2月7日"];
        let lineData = ["21","22","21.5","24","22","23","22"];
        let weightData = ["140","144","145","143","144","145","142"];
        let heightData = ["180","180","180.5","180","180","180","181"];
        var option = {
            backgroundColor: '#F5FFFA',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
                }
            },
            toolbox: {
                feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            legend: {
                data: ['height', 'weight', 'BMI']
            },
            xAxis: [
                {
                // formatter: '2022/1/{value}',
                type: 'category',
                data: xAxisData,
                axisPointer: {
                    type: 'shadow'
                }
                }
            ],
            yAxis: [
                {
                type: 'value',
                name: 'weight',
                min: 80,
                max: 200,
                interval: 10,
                axisLabel: {
                    formatter: '{value} 斤'
                }
                },
                {
                type: 'value',
                name: 'BMI',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} '
                }
                }
            ],
            series: [
                // {
                // name: 'height',
                // type: 'bar',
                // tooltip: {
                //     valueFormatter: function (value) {
                //     return value + ' cm';
                //     }
                // },
                // data: heightData
                // },
                {
                name: 'weight',
                color:'#5470c6',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                    return value + ' 斤';
                    }
                },
                data: weightData
                },
                {
                name: 'BMI',
                type: 'line',
                color: '#91cc75',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                    return value ;
                    }
                },
                data: lineData
                }
            ]
            
            };
            myChart.setOption(option); 
    },
}
</script>