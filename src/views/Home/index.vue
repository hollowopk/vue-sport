<template>
    <div class="home">
        <Header />
        <router-view />
    </div>
</template>

<script>
import  Header  from "../../components/Header.vue"
export default {
    name:'home',
    components:{
        Header
    }
}
</script>
<style scoped>

</style>