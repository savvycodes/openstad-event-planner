import * as React from 'react';
import { ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import { Input, FormItem } from '../../../components/forms/input';
import { Paragraph, Label } from '../../../components/text/text';

export const contactSchema = Yup.object().shape({
  contactName: Yup.string().required('Naam is verplicht'),
  contactPosition: Yup.string().required('Functie is verplicht'),
  contactPhone: Yup.string()
    .min(10, 'Minimaal 10 cijfers')
    .required('Telefoonnummer is verplicht'),
  contactEmail: Yup.string()
    .email('Geen geldig e-mailadres')
    .required('E-mailadres is verplicht'),
  // municipalityContactName: Yup.string().required('Naam is verplicht'),
});

export function ContactForm() {
  return (
    <>
      <FormItem>
        <Label htmlFor="contactName">
          Naam
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
          Functie
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
          E-mailadres
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
          Telefoonnummer
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
      {/* <FormItem>
        <Label htmlFor="municipalityContactName">
          Naam contactpersoon van uw organisatie bij gemeente Amsterdam  
          <Field
            name="municipalityContactName"
            id="municipalityContactName"
            type="text"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="municipalityContactName" />
          </Paragraph>
        </Label>
      </FormItem> */}
    </>
  );
}
