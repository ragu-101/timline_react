import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";

export default function TwoDay({
  date,
  localizer,
  max = localizer.endOf(new Date(), "day"),
  min = localizer.startOf(new Date(), "day"),
  scrollToTime = localizer.startOf(new Date(), "day"),
  ...props
}) {
  const currRange = useMemo(
    () => TwoDay.range(date, { localizer }),
    [date, localizer]
  );

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  );
}

TwoDay.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
};

TwoDay.range = (date, { localizer }) => {
  const start = new Date(date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);

  const range = [start, end];

  return range;
};

TwoDay.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -2, "day");

    case Navigate.NEXT:
      return localizer.add(date, 2, "day");

    default:
      return date;
  }
};

TwoDay.title = (date, { localizer }) => {
  const [start, ...rest] = TwoDay.range(date, { localizer });
  return localizer.format({ start, end: rest.pop() }, "dayRangeHeaderFormat");
};
