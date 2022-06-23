import * as React from 'react';
import { ErrorMessage, Field /*useFormikContext*/ } from 'formik';

import { Spinner } from '../../../components/spinner';
import {
  Input,
  // CheckboxList,
  Select,
  // CheckboxItem,
} from '../../../components/forms/input';
import { Paragraph } from '../../../components/text/text';

import { useApi } from '../../../hooks/use-api';
import { useDistricts } from '../../../hooks/use-districts';

import '../../../styles/forms.css'

export function OrganisationForm() {
  const { data: tags, loading } = useApi('/tag');
  const districts = useDistricts();
  // const formik = useFormikContext<any>();

  if (loading || !tags || !districts) {
    return <Spinner />;
  }

  return (
    <div className="form-wrapper">
      <div className="inputfield-wrapper">
        <label htmlFor="name">
          Organisatie
        </label>
        <Field
          name="name"
          id="name"
          type="text"
          placeholder="Verplicht veld"
          component={Input}
        />
        <Paragraph>
          <ErrorMessage name="name" />
        </Paragraph>
      </div>

      <div className="inputfield-wrapper">
        <label htmlFor="street">
          Straat en huisnummer</label>
          <Field
            id="street"
            type="text"
            name="street"
            placeholder="Straat en huisnummer"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="street" />
          </Paragraph>
        
      </div>

      <div className="inputfield-wrapper">
        <label htmlFor="zip">
          Postcode</label>
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
        
      </div>

      <div className="inputfield-wrapper">
        <label htmlFor="district">Stadsdeel</label>
          <Field id="district" name="district" component={Select}>
            <option value="" disabled hidden>
              Stadsdeel
            </option>
            {districts.map((district: any, index: any) => (
              <option key={`${district}_${index}`} value={district}>
                {district}
              </option>
            ))}
          </Field>
          <Paragraph>
            <ErrorMessage name="district" />
          </Paragraph>
        
      </div>

      {/* <div className="inputfield-wrapper">
        <label htmlFor="phone">
          Algemeen telefoonnummer organisatie</label>
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
        
      </div> */}

      {/* <div className="inputfield-wrapper">
        <label htmlFor="email">
          Algemeen mailadres organisatie</label>
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
        
      </div> */}

      <div className="inputfield-wrapper">
        <label htmlFor="website">Website</label>
        <i className="input-helper">Zorg dat je url begint met https://</i>
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
        
      </div>

      <div className="inputfield-wrapper">
        <label htmlFor="facebook">Social media - Facebook</label>
          <i className="input-helper">Zorg dat je url begint met https://</i>
          <Field
            id="facebook"
            type="text"
            name="facebook"
            placeholder="https://facebook.com/gemeenteamsterdam"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="facebook" />
          </Paragraph>
        
      </div>
      <div className="inputfield-wrapper">
        <label htmlFor="instagram">Social media - Instagram</label>
          <i className="input-helper">Zorg dat je url begint met https://</i>
          <Field
            id="instagram"
            type="text"
            name="instagram"
            placeholder="https://instagram.com/midzomermokum"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="instagram" />
          </Paragraph>
        
      </div>

      {/* <div className="inputfield-wrapper">
        <label>Actief in type activiteit</label>
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
      </div> */}
    </div>
  );
}
