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
    currDay: 0, // 0 表示今天，-1表示昨天...
    Grils: [],
    OtherTabs: [],
    dataContainer: [],
    pageIndex: 1,
    scrollViewHeight: 0,
    windowWidth: 0,
  },
  onLoad: function () {
    this.init();
    this.getDailyInfo();
  },
  init: function () {
    //计算 scroll-view 的高度
    let systemInfo = wx.getSystemInfoSync();
    let windowHeight = systemInfo.windowHeight;
    let windowWidth = systemInfo.windowWidth;
    let scrollViewHeight = windowHeight - 100 * windowWidth / 750;
    this.setData({
      tabList: tabData,
      currTab: tabData[0],
      scrollViewHeight: scrollViewHeight
    });
    this.data.windowWidth = windowWidth;
  },
  getDailyInfo: function () {
    wx.fetch({
      url: wx.apis.getDailyInfo + wx.util.getTargetDate(this.data.currDay),
    }).then((res) => {
      let data = res.data;
      if (!data) return;
      if (data.category.length > 0) {
        let dayInfo = this.handleDailyData(data);
        this.setData({
          DayInfo: dayInfo,
        })
      } else { //当天没有数据，获取前一天的数据
        this.data.currDay = this.data.currDay - 1;
        this.getDailyInfo();
      }
    })
  },
  handleDailyData: function (data) {
    let arr = [];
    for (let item in data.results) {
      let name = item;
      if (name === '福利') {
        name = 'welfare';
      }
      let obj = {
        key: name,
        value: data.results[item]
      }
      arr.push(obj);
    }
    let newArr = [];
    arr.forEach((item) => {
      if (item.key === 'welfare') {
        newArr.splice(0, 0, item);
      } else {
        newArr.push(item);
      }
    })
    return newArr;
  },
  switchTab: function (e) {
    let curItem = e.currentTarget.dataset.item;
    if (curItem.name === this.data.currTab.name) {
      return;
    }
    this.setData({
      tabList: this.data.tabList,
      currTab: curItem,
    });
    if (curItem.name === '推荐') return;
    //ToDo: clear tab data
    this.setData({
      Grils: [],
      OtherTabs: [],
      dataContainer: [],
    });
    //load tab data
    this.data.pageIndex = 1;
    this.loadData(curItem, 1);
  },
  loadData: function (item, pageIndex) {
    let name = encodeURI(item.name);
    wx.fetch({
      url: wx.apis.getTagData + name + '/10/' + pageIndex,
    }).then((res) => {
      let data = res.data;
      if (data.results && data.results.length > 0) {

        this.data.dataContainer = this.data.dataContainer.concat(data.results);
        if (this.data.currTab.name === '福利') {
          data.results.forEach((item) => {
            item.url = item.url + '?imageView2/0/w/' + parseInt(this.data.windowWidth / 2 + 50);
          })
          this.setData({
            Grils: this.data.dataContainer,
          })
        } else {
          this.setData({
            OtherTabs: this.data.dataContainer,
          })
        }
      }
    })
  },
  scrollToLower: function () {
    if (this.data.currTab.name === '推荐') return;
    this.data.pageIndex += 1;
    this.loadData(this.data.currTab, this.data.pageIndex);
  },
  clickItem: function (e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../detail/detail?item=' + JSON.stringify(item)
    })
  },
  clickImg: function (e) {
    let index = e.currentTarget.dataset.index - 0;
    let item = e.currentTarget.dataset.item;
    let urlArr = item.map((value) => {
      return value.url.split('?')[0];
    })
    wx.previewImage({
      current: urlArr[index],
      urls: urlArr
    })
  },

})
