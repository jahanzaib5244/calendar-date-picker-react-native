"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _styles = require("./styles");
var _reactNativeCalendars = require("react-native-calendars");
var _moment = _interopRequireDefault(require("moment"));
var _useDatePicker = require("./useDatePicker");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  const [markedDates, setmarkedDates] = (0, _react.useState)({});
  const [startDate, setstartDate] = (0, _react.useState)(null);
  const [endDate, setendDate] = (0, _react.useState)(null);
  const [currentMonth, setcurrentMonth] = (0, _react.useState)((0, _moment.default)().format('MMMM'));

  // calender view type
  const Root = (0, _react.useCallback)(_ref => {
    let {
      children
    } = _ref;
    if (type === 'modal') {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
        visible: props?.visible,
        onRequestClose: props?.onCancel,
        animationType: "fade"
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.styles.modal_overlay, {
          backgroundColor: props?.theme?.modalOverlayColor ?? 'rgba(0,0,0,0.5)'
        }, props?.style?.modalOverlay]
      }, children));
    } else {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, children);
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
          let dateString = (0, _moment.default)(date).format('YYYY-MM-DD');
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.styles.footer, props?.style?.footerContainer]
    }, props?.cancelButton ? props.cancelButton : /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      onPress: props?.onCancel,
      style: [_styles.styles.footer_btn, props?.style?.footerButton]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [_styles.styles.footer_btn_txt, {
        color: props?.theme?.footerButtonTextColor ?? 'blue'
      }, props?.style?.footerButtonText]
    }, props?.cancelButtonText ?? 'Cancel')), props?.confirmButton ? props.confirmButton : /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      onPress: props?.onConfirm,
      style: [_styles.styles.footer_btn, props?.style?.footerButton]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [_styles.styles.footer_btn_txt, {
        color: props?.theme?.footerButtonTextColor ?? 'blue'
      }, props?.style?.footerButtonText]
    }, props?.cancelButtonText ?? 'Ok')));
  };
  const Header = header => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, header, {
      style: [_styles.styles.header, style?.header]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.styles.headerButtonContainer, style?.headerButtonsContainer]
    }, !hideArrows && showLeftArrow && /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      onPress: () => !!header?.addMonth ? header?.addMonth(-1) : {},
      style: [_styles.styles.arrow_button, style?.headerButton, style?.leftArrowButton]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: [_styles.styles.arrow, style?.arrow, style?.leftArrow],
      source: require('./assets/left-arrow.png')
    })), showTitle && title ? title : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [_styles.styles.title, style?.Title]
    }, currentMonth), !hideArrows && showRightArrow && /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      onPress: () => !!header?.addMonth ? header?.addMonth(1) : {},
      style: [_styles.styles.arrow_button, style?.headerButton, style?.RightArrowButton]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: [_styles.styles.arrow, style?.arrow, style?.rightArrow],
      source: require('./assets/right-arrow.png')
    }))), showWeekDays && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.styles.days_container, style?.daysContainer]
    }, (dayNames && dayNames.length === 7 ? dayNames : _useDatePicker.days).map((item, index) => {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        key: index,
        style: [_styles.styles.day_name, {
          color: theme?.titleColor ?? 'black'
        }, style?.dayName]
      }, item);
    })));
  };
  return /*#__PURE__*/_react.default.createElement(Root, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.styles.wrapper, props?.style?.calendarWrapper]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeCalendars.Calendar, _extends({}, rest, {
    onDayPress: day => onPressDay(day.dateString),
    current: props?.current ?? (0, _moment.default)().format('YYYY-MM-DD'),
    initialDate: props?.initialDate ?? '',
    minDate: props?.minDate ?? '',
    maxDate: props?.maxDate ?? '',
    style: [_styles.styles.calender_wrapper, props?.style?.calender],
    markedDates: markedDates,
    enableSwipeMonths: true,
    hideExtraDays: props?.hideExtraDays ?? false,
    showSixWeeks: props?.showSixWeeks ?? false,
    disableArrowLeft: true,
    disableArrowRight: true,
    onMonthChange: e => {
      setcurrentMonth((0, _moment.default)(e.timestamp).format('MMMM'));
    },
    markingType: markingType ? markingType : mode === 'rangePicker' ? 'period' : undefined,
    customHeader: e =>
    // props includes header , render props header
    !!header ? header(e, currentMonth) : /*#__PURE__*/_react.default.createElement(Header, e)
  })), props?.footer ? props.footer : props?.type === 'modal' && showFooter && /*#__PURE__*/_react.default.createElement(Footer, null)));
};
var _default = exports.default = DatePicker;
//# sourceMappingURL=DatePicker.js.map