import * as React from 'react';
import { getIn, useFormikContext, ErrorMessage } from 'formik';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';

import '../../../styles/date-picker.css';

export function DateTimeSelector({ name }: any) {
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
    <div className="date-picker__input">
      <div>
        <label>Van:</label>
        <DatePicker
          onChange={(date: DateObject) => {
            formik.setFieldValue(`${name}.startTime`, date.toDate());
          }}
          value={getIn(
            formik.values,
            `${name}.startTime`,
            addDays(new Date(), 1)
          )}
          placeholder="start datum en tijd"
          format="D MMM - HH:mm"
          months={months}
          weekDays={days}
          minDate={new Date()}
          weekStartDayIndex={1}
          plugins={[<TimePicker hideSeconds position="bottom" />]}
          containerStyle={{ width: '100%', display: 'block' }}
        />
        <p className="error-message">
          <ErrorMessage name={`${name}.startTime`} />
        </p>
      </div>

      <div>
        <label>Tot:</label>
        <DatePicker
          onChange={(date: DateObject) => {
            formik.setFieldValue(`${name}.endTime`, date.toDate());
          }}
          value={getIn(
            formik.values,
            `${name}.endTime`,
            addHours(addDays(new Date(), 1), 1)
          )}
          placeholder="eind datum en tijd"
          format="D MMM - HH:mm"
          minDate={new Date()}
          months={months}
          weekDays={days}
          weekStartDayIndex={1}
          plugins={[<TimePicker hideSeconds position="bottom" />]}
          containerStyle={{ width: '100%', display: 'block' }}
        />
        <p>
          <ErrorMessage name={`${name}.endTime`} />
        </p>
      </div>
    </div>
  );
}
