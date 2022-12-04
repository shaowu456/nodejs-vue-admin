/**
 * @param {String} 日期 年月日 1995-01-01
 * @description 根据传入出生日期返回年龄
 */
export const jsGetAgeByBirth = (strBirthday) => {
  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();

  if (nowYear == birthYear) {
    returnAge = 0;//同年 则为0岁
  }
  else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay;//日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        }
        else {
          returnAge = ageDiff;
        }
      }
      else {
        var monthDiff = nowMonth - birthMonth;//月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        }
        else {
          returnAge = ageDiff;
        }
      }
    }
    else {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge;//返回周岁年龄

}

/**
 * @param dateNow :Date类
 * @param intervalDays ：间隔天数
 * @param bolPastTime  ：Boolean,判断在参数date之前，还是之后，
 * @description 获取时间段
 */
export const getDateRange = (dateNow, intervalDays, bolPastTime) => {
  let oneDayTime = 24 * 60 * 60 * 1000;
  let list = [];
  let lastDay;

  if (bolPastTime == true) {
    lastDay = new Date(dateNow.getTime() - intervalDays * oneDayTime);
    list.push(formateDate(lastDay));
    list.push(formateDate(dateNow));
  } else {
    lastDay = new Date(dateNow.getTime() + intervalDays * oneDayTime);
    list.push(formateDate(dateNow));
    list.push(formateDate(lastDay));
  }
  return list;
}

export const formateDate = (time) => {
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()

  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  return year + '-' + month + '-' + day + ''
}

//获取当前日期（2020-03-24）
// var date = new Date();
// var list = this.getDateRange(date,6,true)
// console.log("获取近一周日期范围：
// 开始日期:"+list[0]+";
// 结束日期:"+list[1]);

// var list = this.getDateRange(date,30,true)
// console.log("获取近一个月日期范围：
// 开始日期:"+list[0]+";
// 结束日期:"+list[1]);

// var list = this.getDateRange(date,0,true)
// console.log("获取今天日期范围：
// 开始日期:"+list[0]+";
// 结束日期:"+list[1]);

// var list = this.getDateRange(date,1,true)
// console.log("获取昨天日期范围：
// 开始日期:"+list[0]+";
// 结束日期:"+list[0]);

// var list = this.getDateRange(date,6,false)
// console.log("获取下一周日期范围：
// 开始日期:"+list[0]+";
// 结束日期:"+list[1]);

// var list = this.getDateRange(date,30,false)
// console.log("获取下一个月日期范围：
// 开始日期:"+list[0]+";
// 结束日期:"+list[1]);