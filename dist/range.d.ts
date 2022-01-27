import React from 'react';
import { DatepickerConfigs, DatepickerProps } from './utils/commonTypes';
export interface RangeDatepickerProps extends DatepickerProps {
    initDate?: Date;
    selectedDates: Date[];
    minDate?: Date;
    maxDate?: Date;
    configs?: DatepickerConfigs;
    disabled?: boolean;
    onDateChange: (date: Date[]) => void;
    id?: string;
    name?: string;
}
export declare const RangeDatepicker: React.FC<RangeDatepickerProps>;
