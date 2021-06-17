import * as React from 'react';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import { Calendar } from 'react-multi-date-picker';

import {
  Input,
  FormItem,
  Form,
  Textarea,
  CheckboxItem,
  FileUpload,
  CheckboxList,
  Select,
  StyledInput,
} from '../../../components/forms/input';
import { Label, ListLabel, Paragraph } from '../../../components/text/text';
import { DFlex } from '../../../components/layout/layout';
import { Button } from '../../../components/button/button';
import { ImageUpload } from '../../../components/forms/image-upload';
import { LocationFinder } from '../../../components/forms/location-finder';
import { styled } from 'goober';

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
  dates: Date[];
  startTime: string;
  endTime: string;
  needToPay: string;
}

const styles = {
  Paragraph: styled(Paragraph)`
    font-weight: 500;
    font-style: italic;
  `,
};

export function ActivityForm({
  organisation,
  districts,
  tags,
}: ActivityFormProps) {
  const form = useFormikContext<FormValues>();

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
            tabIndex={1}
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="name" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label htmlFor="description">
          Beschrijving activiteit
          <Field
            rows={6}
            cols={60}
            style={{ width: '50%' }}
            name="description"
            placeholder="verplicht veld"
            tabIndex={2}
            component={Textarea}
          />
          <Paragraph>
            <ErrorMessage name="description" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label htmlFor="location">
          Locatie activiteit
          <LocationFinder
            tabIndex={3}
            placeholder="verplicht veld"
            onSelect={(geo: any) => form.setFieldValue('location', geo)}
          />
          <Paragraph>
            <ErrorMessage name="location" />
          </Paragraph>
          <Field name="district" tabIndex={4} component={Select}>
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

      <FormItem>
        <Label htmlFor="date">
          Datum activiteit
          <styles.Paragraph>Meerdere dagen mogelijk</styles.Paragraph>
          <Calendar
            multiple
            minDate={new Date(Date.now() + 3600 * 1000 * 24)}
            hideYear
            onChange={(dates: any[]) => {
              dates = dates.map(date => new Date(date));
              form.setFieldValue('dates', dates);
            }}
            value={form.values.dates}
          />
          <Paragraph>
            <ErrorMessage name="dates" />
          </Paragraph>
        </Label>
      </FormItem>

      <DFlex>
        <FormItem>
          <Label htmlFor="startTime">
            Aanvangsttijd
            <Field
              name="startTime"
              type="time"
              tabIndex={5}
              component={Input}
              value={form.values.startTime}
            />
            <Paragraph>
              <ErrorMessage name="startTime" />
            </Paragraph>
          </Label>
        </FormItem>
        <FormItem>
          <Label htmlFor="endTime">
            Eind tijd
            <Field
              name="endTime"
              type="time"
              tabIndex={6}
              component={Input}
              value={form.values.endTime}
            />
            <Paragraph>
              <ErrorMessage name="endTime" />
            </Paragraph>
          </Label>
        </FormItem>
      </DFlex>

      <FormItem>
        <Label>Leeftijd</Label>
        <CheckboxList>
          <CheckboxItem>
            <Field type="checkbox" name="ages" value="0-4" tabIndex={7} />
            <span className="checkmark"></span>
            <ListLabel>0 - 4 jaar</ListLabel>
          </CheckboxItem>
          <CheckboxItem>
            <Field type="checkbox" name="ages" value="4-8" tabIndex={8} />
            <span className="checkmark"></span>
            <ListLabel htmlFor="age48">4 - 8 jaar</ListLabel>
          </CheckboxItem>
          <CheckboxItem>
            <Field type="checkbox" name="ages" value="8-12" tabIndex={9} />
            <span className="checkmark"></span>
            <ListLabel htmlFor="age812">8 - 12 jaar</ListLabel>
          </CheckboxItem>
          <CheckboxItem>
            <Field type="checkbox" name="ages" value="12-16" tabIndex={10} />
            <span className="checkmark"></span>
            <ListLabel htmlFor="age1216">12 - 16 jaar</ListLabel>
          </CheckboxItem>
          <CheckboxItem>
            <Field type="checkbox" name="ages" value="16-18" tabIndex={11} />
            <span className="checkmark"></span>
            <ListLabel htmlFor="age1618">16 - 18 jaar</ListLabel>
          </CheckboxItem>
          <CheckboxItem>
            <Field type="checkbox" name="ages" value="18-99" tabIndex={12} />
            <span className="checkmark"></span>
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
        <Label>Kosten deelname</Label>
        <CheckboxList>
          <CheckboxItem htmlFor="free">
            <Field
              type="radio"
              id="free"
              name="needToPay"
              value="free"
              tabIndex={13}
            />
            Gratis
          </CheckboxItem>
          <CheckboxItem htmlFor="paid">
            <Field
              type="radio"
              id="paid"
              name="needToPay"
              value="paid"
              tabIndex={14}
            />
            <Field
              name="price"
              type="number"
              placeholder="bedrag"
              min={0}
              tabIndex={15}
              disabled={form?.values?.needToPay === 'free'}
            />
          </CheckboxItem>
        </CheckboxList>
      </FormItem>

      <FormItem>
        <Label htmlFor="attendees">
          Aantal beschikbare plekken
          <Field
            type="number"
            name="attendees"
            placeholder="verplicht veld"
            component={Input}
            tabIndex={16}
          />
          <Paragraph>
            <ErrorMessage name="attendees" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label htmlFor="information">
          Hoe kan je je aanmelden?
          <Field
            component={Textarea}
            rows={6}
            cols={40}
            tabIndex={17}
            style={{ width: '50%' }}
            name="information"
            placeholder="optioneel"
          />
          <Paragraph>
            <ErrorMessage name="information" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label>
          Upload foto
          <ImageUpload
            tabIndex={18}
            onUpload={image => form.setFieldValue('image', image.url)}
            value={form.values.image}
          />
          <FileUpload htmlFor="file-upload">browse</FileUpload>
          <Paragraph>
            <ErrorMessage name="image" />
          </Paragraph>
        </Label>
      </FormItem>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="submit" tabIndex={19} disabled={form.isSubmitting}>
          Voeg toe
        </Button>
      </div>
    </Form>
  );
}
