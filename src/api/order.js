// 引入工具函数 axios
import req from '@/utils/request.js';

// 获取订单列表 && 带查询功能
export const orderlist = params => req.get('/order/orderlist',params);

// 保存修改
export const orderedit = params => req.post('/order/orderedit',params);

// 订单报表统计
export const ordertotal = params => req.get('/order/ordertotal',params);

// 首页报表接口
export const indexcharts = () => req.get('/order/indexcharts');