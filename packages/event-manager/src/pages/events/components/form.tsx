import * as React from 'react';
import { ErrorMessage, Field, FieldArray, useFormikContext } from 'formik';
import { Plus, X, MapPin } from 'react-feather';
import { styled, css } from 'goober';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import ReactQuill from 'react-quill';

import {
  Input,
  FormItem,
  Form,
  Textarea,
  CheckboxItem,
  CheckboxList,
  Select,
  StyledInput,
} from '../../../components/forms/input';
import { Label, ListLabel, Paragraph } from '../../../components/text/text';
import { DFlex } from '../../../components/layout/layout';
import { AddDateTimeButton, Button } from '../../../components/button/button';
import { ImageUpload } from '../../../components/forms/image-upload';
import { Location } from '../../../components/location';
import { LocationFinder } from '../../../components/forms/location-finder';
import { DateTimeSelector } from './DateTimeComponent';

import { useTheme } from '../../../theme/theme';

type ActivityFormProps = {
  organisation: any;
  districts: any[];
  tags: any;
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
}

const styles = {
  Paragraph: styled(Paragraph)`
    font-weight: 500;
  `,
  DateTimeDiv: styled('div')`
    @media (min-width: 1024px) {
      position: relative;
      width: 50%;
      margin-bottom: 24px;
    }
    @media (max-width: 1023px) {
      position: relative;
      width: 100%;
      margin-bottom: 24px;
    }
  `,
  Label: styled(Label)`
    margin-left: 12px;
  `,
  CloseButton: styled(X)`
    align-self: center;
  `,
  Plus: styled(Plus)`
    float: right;
  `,
  SlotRow: styled('div')`
    display: flex;
  `,
  Center: styled('div')`
    display: flex;
    justify-content: center;
  `,
  Editor: (props: any) => css`
    background: ${props.theme.colors.white};
    box-shadow: ${props.theme.effects.boxShadowPrimary};
    font-weight: normal;
    font-family: ${props.theme.font.family};

    .ql-editor {
      min-height: 200px;
    }

    .ql-container {
      font-family: ${props.theme.font.family};
      font-size: ${props.theme.font.size}px;
    }
  `,
};

export function ActivityForm({
  organisation,
  districts,
  tags,
}: ActivityFormProps) {
  const form = useFormikContext<FormValues>();
  const theme = useTheme();

  return (
    <Form>
      <FormItem>
        <Label htmlFor="name">
          Naam organisatie
          <StyledInput value={organisation.name} disabled />
        </Label>
      </FormItem>

      <FormItem>
        <Label htmlFor="name">
          Titel activiteit
          <Field
            type="text"
            name="name"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="name" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label htmlFor="description" style={{ width: '70%' }}>
          Beschrijving activiteit
          <Field name="description">
            {({ field }: any) => (
              <ReactQuill
                id={field.name}
                className={styles.Editor({ theme })}
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
          <Paragraph>
            <ErrorMessage name="description" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label htmlFor="location">
          Locatie activiteit
          <styles.Paragraph>
            Vul een adres in en selecteer één van de beschikbare locaties
          </styles.Paragraph>
          {form.values.location.coordinates.length > 0 ? (
            <DFlex style={{ alignItems: 'center' }}>
              <MapPin size={24} />
              <Paragraph style={{ margin: '0 10px' }}>
                <Location
                  lat={form.values.location.coordinates[1]}
                  lon={form.values.location.coordinates[0]}
                />
              </Paragraph>
            </DFlex>
          ) : null}
          <LocationFinder
            placeholder="verplicht veld"
            onSelect={(geo: any) => form.setFieldValue('location', geo)}
            error={form.errors?.location?.coordinates}
          />
          <Paragraph>
            <ErrorMessage name="location.coordinates" />
          </Paragraph>
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
          <Paragraph>
            <ErrorMessage name="district" />
          </Paragraph>
        </Label>
      </FormItem>

      <styles.DateTimeDiv>
        <styles.Label>
          Startdatum en einddatum
          <styles.Paragraph>
            Voeg extra data toe door op + te klikken
          </styles.Paragraph>
        </styles.Label>

        <FieldArray name="slots">
          {arrayHelpers => (
            <>
              {form.values?.slots?.map((slot: any, index: number) => (
                <styles.SlotRow key={slot.id || index}>
                  <DateTimeSelector name={`slots[${index}]`} />
                  {form.values.slots.length > 1 ? (
                    <styles.CloseButton
                      strokeWidth={3}
                      size={20}
                      stroke={theme.colors.darkestGray}
                      onClick={() => arrayHelpers.remove(index)}
                    />
                  ) : null}
                </styles.SlotRow>
              ))}
              <AddDateTimeButton
                onClick={() =>
                  arrayHelpers.push({
                    startTime: addDays(new Date(), 1),
                    endTime: addHours(addDays(new Date(), 1), 1),
                  })
                }
              >
                <styles.Plus
                  strokeWidth={3}
                  size={20}
                  stroke={theme.colors.black}
                />
              </AddDateTimeButton>
            </>
          )}
        </FieldArray>
      </styles.DateTimeDiv>

      <FormItem>
        <Label>Leeftijd</Label>
        <CheckboxList>
          <CheckboxItem>
            <Field
              type="checkbox"
              id="age04"
              name="ages"
              value="0-4"
              tabIndex={7}
            />
            <ListLabel htmlFor="age04">0 - 4 jaar</ListLabel>
          </CheckboxItem>
          <CheckboxItem>
            <Field
              type="checkbox"
              id="age48"
              name="ages"
              value="4-8"
              tabIndex={8}
            />
            <ListLabel htmlFor="age48">4 - 8 jaar</ListLabel>
          </CheckboxItem>
          <CheckboxItem>
            <Field
              type="checkbox"
              id="age812"
              name="ages"
              value="8-12"
              tabIndex={9}
            />
            <ListLabel htmlFor="age812">8 - 12 jaar</ListLabel>
          </CheckboxItem>
          <CheckboxItem>
            <Field
              type="checkbox"
              id="age1216"
              name="ages"
              value="12-16"
              tabIndex={10}
            />
            <ListLabel htmlFor="age1216">12 - 16 jaar</ListLabel>
          </CheckboxItem>
          <CheckboxItem>
            <Field
              type="checkbox"
              id="age1618"
              name="ages"
              value="16-18"
              tabIndex={11}
            />
            <ListLabel htmlFor="age1618">16 - 18 jaar</ListLabel>
          </CheckboxItem>
          <CheckboxItem>
            <Field
              type="checkbox"
              id="age18"
              name="ages"
              value="18-99"
              tabIndex={12}
            />
            <ListLabel htmlFor="age18">18 jaar en ouder</ListLabel>
          </CheckboxItem>
          <Paragraph>
            <ErrorMessage name="ages" />
          </Paragraph>
        </CheckboxList>
      </FormItem>

      <FormItem>
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
      </FormItem>

      <FormItem>
        <Label htmlFor="price">
          Kosten deelname
          <Field
            id="price"
            name="price"
            placeholder="Gratis, Stadspas of geldbedrag"
            component={Textarea}
          />
          <Paragraph>
            <ErrorMessage name="price" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label htmlFor="attendees">
          Aantal beschikbare plekken
          <styles.Paragraph>
            Laat het aantal beschikbare plekken op 0 als je niet weet hoeveel
            plekken er beschikbaar zijn.
          </styles.Paragraph>
          <Field
            type="number"
            name="attendees"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="attendees" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label htmlFor="information" style={{ width: '70%' }}>
          Hoe kan je je aanmelden?
          <Field name="information">
            {({ field }: any) => (
              <ReactQuill
                id={field.name}
                className={styles.Editor({ theme })}
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
          <Paragraph>
            <ErrorMessage name="information" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label>
          Upload foto
          <ImageUpload
            onUpload={image => form.setFieldValue('image', image.url)}
            value={form.values.image}
          />
          <Paragraph>
            <ErrorMessage name="image" />
          </Paragraph>
        </Label>
      </FormItem>

      <styles.Center>
        <Button type="submit" disabled={form.isSubmitting}>
          Voeg toe
        </Button>
      </styles.Center>
    </Form>
  );
}