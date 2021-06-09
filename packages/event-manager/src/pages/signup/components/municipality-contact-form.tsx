import * as React from 'react';
import { ErrorMessage, Field } from 'formik';

import { Input, FormItem, Textarea } from '../../../components/forms/input';
import { Label, Paragraph } from '../../../components/text/text';

export function MunicipalityContactForm() {
  return (
    <>
      <Paragraph>
        Registratie op dit platform is op dit moment alleen mogelijk door
        partners die in opdracht van of met subsidie van de gemeente
        activiteiten organiseren. Ingevoerde content is uiteindelijk alleen
        zichtbaar voor beheerders van dit platform
      </Paragraph>
      <FormItem>
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
      </FormItem>
      <FormItem>
        <Label htmlFor="municipalityContactEmail">
          Mailadres contactpersoon van uw organisatie bij gemeente Amsterdam
          <Field
            name="municipalityContactEmail"
            id="municipalityContactEmail"
            type="text"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="municipalityContactEmail" />
          </Paragraph>
        </Label>
      </FormItem>
      <FormItem>
        <Label htmlFor="municipalityContactPhone">
          Telefoonnummer contactpersoon van uw organisatie bij gemeente
          Amsterdam
          <Field
            name="municipalityContactPhone"
            id="municipalityContactPhone"
            type="text"
            placeholder="verplicht veld"
            component={Input}
          />
          <Paragraph>
            <ErrorMessage name="municipalityContactPhone" />
          </Paragraph>
        </Label>
      </FormItem>
      <FormItem>
        <Label htmlFor="municipalityContactStatement">
          Telefoonnummer contactpersoon van uw organisatie bij gemeente
          Amsterdam
          <Field
            name="municipalityContactStatement"
            id="municipalityContactStatement"
            placeholder="verplicht veld"
            component={Textarea}
          />
          <Paragraph>
            <ErrorMessage name="municipalityContactStatement" />
          </Paragraph>
        </Label>
      </FormItem>
    </>
  );
}
