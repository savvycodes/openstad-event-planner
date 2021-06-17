import * as React from 'react';
import { ErrorMessage } from 'formik';
import DatePicker from 'react-multi-date-picker';

import { FormItem } from '../../../components/forms/input';
import { Label, Paragraph } from '../../../components/text/text';
import { DFlex } from '../../../components/layout/layout';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { defaultTheme } from '../../../theme/theme';

export function DateTimeSelector() {
  return (
    <DFlex>
      <FormItem>
        <Label>
          <DatePicker
            placeholder="start datum en tijd"
            format="D MMM - HH:mm"
            months={[
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
            ]}
            weekDays={['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za']}
            weekStartDayIndex={1}
            plugins={[<TimePicker hideSeconds position="bottom" />]}
            containerStyle={{ width: '100%', display: 'block' }}
            style={{
              border: 'none',
              boxShadow: defaultTheme.effects.boxShadowPrimary,
              borderRadius: 0,
              padding: '16px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <Paragraph>
            <ErrorMessage name="dates" />
          </Paragraph>
        </Label>
      </FormItem>
      <FormItem>
        <Label>
          <DatePicker
            placeholder="eind datum en tijd"
            format="D MMMM  |  HH:mm"
            months={[
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
            ]}
            weekDays={['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za']}
            weekStartDayIndex={1}
            plugins={[<TimePicker hideSeconds position="bottom" />]}
            containerStyle={{ width: '100%', display: 'block' }}
            style={{
              border: 'none',
              boxShadow: defaultTheme.effects.boxShadowPrimary,
              borderRadius: 0,
              padding: '16px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <Paragraph>
            <ErrorMessage name="dates" />
          </Paragraph>
        </Label>
      </FormItem>
    </DFlex>
  );
}
