// 引入工具函数 axios
import req from '@/utils/request.js';

//用户登录
export const login = params => req.post('/account/loginCheck',params);

//添加账号
export const accountAdd = params => req.post('/account/accountAdd',params);

//账号列表
export const getAccountList = params => req.get('/account/accountList',params);

//删除1个账号
export const delAccount = params => req.get('/account/accountDel',params);

//批量删除
export const batchDelAccount = params => req.get('/account/accountBatchDel',params);

//检查账号是否重复
export const chackAccount = params => req.post('/account/accountCheck',params);

//更新账号
export const updateAccount = params => req.post('/account/accountUpdate',params);

//修改密码
// export const modifyPwd = params => req.post('/account/modifyPwd',params);

//检查旧密码是否正确
export const checkoldpwd = params => req.get('/account/checkoldpwd',params);

//修改密码
export const passwordedit = params => req.post('/account/passwordedit',params);


//个人中心

//获取个人信息
export const accountinfo = () => req.get('/account/accountinfo');

//修改头像
export const avataredit = params => req.get('/account/avataredit',params);



//添加商品
// export const addGoods = params => req.post('/goods/goodsAdd',params);

//商品列表
// export const getGoodsList = params => req.get('/goods/goodsList',params);

//删除商品
// export const delGoods = params => req.get('/goods/goodsDel',params);




//查找店铺
export const shoplist = () => req.get('/shop/shoplist');

//更新店铺
export const addshop = params => req.get('/shop/shopAdd',params);






