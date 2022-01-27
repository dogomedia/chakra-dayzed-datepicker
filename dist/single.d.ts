import React from 'react';
import { DatepickerConfigs, DatepickerProps } from './utils/commonTypes';
export interface SingleDatepickerProps extends DatepickerProps {
    date?: Date;
    configs?: DatepickerConfigs;
    disabled?: boolean;
    onDateChange: (date: Date) => void;
    id?: string;
    name?: string;
}
export declare const SingleDatepicker: React.FC<SingleDatepickerProps>;
