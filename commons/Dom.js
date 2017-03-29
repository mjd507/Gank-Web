/**
 * Created by mjd on 2017/3/28.
 * Description: 获取指定 CSS 选择器标签的对象
 */
class Dom {
    constructor(selectors) {
        return function (selectors) {
            return document.querySelector(selectors);
        }
    }
}

export default new Dom();
