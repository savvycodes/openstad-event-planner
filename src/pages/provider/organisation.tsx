import * as React from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

import { useHashLocation } from '../../components/hash-router';
import {
  Input,
  FormItem,
  List,
  Form,
  Select,
  Label,
  ListLabel,
  CheckboxItem,
  Paragraph,
  Header,
  Button,
  Main,
} from '../../components/forms/input';

const schema = Yup.object().shape({
  name: Yup.string().required('Naam is verplicht'),
  street: Yup.string().required('Straat + huisnummer is verplicht'),
  zip: Yup.string().required('Postcode is verplicht'),
  phoneNumber: Yup.number()
    .min(10)
    // .max(10)
    .required('Telefoonnummer is verplicht'),
  mailAddress: Yup.string()
    .email()
    .required('E-mailadres is verplicht'),
  website: Yup.string()
    .url()
    .required('Website is verplicht'),
  facebook: Yup.string()
    .url()
    .matches(
      /(?:(?:http|https):\/\/)?(?:www.)?(?:m.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
      'Geen geldige facebook URL'
    ),
  instagram: Yup.string().url(),
  district: Yup.string().required('Stadsdeel is verplicht'),
});

/**
 * Provider contact details form
 * @returns
 */
export function ProviderOrganisationPage(): JSX.Element {
  const [, navigate] = useHashLocation();

  return (
    <Main>
      <Header>
        <Paragraph>Welkom Aanbieder X,</Paragraph>
        <Paragraph>
          Vul hieronder uw gegevens in. Vragen? Neem contact op met Y.
        </Paragraph>
        <Paragraph>
          Deze informatie is zichbaar als de algemene contactinformatie op het
          platform. Ingevoerde content is uiteindelijk zichtbaar voor alle
          bezoekers op het platform.
        </Paragraph>
      </Header>
      <Formik
        initialValues={{
          // name: 'Jante Beton',
          // street: 'Stadhuisplein 1',
          // zip: '1234 AA',
          // district: '',
          // phoneNumber: '0206241111',
          // mailAddress: 'midzomermokum@amsterdam.nl',
          // website: 'https://amsterdam.nl',
          // facebook: '',
          // instagram: '',
          name: '',
          district: '',
          street: '',
          zip: '',
          phoneNumber: '',
          mailAddress: '',
          website: '',
          facebook: '',
          instagram: '',
        }}
        onSubmit={() => navigate('/aanbieder/contact')}
        validationSchema={schema}
      >
        {form => (
          <Form onSubmit={form.handleSubmit}>
            <FormItem>
              <Label htmlFor="name">
                Naam organisatie
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="verplicht veld"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.name}
                  error={form.errors.name}
                  tabIndex={1}
                />
                <Paragraph>
                  <ErrorMessage name="name" />
                </Paragraph>
              </Label>
            </FormItem>

            <FormItem>
              <Label htmlFor="street">
                Adres organisatie
                <Input
                  id="street"
                  type="text"
                  name="street"
                  placeholder="Straat + huisnummer"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.street}
                  tabIndex={2}
                  error={form.errors.street}
                />
                <Paragraph>
                  <ErrorMessage name="street" />
                </Paragraph>
                <Input
                  id="zip"
                  type="text"
                  name="zip"
                  placeholder="Postcode"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.zip}
                  tabIndex={3}
                  error={form.errors.zip}
                />
                <Paragraph>
                  <ErrorMessage name="zip" />
                </Paragraph>
                <Select
                  id="district"
                  name="district"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.district}
                  tabIndex={3}
                  error={form.errors.district}
                >
                  <option value="" disabled hidden>
                    Stadsdeel
                  </option>
                  <option value="1">1</option>
                </Select>
                <Paragraph>
                  <ErrorMessage name="district" />
                </Paragraph>
              </Label>
            </FormItem>

            <FormItem>
              <Label htmlFor="phoneNumber">
                Algemeen telefoonnummer organisatie
                <Input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="verplicht veld"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.phoneNumber}
                  tabIndex={4}
                  error={form.errors.phoneNumber}
                />
                <Paragraph>
                  <ErrorMessage name="phoneNumber" />
                </Paragraph>
              </Label>
            </FormItem>

            <FormItem>
              <Label htmlFor="mailAddress">
                Algemeen mailadres organisatie
                <Input
                  id="mailAddress"
                  type="text"
                  name="mailAddress"
                  placeholder="verplicht veld"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.mailAddress}
                  tabIndex={5}
                  error={form.errors.mailAddress}
                />
                <Paragraph>
                  <ErrorMessage name="mailAddress" />
                </Paragraph>
              </Label>
            </FormItem>

            <FormItem>
              <Label htmlFor="website">
                Website organisatie
                <Input
                  id="website"
                  type="text"
                  name="website"
                  placeholder="verplicht veld"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.website}
                  tabIndex={5}
                  error={form.errors.website}
                />
                <Paragraph>
                  <ErrorMessage name="website" />
                </Paragraph>
              </Label>
            </FormItem>

            <FormItem>
              <Label>
                Social media organisatie
                <Input
                  type="text"
                  name="facebook"
                  placeholder="Facebook"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.facebook}
                  tabIndex={6}
                  error={form.errors.facebook}
                />
                <Paragraph>
                  <ErrorMessage name="facebook" />
                </Paragraph>
                <Input
                  type="text"
                  name="instagram"
                  placeholder="Instagram"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.instagram}
                  tabIndex={7}
                  error={form.errors.instagram}
                />
                <Paragraph>
                  <ErrorMessage name="instagram" />
                </Paragraph>
              </Label>
            </FormItem>

            <FormItem>
              <Label>Actief in type activiteit</Label>
              <List>
                <CheckboxItem>
                  <input type="checkbox" id="sports" name="sports" />
                  <span className="checkmark"></span>
                  <ListLabel htmlFor="sports">Sport en spel</ListLabel>
                </CheckboxItem>

                <CheckboxItem>
                  <input type="checkbox" id="art" name="art" />
                  <ListLabel htmlFor="art">Kunst en cultuur</ListLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <input type="checkbox" id="nature" name="nature" />
                  <ListLabel htmlFor="nature">Natuur en gezondheid</ListLabel>
                </CheckboxItem>

                <CheckboxItem>
                  <input type="checkbox" id="media" name="media" />
                  <ListLabel htmlFor="media">Media en techniek</ListLabel>
                </CheckboxItem>

                <CheckboxItem>
                  <input type="checkbox" id="beroep" name="beroep" />
                  <ListLabel htmlFor="beroep">Beroep en burgerschap</ListLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <input type="checkbox" id="other" name="other" />
                  <ListLabel htmlFor="other">...</ListLabel>
                </CheckboxItem>
              </List>
            </FormItem>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                tabIndex={8}
                disabled={!form.isValid || form.isSubmitting}
              >
                Volgende
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Main>
  );
}
