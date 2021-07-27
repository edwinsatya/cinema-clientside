export default function CardWithReply(props) {
  const { discussion } = props;

  const getTime = (time) => {
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
      maniTime = `${objTimeChat.hour}:${objTimeChat.minute} ${ampm}`;
    } else {
      if (objTimeChat.hour < 12) {
        ampm = "am";
      } else {
        ampm = "pm";
      }

      maniTime = `${getMonthText(objTimeChat.month)} ${
        objTimeChat.day
      } / ${objTimeChat} ${ampm}`;
    }
    return maniTime;
  };

  return (
    <div className="flex text-sm my-2">
      <div className="flex justify-start items-start">
        <div
          className="rounded-md p-3"
          style={{ backgroundColor: discussion.userId.color }}
        >
          <span className="font-bold uppercase text-white leading-relaxed tracking-widest">
            {discussion.userId.name.substr(0, 2)}
          </span>
        </div>
      </div>
      <div className="pl-2 w-full flex flex-col">
        <div className="flex justify-between items-center">
          <span
            className="capitalize"
            style={{ color: discussion.userId.color }}
          >
            {discussion.userId.name}
          </span>
          <span>{getTime(discussion.updatedAt)}</span>
        </div>
        <div
          className="my-2 border-l-4 p-2 flex flex-col"
          style={{ borderColor: discussion.replied.userId.color }}
        >
          <div className="flex justify-start items-center">
            <span
              className="capitalize"
              style={{ color: discussion.replied.userId.color }}
            >
              {discussion.replied.userId.name}
            </span>
            <span className="ml-2">
              {getTime(discussion.replied.updatedAt)}
            </span>
          </div>
          <div className="py-2">
            <span>{discussion.replied.discussion}</span>
          </div>
        </div>
        <div>
          <span>{discussion.discussion}</span>
        </div>
      </div>
    </div>
  );
}
