import getMonthText from "./getMonthText";

const getTimeChat = (time) => {
  let maniTime = "";
  let ampm = "";
  let nowTime = new Date(new Date().getTime());
  let timeChat = new Date(new Date(time).getTime());
  let objTimeChat = {
    year: timeChat.getFullYear(),
    day: timeChat.getDate(),
    month: timeChat.getMonth(),
    hour: timeChat.getHours(),
    minute: timeChat.getMinutes(),
  };
  let objNowTime = {
    year: nowTime.getFullYear(),
    day: nowTime.getDate(),
    month: nowTime.getMonth(),
    hour: nowTime.getHours(),
    minute: nowTime.getMinutes(),
  };

  if (
    objTimeChat.day == objNowTime.day &&
    objTimeChat.month == objNowTime.month &&
    objTimeChat.year == objNowTime.year
  ) {
    if (objTimeChat.hour < 12) {
      ampm = "am";
    } else {
      ampm = "pm";
    }
    maniTime = `${objTimeChat.hour}:${
      objTimeChat.minute < 10 ? "0" + objTimeChat.minute : objTimeChat.minute
    } ${ampm}`;
  } else {
    if (objTimeChat.hour < 12) {
      ampm = "am";
    } else {
      ampm = "pm";
    }

    maniTime = `${getMonthText(objTimeChat.month)} ${objTimeChat.day} / ${
      objTimeChat.hour
    }:${
      objTimeChat.minute < 10 ? "0" + objTimeChat.minute : objTimeChat.minute
    } ${ampm}`;
  }
  return maniTime;
};

export default getTimeChat;
