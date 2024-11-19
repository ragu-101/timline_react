import React, { useState, useMemo } from "react";
import {
  Calendar,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import classes from "./scss/mycalender.module.scss";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import data from "./datas/data.json";
import TwoDay from "./Twoday";
import TwoWeeks from "./TwoWeeks";

const localizer = momentLocalizer(moment);

const events = [
  ...data.layers[0].layers.map((itemin) => {
    return {
      start: moment(itemin.startDate).toDate(),
      end: moment(itemin.endDate).toDate(),
      title:
        itemin.userId === 24
          ? "John M"
          : itemin.userId === 23
          ? "Jack A"
          : "Richard M",
    };
  }),
  ...data.layers[1].layers.map((itemin) => {
    return {
      start: moment(itemin.startDate).toDate(),
      end: moment(itemin.endDate).toDate(),
      title:
        itemin.userId === 24
          ? "John M"
          : itemin.userId === 23
          ? "Jack A"
          : "Richard M",
    };
  }),
  ...data.finalSchedule.map((item)=>{
    return {
        start: moment(item.startDate).toDate(),
        end: moment(item.endDate).toDate(),
        title:
          item.userId === 24
            ? "John M"
            : item.userId === 23
            ? "Jack A"
            : "Richard M",
      };
  })
];

const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const colorarr = ["red", "green", "blue"];

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor:
          event.title === "John M"
            ? colorarr[0]
            : event.title === "Jack A"
            ? colorarr[1]
            : colorarr[2],
      },
    };
  };

  return (
    <div className={classes.calendercontainer}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        onNavigate={(date) => setCurrentDate(date)}
        showMultiDayTimes={true}
        defaultView="month"
        views={{
          day: true,
          twoday:TwoDay,
          week: true,
          twoweeks:TwoWeeks,
          month: true,
        }}
        components={{
          toolbar: (props) => <Customheader {...props} />,
        }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default MyCalendar;

function Customheader({ onView, onNavigate, label }) {
    const [active,setActive] = useState('onemonth');
  return (
    <>
      <div className={classes.headerrow}>
        <div className={classes.headerright}>
          <Button variant="outlined" onClick={() => {onNavigate("TODAY")}}>
            Today
          </Button>
          <Button variant="outlined" onClick={() => { onNavigate("PREV")}}>
            {" "}
            <NavigateBeforeIcon />{" "}
          </Button>
          <Button variant="outlined" onClick={() => { onNavigate("NEXT")}}>
            <NavigateNextIcon />
          </Button>
        </div>
        <span className={classes.currentview}>{label}</span>
        <div className={classes.headerleft}>
          <Button  variant={active === 'oneday' ? 'contained' : 'outlined'} onClick={() => {setActive('oneday'); onView("day")}}>
            1 Day
          </Button>
          <Button  variant={active === 'twoday' ? 'contained' : 'outlined'} onClick={() => {setActive('twoday'); onView("twoday")}}>
            2 Day
          </Button>
          <Button  variant={active === 'oneweek' ? 'contained' : 'outlined'} onClick={() => {setActive('oneweek'); onView("week")}}>
            1 Week
          </Button>
          <Button  variant={active === 'twoweek' ? 'contained' : 'outlined'} onClick={() => {setActive('twoweek'); onView("twoweeks")}}>
            2 Week
          </Button>
          <Button
            variant={active === 'onemonth' ? 'contained' : 'outlined'}
            onClick={() => {setActive('onemonth'); onView("month")}}
          >
            1 Month
          </Button>
        </div>
      </div>
    </>
  );
}
