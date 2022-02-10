const base ={
    baseUrl:"/api",
    otherBaseUrl:"/http",
    login:"/login",//用户登录
    logout:"/logout", //退出登录
    regist:"/regist", //用户注册,
    navLists:"/nav",//导航菜单数据
    insertUserRecode:"/userRecord/commit",//用户每天打卡
    todayUserRecode:"/userRecord/getdata",//用户今日打卡数据
    prefUserMessage:"/changeData",//完善个人信息
    changePwd:"/changePwd",//修改密码,
    recipe:"/recipe",//食谱
    food:"/food",//分类查询食物,
    sports:"/sport/category",//分类查询运动
    sportName:'/sport/name',//模糊查询某种运动
    sportAll:'/sport/all',//查询所有运动,

    produceCate:"/categories",//商品分类,
    productLists:'/goods/search',//商品列表搜索
    goodsDetail:'/goods/detail',//商品详情

    addCart:'/userCart/cartOperation',//加入购物车
    addCollect:"/userCart/collectOperation",//商品收藏
    getCollect:'/userCart/showCollect',//收藏商品列表
    getCart:'/userCart/showCart',//购物车列表

    pay:'/pay',//结算
}
export default base;