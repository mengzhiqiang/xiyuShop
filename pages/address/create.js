let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    nav_select: false, // 快捷导航

    name: '',
    region: '青海省西宁市城中区',
    phone: '',
    detail: '青海大学',
    goodsAddress:'青海大学一号操场',    //取货点
    schoolAddress:'青海大学',      //学校名
    buildingNumber:'', //宿舍楼
    roomNumber:'',     //门牌号
    arrayTower:[
      '青海大学一号操场','青海大学图书馆'
    ],
    arrayShool: [
      '青海大学'
    ],
   
    error: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 表单提交
   */
  saveData: function(e) {
    let _this = this,
      values = e.detail.value
    values.region = this.data.region;
    values.detail = this.data.detail;
    console.log('======' + values.region);
    // 记录formId
    // App.saveFormId(e.detail.formId);

    // 表单验证
    if (!_this.validation(values)) {
      App.showError(_this.data.error);
      return false;
    }

    // 按钮禁用
    _this.setData({
      disabled: true
    });

    // 提交到后端
    App._post_form('address/add', values, function(result) {
      App.showSuccess(result.msg, function() {
        wx.navigateBack();
      });
    }, false, function() {
      // 解除禁用
      _this.setData({
        disabled: false
      });
    });
  },

  /**
   * 表单验证
   */
  validation: function(values) {
    if (values.name === '') {
      this.data.error = '收件人不能为空';
      return false;
    }
    if (values.phone.length < 1) {
      this.data.error = '手机号不能为空';
      return false;
    }
    if (values.phone.length !== 11) {
      this.data.error = '手机号长度有误';
      return false;
    }
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(values.phone)) {
      this.data.error = '手机号不符合要求';
      return false;
    }

    if (!this.data.goodsAddress) {
      this.data.error = '取货点不能空';
      return false;
    }

    // if (!this.data.region) {
    //   this.data.error = '省市区不能空';
    //   return false;
    // }
    // if (values.detail === '') {
    //   this.data.error = '详细地址不能为空';
    //   return false;
    // }

    return true;
  },

  /**
   * 修改地区
   */
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  
  bindAddressChange: function(e){
    this.setData(
      {
        goodsAddress: this.data.arrayTower[e.detail.value],
      }
    )
  },

})