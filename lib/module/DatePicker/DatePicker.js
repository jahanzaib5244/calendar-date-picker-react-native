function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { View, Text, Modal, Pressable, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { styles } from './styles';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { days } from './useDatePicker';
const DatePicker = props => {
  const {
    type = 'modal',
    showFooter = props?.type === 'modal',
    current,
    initialDate,
    minDate,
    maxDate,
    style,
    mode = 'single',
    theme,
    markingType,
    showLeftArrow = true,
    showRightArrow = true,
    hideArrows = false,
    showWeekDays = true,
    showTitle = true,
    header,
    dayNames,
    title,
    onChnage,
    ...rest
  } = props;
  const [markedDates, setmarkedDates] = useState({});
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [currentMonth, setcurrentMonth] = useState(moment().format('MMMM'));

  // calender view type
  const Root = useCallback(_ref => {
    let {
      children
    } = _ref;
    if (type === 'modal') {
      return /*#__PURE__*/React.createElement(Modal, {
        visible: props?.visible,
        onRequestClose: props?.onCancel,
        transparent: true,
        animationType: "fade"
      }, /*#__PURE__*/React.createElement(View, {
        style: [styles.modal_overlay, {
          backgroundColor: props?.theme?.modalOverlayColor ?? 'rgba(0,0,0,0.5)'
        }, props?.style?.modalOverlay]
      }, children));
    } else {
      return /*#__PURE__*/React.createElement(View, null, children);
    }
  }, [props]);

  // on press any date
  const onPressDay = selected => {
    // if mode is single markedDates always store ony one date element
    if (mode === 'single') {
      setmarkedDates({
        [selected]: {
          selected: true,
          selectedColor: theme?.selectedDateColor ?? 'blue'
        }
      });
      // return single date as string
      onChnage(selected);
    } else {
      if (!startDate || startDate && endDate) {
        // If start date is not set or both start and end dates are set,
        // set the selected date as the start date.
        setstartDate(selected);
        setendDate(null);
        setmarkedDates({
          [selected]: {
            selected: true,
            color: theme?.selectedDateBackground ?? 'blue',
            customTextStyle: {
              color: theme?.selectedDateColor ?? 'white',
              ...style?.customTextStyle
            },
            customContainerStyle: style?.customContainerStyle
          }
        });
      } else {
        // If start date is set but end date is not set, set the selected date as the end date.
        let range = {};
        // start date
        let date = new Date(startDate);
        // end date
        let end = new Date(selected);
        // select all dates between start and end
        while (date <= end) {
          let dateString = moment(date).format('YYYY-MM-DD');
          range[dateString] = {
            type: 'period',
            // selectedTextColor: props?.theme?.selectedDateColor ?? 'green',
            startingDay: startDate === dateString,
            endingDay: selected === dateString,
            selected: true,
            color: theme?.selectedDateBackground ?? 'blue',
            customTextStyle: {
              color: theme?.selectedDateColor ?? 'white',
              ...style?.customTextStyle
            },
            customContainerStyle: style?.customContainerStyle
          };
          date.setDate(date.getDate() + 1);
        }
        setendDate(selected);
        // return all selected dates in array of strings
        props.onChnage(Object.keys(range));
        setmarkedDates(range);
      }
    }
  };
  const Footer = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.footer, props?.style?.footerContainer]
    }, props?.cancelButton ? props.cancelButton : /*#__PURE__*/React.createElement(Pressable, {
      onPress: props?.onCancel,
      style: [styles.footer_btn, props?.style?.footerButton]
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.footer_btn_txt, {
        color: props?.theme?.footerButtonTextColor ?? 'blue'
      }, props?.style?.footerButtonText]
    }, props?.cancelButtonText ?? 'Cancel')), props?.confirmButton ? props.confirmButton : /*#__PURE__*/React.createElement(Pressable, {
      onPress: props?.onConfirm,
      style: [styles.footer_btn, props?.style?.footerButton]
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.footer_btn_txt, {
        color: props?.theme?.footerButtonTextColor ?? 'blue'
      }, props?.style?.footerButtonText]
    }, props?.cancelButtonText ?? 'Ok')));
  };
  const Header = header => {
    return /*#__PURE__*/React.createElement(View, _extends({}, header, {
      style: [styles.header, style?.header]
    }), /*#__PURE__*/React.createElement(View, {
      style: [styles.headerButtonContainer, style?.headerButtonsContainer]
    }, !hideArrows && showLeftArrow && /*#__PURE__*/React.createElement(Pressable, {
      onPress: () => !!header?.addMonth ? header?.addMonth(-1) : {},
      style: [styles.arrow_button, style?.headerButton, style?.leftArrowButton]
    }, /*#__PURE__*/React.createElement(Image, {
      style: [styles.arrow, style?.arrow, style?.leftArrow],
      source: require('./assets/left-arrow.png')
    })), showTitle && title ? title : /*#__PURE__*/React.createElement(Text, {
      style: [styles.title, style?.Title]
    }, currentMonth), !hideArrows && showRightArrow && /*#__PURE__*/React.createElement(Pressable, {
      onPress: () => !!header?.addMonth ? header?.addMonth(1) : {},
      style: [styles.arrow_button, style?.headerButton, style?.RightArrowButton]
    }, /*#__PURE__*/React.createElement(Image, {
      style: [styles.arrow, style?.arrow, style?.rightArrow],
      source: require('./assets/right-arrow.png')
    }))), showWeekDays && /*#__PURE__*/React.createElement(View, {
      style: [styles.days_container, style?.daysContainer]
    }, (dayNames && dayNames.length === 7 ? dayNames : days).map((item, index) => {
      return /*#__PURE__*/React.createElement(Text, {
        key: index,
        style: [styles.day_name, {
          color: theme?.titleColor ?? 'black'
        }, style?.dayName]
      }, item);
    })));
  };
  return /*#__PURE__*/React.createElement(Root, null, /*#__PURE__*/React.createElement(View, {
    style: [styles.wrapper, props?.style?.calendarWrapper]
  }, /*#__PURE__*/React.createElement(Calendar, _extends({}, rest, {
    onDayPress: day => onPressDay(day.dateString),
    current: props?.current ?? moment().format('YYYY-MM-DD'),
    initialDate: props?.initialDate ?? '',
    minDate: props?.minDate ?? '',
    maxDate: props?.maxDate ?? '',
    style: [styles.calender_wrapper, props?.style?.calender],
    markedDates: markedDates,
    enableSwipeMonths: true,
    hideExtraDays: props?.hideExtraDays ?? false,
    showSixWeeks: props?.showSixWeeks ?? false,
    disableArrowLeft: true,
    disableArrowRight: true,
    onMonthChange: e => {
      setcurrentMonth(moment(e.timestamp).format('MMMM'));
    },
    markingType: markingType ? markingType : mode === 'rangePicker' ? 'period' : undefined,
    customHeader: e =>
    // props includes header , render props header
    !!header ? header(e, currentMonth) : /*#__PURE__*/React.createElement(Header, e)
  })), props?.footer ? props.footer : props?.type === 'modal' && showFooter && /*#__PURE__*/React.createElement(Footer, null)));
};
export default DatePicker;
//# sourceMappingURL=DatePicker.js.map