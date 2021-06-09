import * as React from 'react';
import { ErrorMessage, Field } from 'formik';

import { Input, FormItem } from '../../../components/forms/input';
import { Paragraph, Label } from '../../../components/text/text';

export function ContactForm() {
  return (
    <>
      <Paragraph>
        Deze informatie gebruiken wij om contact met u op te nemen over het
        beheer van activiteiten en informatie op dit platform. Ingevoerde
        content is uiteindelijk alleen zichtbaar voor beheerders van dit
        platform.
      </Paragraph>
      <FormItem>
        <Label htmlFor="contactName">
          Naam contactpersoon
          <Field
            name="contactName"
            id="contactName"
            type="text"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="contactName" />
          </Paragraph>
        </Label>
      </FormItem>
      <FormItem>
        <Label htmlFor="contactPosition">
          Functie contactpersoon
          <Field
            name="contactPosition"
            id="contactPosition"
            type="text"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="contactPosition" />
          </Paragraph>
        </Label>
      </FormItem>
      <FormItem>
        <Label htmlFor="contactEmail">
          Mail contactpersoon
          <Field
            name="contactEmail"
            id="contactEmail"
            type="text"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="contactEmail" />
          </Paragraph>
        </Label>
      </FormItem>
      <FormItem>
        <Label htmlFor="contactPhone">
          Telefoon contactpersoon
          <Field
            name="contactPhone"
            id="contactPhone"
            type="text"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="contactPhone" />
          </Paragraph>
        </Label>
      </FormItem>
    </>
  );
}
