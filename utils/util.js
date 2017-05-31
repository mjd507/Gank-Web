//获取指定天数后的日期
function getTargetDate(day){
  let date = new Date();
  let targetDay = date.getDate() + day;
  date.setDate(targetDay);
  return formatDay(date);
}
//将当期日期转换成 xxxx/xx/xx 的形式
function formatDay(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('/')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  getTargetDate: getTargetDate
}
