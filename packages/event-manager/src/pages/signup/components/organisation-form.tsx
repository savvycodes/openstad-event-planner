import * as React from 'react';
import { ErrorMessage, Field } from 'formik';
import { useApi } from '../../../hooks/use-api';
import { Spinner } from '../../../components/spinner';
import {
  Input,
  FormItem,
  List,
  Label,
  Paragraph,
  Select,
  CheckboxItem,
} from '../../../components/forms/input';
import { useDistricts } from '../../../hooks/use-districts';

export function OrganisationForm() {
  const { data: tags, loading } = useApi('/tag');
  const districts = useDistricts();

  if (loading || !tags || !districts) {
    return <Spinner />;
  }

  return (
    <>
      <Paragraph>
        Deze informatie is zichbaar als de algemene contactinformatie op het
        platform. Ingevoerde content is uiteindelijk zichtbaar voor alle
        bezoekers op het platform.
      </Paragraph>
      <FormItem>
        <Label htmlFor="name">
          Naam organisatie
          <Field
            name="name"
            id="name"
            type="text"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="name" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label htmlFor="street">
          Adres organisatie
          <Field
            id="street"
            type="text"
            name="street"
            placeholder="Straat + huisnummer"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="street" />
          </Paragraph>
          <Field
            id="zip"
            type="text"
            name="zip"
            placeholder="Postcode"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="zip" />
          </Paragraph>
          <Field id="district" name="district" component={Select}>
            <option value="" disabled hidden>
              Stadsdeel
            </option>
            {districts.map((district, index) => (
              <option key={`${district}_${index}`} value={district}>
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
        <Label htmlFor="phone">
          Algemeen telefoonnummer organisatie
          <Field
            id="phone"
            type="text"
            name="phone"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="phone" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label htmlFor="email">
          Algemeen mailadres organisatie
          <Field
            id="email"
            type="text"
            name="email"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="email" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label htmlFor="website">
          Website organisatie
          <Field
            id="website"
            type="text"
            name="website"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="website" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label>
          Social media organisatie
          <Field
            type="text"
            name="facebook"
            placeholder="Facebook"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="facebook" />
          </Paragraph>
          <Field
            type="text"
            name="instagram"
            placeholder="Instagram"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="instagram" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label>Actief in type activiteit</Label>
        <List>
          {tags.map((tag: any) => (
            <CheckboxItem key={tag.id}>
              <Field
                type="checkbox"
                name="tagIds"
                value={tag.id}
                component={({ field, type, checked }: any) => (
                  <input {...field} type={type} checked={checked} />
                )}
              />
              {tag.name}
            </CheckboxItem>
          ))}
        </List>
        <Paragraph>
          <ErrorMessage name="tagIds" />
        </Paragraph>
      </FormItem>
    </>
  );
}
