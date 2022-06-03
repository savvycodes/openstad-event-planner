import * as React from 'react';
import { getIn, useFormikContext, ErrorMessage } from 'formik';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

import { FormItem } from '../../../components/forms/input';
import { Label, Paragraph } from '../../../components/text/text';
import { DFlex } from '../../../components/layout/layout';
import { useTheme } from '../../../theme/theme';

export function DateTimeSelector({ name }: any) {
  const theme = useTheme();
  const formik = useFormikContext<any>();

  const months = [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'December',
  ];
  const days = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];

  return (
    <DFlex>
      <FormItem>
        <Label>
          <DatePicker
            onChange={(date: DateObject) => {
              formik.setFieldValue(`${name}.startTime`, date.toDate());
            }}
            value={getIn(formik.values, `${name}.startTime`)}
            placeholder="start datum en tijd"
            format="D MMM - HH:mm"
            months={months}
            weekDays={days}
            minDate={new Date()}
            weekStartDayIndex={1}
            plugins={[<TimePicker hideSeconds position="bottom" />]}
            containerStyle={{ width: '100%', display: 'block' }}
            style={{
              border: 'none',
              boxShadow: theme.effects.boxShadowPrimary,
              borderRadius: 0,
              padding: '16px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <Paragraph>
            <ErrorMessage name={`${name}.startTime`} />
          </Paragraph>
        </Label>
      </FormItem>
      <FormItem>
        <Label>
          <DatePicker
            onChange={(date: DateObject) => {
              formik.setFieldValue(`${name}.endTime`, date.toDate());
            }}
            value={getIn(formik.values, `${name}.endTime`)}
            placeholder="eind datum en tijd"
            format="D MMM - HH:mm"
            minDate={new Date()}
            months={months}
            weekDays={days}
            weekStartDayIndex={1}
            plugins={[<TimePicker hideSeconds position="bottom" />]}
            containerStyle={{ width: '100%', display: 'block' }}
            style={{
              border: 'none',
              boxShadow: theme.effects.boxShadowPrimary,
              borderRadius: 0,
              padding: '16px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <Paragraph>
            <ErrorMessage name={`${name}.endTime`} />
          </Paragraph>
        </Label>
      </FormItem>
    </DFlex>
  );
}
