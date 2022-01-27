<template>
    <div class="home">
        <HdView />
        <router-view />
    </div>
</template>

<script>
import  HdView  from "../../components/HdView.vue"
export default {
    name:'home',
    data(){
        return{
            
        }
    },
    components:{
        HdView
    }
}
</script>
<style scoped lang="less">

</style>