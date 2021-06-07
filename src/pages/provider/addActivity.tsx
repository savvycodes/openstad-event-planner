import * as React from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

import { useHashLocation } from '../../components/hash-router';
import {
  Input,
  FormItem,
  List,
  Form,
  Label,
  ListLabel,
  TextArea,
  CheckboxItem,
  Paragraph,
  Header,
  Button,
  Main,
  Title,
  Select,
  DFlex,
  Border,
  FileUpload,
} from '../../components/forms/input';

const schema = Yup.object().shape({
  name: Yup.string().required('Naam is verplicht'),
  title: Yup.string().required('Titel is verplicht'),
  description: Yup.string().required('Beschrijving is verplicht'),
  date: Yup.date().required('Datum is verplicht'),
  startTime: Yup.date().required('Aanvangsttijd is verplicht'),
  endTime: Yup.date().required('Eindtijd is verplicht'),
  spots: Yup.number().required('Beschikbare plekken zijn verplicht'),
  street: Yup.string().required('Straat is verplicht'),
  district: Yup.string().required('Stadsdeel is verplicht'),
});

/**
 * Provider contact details form
 * @returns
 */
export function ProviderAddActivityPage(): JSX.Element {
  const [, navigate] = useHashLocation();

  return (
    <Main>
      <Header>
        <Title>
          Kinderboerderij 't zwarte schaap
          <Border />
        </Title>

        <Paragraph>Nieuwe activiteit toevoegen</Paragraph>
      </Header>
      <Formik
        initialValues={{
          name: '',
          extra: '',
          image: '',
          spots: '',
          amount: '',
          endTime: '',
          startTime: '',
          date: '',
          title: '',
          description: '',
          district: '',
          street: '',
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
                  placeholder="Autofill"
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
              <Label htmlFor="title">
                Titel activiteit
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="verplicht veld"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.title}
                  tabIndex={2}
                  error={form.errors.title}
                />
                <Paragraph>
                  <ErrorMessage name="title" />
                </Paragraph>
              </Label>
            </FormItem>

            <FormItem>
              <Label htmlFor="description">
                Beschrijving activiteit
                <TextArea
                  rows={6}
                  cols={60}
                  style={{ width: '50%' }}
                  id="description"
                  name="description"
                  placeholder="verplicht veld"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.description}
                  tabIndex={4}
                  error={form.errors.description}
                />
                <Paragraph>
                  <ErrorMessage name="description" />
                </Paragraph>
              </Label>
            </FormItem>

            <FormItem>
              <Label htmlFor="location">
                Locatie activiteit
                <Input
                  id="street"
                  type="text"
                  name="street"
                  placeholder="verplicht veld"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.street}
                  tabIndex={5}
                  error={form.errors.street}
                />
                <Paragraph>
                  <ErrorMessage name="street" />
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
              <Label htmlFor="date">
                Datum activiteit
                <Input
                  id="date"
                  type="date"
                  name="date"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.date}
                  tabIndex={5}
                  error={form.errors.date}
                />
                <Paragraph>
                  <ErrorMessage name="date" />
                </Paragraph>
              </Label>
            </FormItem>

            <DFlex>
              <FormItem>
                <Label htmlFor="startTime">
                  Aanvangsttijd
                  <Input
                    id="startTime"
                    type="time"
                    name="startTime"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.startTime}
                    tabIndex={5}
                    error={form.errors.startTime}
                  />
                  <Paragraph>
                    <ErrorMessage name="startTime" />
                  </Paragraph>
                </Label>
              </FormItem>
              <FormItem>
                <Label htmlFor="endTime">
                  Eind tijd
                  <Input
                    id="endTime"
                    type="time"
                    name="endTime"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.endTime}
                    tabIndex={5}
                    error={form.errors.endTime}
                  />
                  <Paragraph>
                    <ErrorMessage name="endTime" />
                  </Paragraph>
                </Label>
              </FormItem>
            </DFlex>

            <FormItem>
              <Label>Leeftijd</Label>
              <List>
                <CheckboxItem>
                  <input type="checkbox" id="age04" name="age04" />
                  <span className="checkmark"></span>
                  <ListLabel htmlFor="age04">0 - 4 jaar</ListLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <input type="checkbox" id="age48" name="age48" />
                  <span className="checkmark"></span>
                  <ListLabel htmlFor="age48">4 - 8 jaar</ListLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <input type="checkbox" id="age812" name="age812" />
                  <span className="checkmark"></span>
                  <ListLabel htmlFor="age812">8 - 12 jaar</ListLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <input type="checkbox" id="age1216" name="age1216" />
                  <span className="checkmark"></span>
                  <ListLabel htmlFor="age1216">12 - 16 jaar</ListLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <input type="checkbox" id="age1618" name="age1618" />
                  <span className="checkmark"></span>
                  <ListLabel htmlFor="age1618">16 - 18 jaar</ListLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <input type="checkbox" id="age18" name="age18" />
                  <span className="checkmark"></span>
                  <ListLabel htmlFor="age18">18 jaar en ouder</ListLabel>
                </CheckboxItem>
              </List>
            </FormItem>

            <FormItem>
              <Label>Type activiteit</Label>
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

            <FormItem>
              <Label>Kosten deelname</Label>
              <List>
                <CheckboxItem>
                  <input type="radio" id="free" name="needToPay" />
                  <ListLabel htmlFor="free">Gratis</ListLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <input type="radio" id="notFree" name="needToPay" />
                  <Input
                    id="amount"
                    type="number"
                    name="amount"
                    placeholder="bedrag"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.amount}
                    tabIndex={5}
                    error={form.errors.amount}
                  />
                </CheckboxItem>
              </List>
            </FormItem>

            <FormItem>
              <Label htmlFor="spots">
                Aantal beschikbare plekken
                <Input
                  id="spots"
                  type="number"
                  name="spots"
                  placeholder="verplicht veld"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.spots}
                  tabIndex={5}
                  error={form.errors.spots}
                />
                <Paragraph>
                  <ErrorMessage name="spots" />
                </Paragraph>
              </Label>
            </FormItem>

            <FormItem>
              <Label htmlFor="extra">
                Meer informatie
                <TextArea
                  rows={6}
                  cols={40}
                  style={{ width: '50%' }}
                  id="extra"
                  name="extra"
                  placeholder="optioneel"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.extra}
                  tabIndex={4}
                  error={form.errors.extra}
                />
                <Paragraph>
                  <ErrorMessage name="extra" />
                </Paragraph>
              </Label>
            </FormItem>

            <FormItem>
              <Label>
                Upload foto
                <Input
                  style={{
                    display: 'none',
                  }}
                  type="file"
                  name="image"
                  id="file-upload"
                  file-upload
                  placeholder="browse"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.image}
                  tabIndex={6}
                  error={form.errors.image}
                />
                <FileUpload htmlFor="file-upload">browse</FileUpload>
                <Paragraph>
                  <ErrorMessage name="image" />
                </Paragraph>
              </Label>
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
