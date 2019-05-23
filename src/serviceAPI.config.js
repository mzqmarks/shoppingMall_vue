const BASEURL = 'https://www.easy-mock.com/mock/5c04ed3105e43a1957ae8c2b/example/'

const LOCALURL = "http://localhost:3000/"

const URL = {
  // 首页商品数据
  getShoppingMallInfo: BASEURL + 'shoping',
  registerUser: LOCALURL + 'user/register', //用户注册接口
  login: LOCALURL + 'user/login', //用户注册接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //商品详情页
  getCategoryList: LOCALURL + 'goods/getCategoryList', //商品分类列表页
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', //商品小类
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID' //通过商品二级类别获取小类商品信息
}
module.exports = URL
