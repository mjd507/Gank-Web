/**
 * 网络请求，添加加载框显示
 */
const myfetch = (opts) => {
  const { url, data, method, complete, header, noStatus } = opts;

  const showError = () => {
    wx.showToast({
      title: '网络异常',
      icon: 'loading',
      duration: 2000
    })
  };

  const showLoading = () => {
    wx.showToast({
      title: '加载中…',
      icon: 'loading',
      duration: 10000
    })
  };

  const hideLoading = () => {
    if (!noStatus) {
      wx.hideToast();
    }
  };

  if (!noStatus) {
    showLoading();
  }

  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method || 'GET',
      success: (res) => {
        const code = res.data.Code - 0;
        if (res.statusCode - 0 !== 200) {
          showError();
          reject();
        } else {
          resolve(res);
        }
      },
      fail: (e) => {
        showError();
        reject();
      },
      complete: () => {
        hideLoading();
      }
    })
  })
  return promise;
}

module.exports = myfetch;
