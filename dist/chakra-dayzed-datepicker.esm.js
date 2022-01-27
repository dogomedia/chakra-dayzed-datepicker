import React, { Fragment, useRef, useState } from 'react';
import { Button, Stack, VStack, HStack, Heading, Divider, SimpleGrid, Box, useOutsideClick, Popover, PopoverTrigger, Input, PopoverContent, PopoverBody, Flex } from '@chakra-ui/react';
import { useDayzed } from 'dayzed';
import { format } from 'date-fns';
import ArrowKeysReact from 'arrow-keys-react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var Month_Names_Short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var Weekday_Names_Short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var DefaultBtnStyle = {
  variant: 'ghost',
  size: 'sm'
};
var DatepickerBackBtns = function DatepickerBackBtns(props) {
  var _props$propsConfigs;

  var calendars = props.calendars,
      getBackProps = props.getBackProps;
  var customBtnProps = (_props$propsConfigs = props.propsConfigs) == null ? void 0 : _props$propsConfigs.dateNavBtnProps;
  return React.createElement(Fragment, null, React.createElement(Button, _extends({}, getBackProps({
    calendars: calendars,
    offset: 12
  }), DefaultBtnStyle, customBtnProps), '<<'), React.createElement(Button, _extends({}, getBackProps({
    calendars: calendars
  }), DefaultBtnStyle, customBtnProps), '<'));
};
var DatepickerForwardBtns = function DatepickerForwardBtns(props) {
  var _props$propsConfigs2;

  var calendars = props.calendars,
      getForwardProps = props.getForwardProps;
  var customBtnProps = (_props$propsConfigs2 = props.propsConfigs) == null ? void 0 : _props$propsConfigs2.dateNavBtnProps;
  return React.createElement(Fragment, null, React.createElement(Button, _extends({}, getForwardProps({
    calendars: calendars
  }), DefaultBtnStyle, customBtnProps), '>'), React.createElement(Button, _extends({}, getForwardProps({
    calendars: calendars,
    offset: 12
  }), DefaultBtnStyle, customBtnProps), '>>'));
};

var _excluded$2 = ["selectedBg"];
var DayOfMonth = function DayOfMonth(_ref) {
  var dateObj = _ref.dateObj,
      propsConfigs = _ref.propsConfigs,
      isInRange = _ref.isInRange,
      renderProps = _ref.renderProps,
      onMouseEnter = _ref.onMouseEnter;
  var date = dateObj.date,
      selected = dateObj.selected,
      selectable = dateObj.selectable,
      today = dateObj.today;
  var getDateProps = renderProps.getDateProps;

  var _ref2 = (propsConfigs == null ? void 0 : propsConfigs.dayOfMonthBtnProps) || {},
      selectedBg = _ref2.selectedBg,
      customBtnProps = _objectWithoutPropertiesLoose(_ref2, _excluded$2);

  var bg = selected || isInRange ? selectedBg || 'purple.200' : 'transparent';
  bg = !selectable ? (customBtnProps == null ? void 0 : customBtnProps.disabledBg) || 'red.200' : bg;
  var halfGap = 0.125; //default Chakra-gap-space-1 is 0.25rem

  return React.createElement(Button, _extends({}, getDateProps({
    dateObj: dateObj,
    disabled: !selectable,
    onMouseEnter: onMouseEnter
  }), {
    disabled: !selectable,
    size: "sm",
    variant: "outline",
    bg: bg,
    _hover: {
      bg: 'purple.400'
    },
    // this intends to fill the visual gap from Grid to improve the UX
    // so the button active area is actually larger than when it's seen
    _after: {
      content: "''",
      position: 'absolute',
      top: "-" + halfGap + "rem",
      left: "-" + halfGap + "rem",
      bottom: "-" + halfGap + "rem",
      right: "-" + halfGap + "rem",
      borderWidth: halfGap + "rem",
      borderColor: 'transparent'
    }
  }, customBtnProps, {
    borderColor: today ? (customBtnProps == null ? void 0 : customBtnProps.borderColor) || 'blue.400' : 'transparent'
  }), selectable ? date.getDate() : 'X');
};

var CalendarPanel = function CalendarPanel(_ref) {
  var renderProps = _ref.renderProps,
      configs = _ref.configs,
      propsConfigs = _ref.propsConfigs,
      onMouseEnterHighlight = _ref.onMouseEnterHighlight,
      isInRange = _ref.isInRange;
  var calendars = renderProps.calendars,
      getBackProps = renderProps.getBackProps,
      getForwardProps = renderProps.getForwardProps;

  if (calendars.length <= 0) {
    return null;
  }

  return React.createElement(Stack, {
    className: "datepicker-calendar",
    direction: ['column', 'column', 'row']
  }, calendars.map(function (calendar) {
    return React.createElement(VStack, {
      key: "" + calendar.month + calendar.year,
      height: "100%",
      borderWidth: "1px",
      padding: "5px 10px"
    }, React.createElement(HStack, null, React.createElement(DatepickerBackBtns, {
      calendars: calendars,
      getBackProps: getBackProps,
      propsConfigs: propsConfigs
    }), React.createElement(Heading, {
      size: "sm",
      textAlign: "center"
    }, configs.monthNames[calendar.month], " ", calendar.year), React.createElement(DatepickerForwardBtns, {
      calendars: calendars,
      getForwardProps: getForwardProps,
      propsConfigs: propsConfigs
    })), React.createElement(Divider, null), React.createElement(SimpleGrid, {
      columns: 7,
      spacing: 1,
      textAlign: "center"
    }, configs.dayNames.map(function (day) {
      return React.createElement(Box, {
        fontSize: "sm",
        fontWeight: "semibold",
        key: "" + calendar.month + calendar.year + day
      }, day);
    }), calendar.weeks.map(function (week, weekIdx) {
      return week.map(function (dateObj, index) {
        var key = "" + calendar.month + calendar.year + weekIdx + index;
        if (!dateObj) return React.createElement(Box, {
          key: key
        });
        var date = dateObj.date;
        return React.createElement(DayOfMonth, {
          key: key,
          dateObj: dateObj,
          propsConfigs: propsConfigs,
          renderProps: renderProps,
          isInRange: isInRange && isInRange(date),
          onMouseEnter: function onMouseEnter() {
            if (onMouseEnterHighlight) onMouseEnterHighlight(date);
          }
        });
      });
    })));
  }));
};

var _excluded$1 = ["configs", "propsConfigs"];
var DefaultConfigs$1 = {
  dateFormat: 'yyyy-MM-dd',
  monthNames: Month_Names_Short,
  dayNames: Weekday_Names_Short
};
var SingleDatepicker = function SingleDatepicker(_ref) {
  var _ref$configs = _ref.configs,
      configs = _ref$configs === void 0 ? DefaultConfigs$1 : _ref$configs,
      propsConfigs = _ref.propsConfigs,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  var date = props.date,
      name = props.name,
      disabled = props.disabled,
      onDateChange = props.onDateChange,
      id = props.id; // chakra popover utils

  var ref = useRef(null);
  var initialFocusRef = useRef(null);

  var _useState = useState(false),
      popoverOpen = _useState[0],
      setPopoverOpen = _useState[1];

  useOutsideClick({
    ref: ref,
    handler: function handler() {
      return setPopoverOpen(false);
    }
  }); // dayzed utils

  var handleOnDateSelected = function handleOnDateSelected(_ref2) {
    var selectable = _ref2.selectable,
        date = _ref2.date;
    if (!selectable) return;

    if (date instanceof Date && !isNaN(date.getTime())) {
      onDateChange(date);
      setPopoverOpen(false);
      return;
    }
  };

  var dayzedData = useDayzed({
    showOutsideDays: true,
    onDateSelected: handleOnDateSelected,
    selected: date
  });
  return React.createElement(Popover, {
    placement: "bottom-start",
    variant: "responsive",
    isOpen: popoverOpen,
    onClose: function onClose() {
      return setPopoverOpen(false);
    },
    initialFocusRef: initialFocusRef,
    isLazy: true
  }, React.createElement(PopoverTrigger, null, React.createElement(Input, _extends({
    id: id,
    autoComplete: "off",
    isDisabled: disabled,
    ref: initialFocusRef,
    onClick: function onClick() {
      return setPopoverOpen(!popoverOpen);
    },
    name: name,
    value: date ? format(date, configs.dateFormat) : '',
    onChange: function onChange(e) {
      return e.target.value;
    }
  }, propsConfigs == null ? void 0 : propsConfigs.inputProps))), React.createElement(PopoverContent, {
    ref: ref,
    width: "100%"
  }, React.createElement(PopoverBody, null, React.createElement(CalendarPanel, {
    renderProps: dayzedData,
    configs: configs,
    propsConfigs: propsConfigs
  }))));
};

var _excluded = ["configs", "propsConfigs", "initDate", "id", "name"];

var RangeCalendarPanel = function RangeCalendarPanel(_ref) {
  var configs = _ref.configs,
      propsConfigs = _ref.propsConfigs,
      selected = _ref.selected,
      renderProps = _ref.renderProps;

  var _useState = useState(null),
      hoveredDate = _useState[0],
      setHoveredDate = _useState[1];

  var calendars = renderProps.calendars; // looking for a useRef() approach to replace it

  var getKeyOffset = function getKeyOffset(num) {
    var e = document.activeElement;
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function (el, i) {
      var newNodeKey = i + num;

      if (el === e) {
        if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
          buttons[newNodeKey].focus();
        } else {
          buttons[0].focus();
        }
      }
    });
  };

  ArrowKeysReact.config({
    left: function left() {
      getKeyOffset(-1);
    },
    right: function right() {
      getKeyOffset(1);
    },
    up: function up() {
      getKeyOffset(-7);
    },
    down: function down() {
      getKeyOffset(7);
    }
  }); // Calendar level

  var onMouseLeave = function onMouseLeave() {
    setHoveredDate(null);
  }; // Date level


  var onMouseEnterHighlight = function onMouseEnterHighlight(date) {
    if (!Array.isArray(selected) || !(selected != null && selected.length)) {
      return;
    }

    setHoveredDate(date);
  };

  var isInRange = function isInRange(date) {
    if (!Array.isArray(selected) || !(selected != null && selected.length)) {
      return false;
    }

    var firstSelected = selected[0];

    if (selected.length === 2) {
      var secondSelected = selected[1];
      return firstSelected < date && secondSelected > date;
    } else {
      return hoveredDate && (firstSelected < date && hoveredDate >= date || date < firstSelected && date >= hoveredDate);
    }
  };

  if (!(calendars.length > 0)) return null;
  return React.createElement(Flex, _extends({}, ArrowKeysReact.events, {
    onMouseLeave: onMouseLeave
  }), React.createElement(CalendarPanel, {
    renderProps: renderProps,
    configs: configs,
    propsConfigs: propsConfigs,
    isInRange: isInRange,
    onMouseEnterHighlight: onMouseEnterHighlight
  }));
};

var DefaultConfigs = {
  dateFormat: 'MM/dd/yyyy',
  monthNames: Month_Names_Short,
  dayNames: Weekday_Names_Short
};
var RangeDatepicker = function RangeDatepicker(_ref2) {
  var _ref2$configs = _ref2.configs,
      configs = _ref2$configs === void 0 ? DefaultConfigs : _ref2$configs,
      _ref2$propsConfigs = _ref2.propsConfigs,
      propsConfigs = _ref2$propsConfigs === void 0 ? {} : _ref2$propsConfigs,
      _ref2$initDate = _ref2.initDate,
      initDate = _ref2$initDate === void 0 ? new Date() : _ref2$initDate,
      id = _ref2.id,
      name = _ref2.name,
      props = _objectWithoutPropertiesLoose(_ref2, _excluded);

  var selectedDates = props.selectedDates,
      minDate = props.minDate,
      maxDate = props.maxDate,
      onDateChange = props.onDateChange,
      disabled = props.disabled; // chakra popover utils

  var ref = useRef(null);
  var initialFocusRef = useRef(null);

  var _useState2 = useState(false),
      popoverOpen = _useState2[0],
      setPopoverOpen = _useState2[1];

  useOutsideClick({
    ref: ref,
    handler: function handler() {
      return setPopoverOpen(false);
    }
  }); // dayzed utils

  var handleOnDateSelected = function handleOnDateSelected(_ref3) {
    var selectable = _ref3.selectable,
        date = _ref3.date;

    if (!selectable) {
      return;
    }

    var newDates = [].concat(selectedDates);

    if (selectedDates.length) {
      if (selectedDates.length === 1) {
        var firstTime = selectedDates[0];

        if (firstTime < date) {
          newDates.push(date);
        } else {
          newDates.unshift(date);
        }

        onDateChange(newDates);
      } else if (newDates.length === 2) {
        onDateChange([date]);
      }
    } else {
      newDates.push(date);
      onDateChange(newDates);
    }
  };

  var dayzedData = useDayzed({
    onDateSelected: handleOnDateSelected,
    selected: selectedDates,
    monthsToDisplay: 2,
    date: initDate,
    minDate: minDate,
    maxDate: maxDate
  }); // eventually we want to allow user to freely type their own input and parse the input

  var intVal = selectedDates[0] ? "" + format(selectedDates[0], configs.dateFormat) : '';
  intVal += selectedDates[1] ? " - " + format(selectedDates[1], configs.dateFormat) : '';
  return React.createElement(Popover, {
    placement: "bottom-start",
    variant: "responsive",
    isOpen: popoverOpen,
    onClose: function onClose() {
      return setPopoverOpen(false);
    },
    initialFocusRef: initialFocusRef,
    isLazy: true
  }, React.createElement(PopoverTrigger, null, React.createElement(Input, _extends({
    id: id,
    autoComplete: "off",
    isDisabled: disabled,
    ref: initialFocusRef,
    onClick: function onClick() {
      return setPopoverOpen(!popoverOpen);
    },
    name: name,
    value: intVal,
    onChange: function onChange(e) {
      return e.target.value;
    }
  }, propsConfigs.inputProps))), React.createElement(PopoverContent, {
    ref: ref,
    width: "100%"
  }, React.createElement(PopoverBody, null, React.createElement(RangeCalendarPanel, {
    renderProps: dayzedData,
    configs: configs,
    propsConfigs: propsConfigs,
    selected: selectedDates
  }))));
};

export { RangeDatepicker, SingleDatepicker };
//# sourceMappingURL=chakra-dayzed-datepicker.esm.js.map
