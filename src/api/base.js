const base ={
    baseUrl:"/api",
    login:"/login",//用户登录
    logout:"/logout", //退出登录
    regist:"/regist", //用户注册,
    navLists:"/nav",//导航菜单数据
    insertUserRecode:"/userRecord/commit",//用户每天打卡
    todayUserRecode:"/userRecord/getdata",//用户今日打卡数据
    prefUserMessage:"/changeData",//完善个人信息
    changePwd:"/changePwd",//修改密码,
    recipe:"/recipe",//食谱
    food:"/food",//分类查询食物
}
export default base;