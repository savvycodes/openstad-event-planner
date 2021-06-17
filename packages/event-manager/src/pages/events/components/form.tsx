import * as React from 'react';
import { ErrorMessage, Field, useFormikContext } from 'formik';

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
import { AddDateTimeButton, Button } from '../../../components/button/button';
import { ImageUpload } from '../../../components/forms/image-upload';
import { LocationFinder } from '../../../components/forms/location-finder';
import { Plus } from 'react-feather';
import { styled } from 'goober';
import { DateTimeSelector } from './DateTimeComponent';

const styles = {
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
};

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
  startDateTime: [];
  endDateTime: [];
  needToPay: string;
}

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
          {form.values.location.coordinates.length > 0 &&
            <Paragraph>Coördinaten: {form.values.location.coordinates[0]} {form.values.location.coordinates[1]}</Paragraph>
          }
          {console.log(form.values.location.coordinates)}
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

      <styles.DateTimeDiv>
          <styles.Label>Datum en tijd</styles.Label>
              <DateTimeSelector />
        <AddDateTimeButton onClick={() => console.log('add')}>
          <Plus
            style={{ float: 'right' }}
            strokeWidth={3}
            size={20}
            stroke={'#7a7a7a'}
          />
        </AddDateTimeButton>
      </styles.DateTimeDiv>

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
          <CheckboxItem htmlFor="citypass">
            <Field
              type="radio"
              id="citypass"
              name="needToPay"
              value="citypass"
              tabIndex={13}
            />
            Stadspas
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
          Meer informatie
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
