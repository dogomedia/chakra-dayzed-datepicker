import { RenderProps } from 'dayzed';
import React from 'react';
import { DatepickerConfigs, DatepickerProps } from '../utils/commonTypes';
interface CalendarPanelProps extends DatepickerProps {
    renderProps: RenderProps;
    configs: DatepickerConfigs;
    onMouseEnterHighlight?: (date: Date) => void;
    isInRange?: (date: Date) => boolean | null;
}
export declare const CalendarPanel: React.FC<CalendarPanelProps>;
export {};