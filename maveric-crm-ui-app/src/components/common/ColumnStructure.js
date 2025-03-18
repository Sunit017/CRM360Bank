export const DateFilterComparator = (filterLocalDateAtMidnight, cellValue) => {
  var dateParts = cellValue.split("/");
  var day = Number(dateParts[2]);
  var month = Number(dateParts[1]) - 1;
  var year = Number(dateParts[0]);
  var cellDate = new Date(day, month, year);

  // Now that both parameters are Date objects, we can compare
  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  } else if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  } else {
    return 0;
  }
};

export const TEXT_FILTER_PARAMS = {
  filter: "agTextColumnFilter",
  filterParams: {
    suppressAndOrCondition: true,
  },
};
export const SORT_PARAMS = {
  sortable: true,
};
export const NUMBER_FILTER_PARAMS = {
  filter: "agNumberColumnFilter",
  filterParams: {
    suppressAndOrCondition: true,
  },
};
export const DATE_FILTER_PARAMS = {
  filter: "agDateColumnFilter",
  filterParams: {
    suppressAndOrCondition: true,
    comparator: DateFilterComparator,
  },
};
