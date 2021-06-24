import * as React from 'react';
import { ErrorMessage, Field, useFormikContext } from 'formik';

import { Spinner } from '../../../components/spinner';
import {
  Input,
  FormItem,
  CheckboxList,
  Select,
  CheckboxItem,
} from '../../../components/forms/input';
import { Label, Paragraph } from '../../../components/text/text';

import { useApi } from '../../../hooks/use-api';
import { useDistricts } from '../../../hooks/use-districts';

export function OrganisationForm() {
  const { data: tags, loading } = useApi('/tag');
  const districts = useDistricts();
  const formik = useFormikContext<any>();

  if (loading || !tags || !districts) {
    return <Spinner />;
  }

  return (
    <>
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
            placeholder="https://www.example.com"
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
            placeholder="https://facebook.com/gemeenteamsterdam"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="facebook" />
          </Paragraph>
          <Field
            type="text"
            name="instagram"
            placeholder="https://instagram.com/midzomermokum"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="instagram" />
          </Paragraph>
        </Label>
      </FormItem>

      <FormItem>
        <Label>Actief in type activiteit</Label>
        <CheckboxList>
          {tags.map((tag: any) => (
            <CheckboxItem key={tag.id}>
              <Field
                type="checkbox"
                name="tagIds"
                value={tag.id.toString()}
                component={({ field, type }: any) => (
                  <input
                    {...field}
                    type={type}
                    checked={formik.values[field.name].includes(
                      tag.id.toString()
                    )}
                  />
                )}
              />
              {tag.name}
            </CheckboxItem>
          ))}
        </CheckboxList>
        <Paragraph>
          <ErrorMessage name="tagIds" />
        </Paragraph>
      </FormItem>
    </>
  );
}
