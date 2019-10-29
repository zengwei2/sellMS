// 引入工具函数 axios
import req from '@/utils/request.js';

//添加商品
export const goodsadd = params => req.post('/goods/goodsadd',params);

//商品列表
export const goodslist = params => req.get('/goods/goodslist',params);

//商品修改
export const goodsedit = params => req.post('/goods/goodsedit',params);

//商品删除
export const goodsdel = params => req.get('/goods/goodsdel',params);