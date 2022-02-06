<template>
  <div class="sportlist">
    <p></p>
    <ul class="card" style="minHeight:400px;">
      <li class="card_0" v-for="(item, index) in content" :key="index">
        <div
          class="card_1"
          @click="goDetails(item)"
          style="cursor: pointer"
        >
          <img :src="handleImg(item.icon) ? item.icon : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'" />
          <div class="title_0">
           <div> {{ item.name }}</div>
            <p>{{ item.energy }}大卡/每小时</p>
          </div>
        </div>
      </li>
    </ul>
    <!--分页器-->
    <div class="page">
      <el-pagination 
      background 
      @current-change ="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="total,prev, pager, next" 
      :total="totalData"
      :page-size="this.pageSize">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "sportlist",
  data() {
    return {
      //运动数据
      content: [],
      //运动数据的总数
      totalData:0,
      //当前页
      currentPage:1,
      pageSize:30,
      //标识，1表示所有运动涉及的分页处理 2代表名称查询涉及的分页处理 3代表类别涉及的分页处理
      flag:3,
      //传参
      msg:'',
    };
  },

  watch: {
    $route: {
      handler() {
        if (this.$route.query.category) {
          let msg = this.$route.query.category;
          this.msg = msg;
          this.getSportByCategory(msg);
        } else if (this.$route.query.name) {
          let msg = this.$route.query.name;
           this.msg = msg;
          switch (msg) {
            case "all":
              this.getAllSport();
              break;
            default:
              this.getSportByName(msg);
              break;
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    /**
     * 分类菜单数据请求
     */
    getSportByCategory(msg) {
      this.$api
        .getSportByCategory({
          category: msg,
          pn:this.currentPage
        })
        .then((res) => {
          if (res.status === 200) {
             this.totalData = Number(res.data.extend.pageInfo.total);
            this.content = res.data.extend.pageInfo.list;
              //将标识改变
            this.flag = 3;
          }
        });
    },

    /**
     * 查询某个运动
     */
    getSportByName(msg) {
      console.log("msg",msg);
      this.$api
        .getSportByName({
          name: msg,
          pn:this.currentPage
        })
        .then((res) => {
          if (res.status === 200) {
             this.totalData = Number(res.data.extend.pageInfo.total);
            this.content = res.data.extend.pageInfo.list;
            //将标识改变
            this.flag = 2;
          }
        });
    },

    /**
     * 查询所有运动
     */
    getAllSport() {
      this.$api.getSportAll({
        pn:this.currentPage
      }).then((res) => {
        if (res.status === 200) {
          this.totalData = Number(res.data.extend.pageInfo.total);
          this.content = res.data.extend.pageInfo.list;
           //将标识改变
            this.flag = 1;
        }
      });
    },

    /**
     *页面改变时触发请求 
     */
    handleCurrentChange(){
     if(this.flag === 3){
       this.getSportByCategory(this.msg);
     }else if(this.flag === 2){
       this.getSportByName(this.msg);
     }else{
       this.getAllSport();
     }
    },
    /**
     *运动详情页
     */
    goDetails(item) {
      this.$router.push({ name: "sportsDetails", params: { name: item } });
    },

    /**
    *判断图片的格式
     */
     handleImg(imgStr){
       let reg = /\.jpg$/;
       return reg.test(imgStr);
     }
  },
};
</script>
<style scoped lang="less">
.sportlist{
  display: flex;
  flex-direction: column;
 
  .card {
  
  width: 1300px;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
     margin-top: 20px;
  .card_0 {
    flex:0 1 16%;
    margin:10px 22px;
    background-color: rgb(228, 235, 232);
    text-align: center;
    overflow: hidden;
    list-style-type: none;
     border-radius: 10%;
   
      padding: 15px 5px;
    .card_1 {
      margin: 0 auto;
         width: 180px;
      img {
        
        width: 180px;
        height: 180px;
      }
      .title_0 {
         text-align: left;
        color: black;
        font-size: 15px;
        font-weight: 100;
        margin: 10px 5px;
        div{
          height: 40px;
        }
        p {
          font-size: 14px;
          color: #888;
        }
      }
    }
   
    
  }
  
  .card_0:hover{
    background-color: white;
       box-shadow: 0 19px 39px 0 rgb(0 0 0 / 12%);
     
  }
}
.card:after {
    content: "";
    flex: auto;
  }
.page {
  margin: 20px auto;
}
}


</style>