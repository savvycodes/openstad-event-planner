import * as React from 'react';
import { ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import { Input } from '../../../components/forms/input';
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
    <div className="form-wrapper">
      <div className="inputfield-wrapper">
        <Label htmlFor="contactName">
          Naam</Label>
          <Field
            name="contactName"
            id="contactName"
            type="text"
            placeholder="Verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="contactName" />
          </Paragraph>
        
      </div>
      <div className="inputfield-wrapper">
        <Label htmlFor="contactPosition">
          Functie</Label>
          <Field
            name="contactPosition"
            id="contactPosition"
            type="text"
            placeholder="Verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="contactPosition" />
          </Paragraph>
        
      </div>
      <div className="inputfield-wrapper">
        <Label htmlFor="contactEmail">
          E-mailadres</Label>
          <Field
            name="contactEmail"
            id="contactEmail"
            type="text"
            placeholder="Verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="contactEmail" />
          </Paragraph>
        
      </div>
      <div className="inputfield-wrapper">
        <Label htmlFor="contactPhone">
          Telefoonnummer</Label>
          <Field
            name="contactPhone"
            id="contactPhone"
            type="text"
            placeholder="Verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="contactPhone" />
          </Paragraph>
        
      </div>
      {/* <div className="inputfield-wrapper">
        <Label htmlFor="municipalityContactName">
          Naam contactpersoon van uw organisatie bij gemeente Amsterdam  
          <Field
            name="municipalityContactName"
            id="municipalityContactName"
            type="text"
            placeholder="Verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="municipalityContactName" />
          </Paragraph>
        </Label>
      </div> */}
    </div>
  );
}
