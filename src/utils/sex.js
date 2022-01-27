export default {
    setSex(sex){
        switch (sex){
            case 1:
                return '男';
            case 2:
                return '女';
            default:
                return '未知';
        }
    }
}