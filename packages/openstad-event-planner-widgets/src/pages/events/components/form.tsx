import * as React from 'react';
import { ErrorMessage, Field, FieldArray, useFormikContext } from 'formik';
import { X, MapPin } from 'react-feather';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import ReactQuill from 'react-quill';

import {
  Input,
  Form,
  Textarea,
  CheckboxItem,
  CheckboxList,
  Select,
  // StyledInput,
} from '../../../components/forms/input';
import { ImageUpload } from '../../../components/forms/image-upload';
import { Location } from '../../../components/location';
import { LocationFinder } from '../../../components/forms/location-finder';
import { DateTimeSelector } from './DateTimeComponent';

import { useTheme } from '../../../theme/theme';

type ActivityFormProps = {
  organisation: any;
  districts: any[];
  tags: any;
  themes: any;
};

interface FormValues {
  name: string;
  description: string;
  location: {
    type: 'Point';
    coordinates: number[];
  };
  district: string;
  price: number;
  attendees: number;
  information: string;
  tagIds: number[];
  ages: string[];
  image: string;
  slots: any[];
  needToPay: string;
  highlighted: boolean;
}

export function ActivityForm({
  // organisation,
  districts,
  tags,
  themes,
}: ActivityFormProps) {
  const form = useFormikContext<FormValues>();
  const theme = useTheme();

  return (
    <Form>
      <div className="form-wrapper">
        {/* <div className="inputfield-wrapper">
          <label htmlFor="name">Naam organisatie</label>
          <StyledInput value={organisation.name} disabled />
        </div> */}

        <div className="inputfield-wrapper">
          <label htmlFor="name">Titel activiteit</label>
          <Field
            type="text"
            name="name"
            placeholder="Verplicht veld"
            component={Input}
          />
          <p className="error-message">
            <ErrorMessage name="name" />
          </p>
        </div>

        <div className="inputfield-wrapper">
          <label htmlFor="description">Beschrijving activiteit</label>
          <Field name="description">
            {({ field }: any) => (
              <ReactQuill
                id={field.name}
                className="wysiwyg-textarea"
                value={field.value}
                onChange={field.onChange(field.name)}
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link'],
                  ],
                }}
              />
            )}
          </Field>
          <p className="error-message">
            <ErrorMessage name="description" />
          </p>
        </div>

        <div className="inputfield-wrapper">
          <label htmlFor="location">Locatie activiteit</label>
          <i className="input-helper">
            Vul een adres in en selecteer één van de beschikbare locaties
          </i>
          <LocationFinder
            placeholder="Verplicht veld"
            onSelect={(geo: any) => form.setFieldValue('location', geo)}
            error={form.errors?.location?.coordinates}
          />
          <p className="error-message">
            <ErrorMessage name="location.coordinates" />
          </p>
          {form.values.location.coordinates.length > 0 ? (
            <div className="activity-location">
              <MapPin size={24} />
              <p>
                <Location
                  lat={form.values.location.coordinates[1]}
                  lon={form.values.location.coordinates[0]}
                />
              </p>
            </div>
          ) : null}
        </div>

        <div className="inputfield-wrapper">
          <label htmlFor="location">Kies een stadsdeel</label>
          <Field name="district" component={Select}>
            <option value="" disabled>
              Stadsdeel
            </option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </Field>
          <p className="error-message">
            <ErrorMessage name="district" />
          </p>
        </div>
        <div className="inputfield-wrapper">
          <label>Wanneer vindt je activiteit plaats?</label>
          <i className="input-helper">
            Een activiteit kan op meerdere dagen plaatsvinden, klik op het
            plusje om extra dagen toe te voegen. Een activiteit kan ook meerdere
            dagen duren, kies daarvoor een andere einddatum.
          </i>
          <FieldArray name="slots">
            {arrayHelpers => (
              <>
                {form.values?.slots?.map((slot: any, index: number) => (
                  <div className="date-slot-row" key={slot.id || index}>
                    <DateTimeSelector name={`slots[${index}]`} />
                    {form.values.slots.length > 1 ? (
                      <X
                        strokeWidth={3}
                        size={24}
                        stroke={theme.colors.darkestGray}
                        onClick={() => arrayHelpers.remove(index)}
                      />
                    ) : null}
                  </div>
                ))}
                <button
                  className="add-date-slot-button"
                  onClick={() =>
                    arrayHelpers.push({
                      startTime: addDays(new Date(), 1),
                      endTime: addHours(addDays(new Date(), 1), 1),
                    })
                  }
                >
                  Extra dag toevoegen
                </button>
              </>
            )}
          </FieldArray>
        </div>

        {themes &&
          themes.map((theme: any) => (
            <div className="inputfield-wrapper" key={theme.id}>
              <label>{theme.formLabel || theme.value}</label>
              <CheckboxList>
                {tags &&
                  tags
                    .filter((tag: any) => tag?.extraData?.theme === theme.value)
                    .map((tag: any) => (
                      <CheckboxItem className="checkbox-label" key={tag.id}>
                        <Field
                          type="checkbox"
                          name="tagIds"
                          value={tag.id.toString()}
                        />
                        {tag.name}
                      </CheckboxItem>
                    ))}
                <p className="error-message">
                  <ErrorMessage name="tagIds" />
                </p>
              </CheckboxList>
            </div>
          ))}

        {/* <div className="inputfield-wrapper">
        <Label>Type activiteit</Label>
        <CheckboxList>
          {tags &&
            tags.map((tag: any) => (
              <CheckboxItem key={tag.id}>
                <Field
                  type="checkbox"
                  name="tagIds"
                  value={tag.id.toString()}
                />
                {tag.name}
              </CheckboxItem>
            ))}
          <Paragraph>
            <ErrorMessage name="tagIds" />
          </Paragraph>
        </CheckboxList>
      </div> */}

        <div className="inputfield-wrapper">
          <label htmlFor="price">Kosten deelname</label>
          <Field
            id="price"
            name="price"
            placeholder="Gratis, Stadspas of geldbedrag"
            component={Textarea}
          />
          <p className="error-message">
            <ErrorMessage name="price" />
          </p>
        </div>

        <div className="inputfield-wrapper">
          <label htmlFor="attendees">Aantal beschikbare plekken</label>
          <i className="input-helper">
            Laat het aantal beschikbare plekken op 0 als je niet weet hoeveel
            plekken er beschikbaar zijn.
          </i>
          <Field
            type="number"
            name="attendees"
            placeholder="Verplicht veld"
            component={Input}
          />
          <p className="error-message">
            <ErrorMessage name="attendees" />
          </p>
        </div>

        <div className="inputfield-wrapper">
          <label htmlFor="information">Hoe kan je je aanmelden?</label>
          <i className="input-helper">
            Linken naar je eigen website kan door de tekst te selecteren die
            wilt linken en daarna op keten icoontje te klikken.
          </i>
          <Field name="information">
            {({ field }: any) => (
              <ReactQuill
                id={field.name}
                className="wysiwyg-textarea"
                value={field.value}
                onChange={field.onChange(field.name)}
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link'],
                  ],
                }}
              />
            )}
          </Field>
          <p className="error-message">
            <ErrorMessage name="information" />
          </p>
        </div>

        <div className="inputfield-wrapper">
          <label>Upload foto</label>
          <ImageUpload
            className="file-upload"
            onUpload={image => form.setFieldValue('image', image.url)}
            value={form.values.image}
          />
          <div className="file-upload__replacement">
            <p>Klik hier om een bestand te uploaden</p>
          </div>
          <p className="error-message">
            <ErrorMessage name="image" />
          </p>
        </div>

        <div className="inputfield-wrapper">
          <label htmlFor="highlighted">Highlight dit event</label>
          <CheckboxItem className="checkbox-label">
            <Field
              type="checkbox"
              name="highlighted"
              value={form.values.highlighted}
              checked={form.values.highlighted}
              onChange={(e: any) =>
                form.setFieldValue('highlighted', e.target.checked)
              }
            />
          </CheckboxItem>
        </div>
        <button type="submit" disabled={form.isSubmitting}>
          Opslaan
        </button>
      </div>
    </Form>
  );
}
