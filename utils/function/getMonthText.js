function getMonthText(months) {
  let maniMonths = "";
  switch (months) {
    case 0:
      maniMonths = "Jan";
      break;
    case 1:
      maniMonths = "Feb";
      break;
    case 2:
      maniMonths = "Mar";
      break;
    case 3:
      maniMonths = "Apr";
      break;
    case 4:
      maniMonths = "Mei";
      break;
    case 5:
      maniMonths = "Jun";
      break;
    case 6:
      maniMonths = "Jul";
      break;
    case 7:
      maniMonths = "Aug";
      break;
    case 8:
      maniMonths = "Sep";
      break;
    case 9:
      maniMonths = "Oct";
      break;
    case 10:
      maniMonths = "Nov";
      break;
    case 11:
      maniMonths = "Dec";
      break;
    default:
      maniMonths = "-";
      break;
  }
  return maniMonths;
}

export default getMonthText;
