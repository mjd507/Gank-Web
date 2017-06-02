Page({
  data: {
    item: [],
    isCopySuccess: false,
  },
  onLoad: function(options) {
    let item = JSON.parse(options.item);
    this.setData({
      item: item
    })
  },
  copy: function() {
    let self = this;
    wx.setClipboardData({
      data: this.data.item.url,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            self.setData({
              isCopySuccess: true
            })
            setTimeout(() => {
              self.setData({
                isCopySuccess: false
              })
            }, 2000)
          }
        })
      }
    })
  }
})
