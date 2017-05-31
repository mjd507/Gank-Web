var util = require('../../utils/util.js')
var tabData = [
  { name: '推荐' },
  { name: '福利' },
  { name: 'Android' },
  { name: 'iOS' },
  { name: '前端' },
  { name: '休息视频' },
  { name: '拓展资源' }
]
Page({
  data: {
    tabList: [],
    currTab: {},
    DayInfo: [], //每日推荐
    TagInfo: [],
    pageIndex: 1,
    currDay: 0, // 0 表示今天，-1表示昨天...
  },
  onLoad: function () {
    this.init();
    this.getDailyInfo();
  },
  init: function () {
    this.setData({
      tabList: tabData,
      currTab: tabData[0],
    });
  },
  getDailyInfo: function () {
    wx.fetch({
      url: wx.apis.getDailyInfo + util.getTargetDate(this.data.currDay),
    }).then((res) => {
      console.log(res);
      let data = res.data;
      let arr = [];
      if (data.category.length > 0) {
        data.category.forEach((item) => {
          arr[item] = data.results.item;
          arr.push({ item: data.results.item });
        });
        this.setData({
          DayInfo: arr,
        })
      } else { //当天没有数据，获取前一天的数据
        this.data.currDay = this.data.currDay - 1;
        this.getDailyInfo();
      }
    })
  },
  switchTab: function (e) {
    let curItem = e.currentTarget.dataset.item;
    this.setData({
      tabList: this.data.tabList,
      currTab: curItem,
    });
    //ToDo: clear tab data
    //load tab data
    this.loadData(curItem, 1);
  },
  loadData: function (item, pageIndex) {
    wx.fetch({
      url: wx.apis.getTagData + item.name + '/10/' + pageIndex,
    }).then((res) => {
      console.log(res);
    })

  },
  scrollToLower: function () {
    let index = this.data.pageIndex + 1;
    this.loadData(this.data.currTab, index);
  },


})
