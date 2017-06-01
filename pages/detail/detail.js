var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    item: [],
  },
  onLoad: function(options) {
    let item = JSON.parse(options.item);
  }
})
