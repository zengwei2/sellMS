// 引入工具函数 axios
import req from '@/utils/request.js';

//店铺查询
export const shopinfo = params => req.get('/shop/shopinfo',params);

//店铺修改
export const shopedit = params => req.post('/shop/shopedit',params);