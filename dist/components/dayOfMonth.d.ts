import { DateObj, RenderProps } from 'dayzed';
import React from 'react';
import { DatepickerProps } from '../utils/commonTypes';
interface DayOfMonthProps extends DatepickerProps {
    renderProps: RenderProps;
    isInRange?: boolean | null;
    dateObj: DateObj;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export declare const DayOfMonth: React.FC<DayOfMonthProps>;
export {};
