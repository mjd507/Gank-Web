var app = getApp()
var tabData = [
  { name: '推荐', isSelected: true },
  { name: '福利', isSelected: false },
  { name: 'Android', isSelected: false },
  { name: 'iOS', isSelected: false },
  { name: '前端', isSelected: false },
  { name: '休息视频', isSelected: false },
  { name: '拓展资源', isSelected: false }]
Page({
  data: {
    tabList: tabData,
  },

  onLoad: function () {

  },
  switchTab: function (e) {
    let curItem = e.currentTarget.dataset.item;
    this.data.tabList.forEach((item) => {
      if (item.name === curItem.name) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    this.setData({
      tabList: this.data.tabList
    })
  }
})
