import * as React from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Calendar } from 'react-multi-date-picker';

import { useHashLocation } from '../../components/hash-router';
import {
  Input,
  FormItem,
  Form,
  Textarea,
  CheckboxItem,
  // Select,
  FileUpload,
  CheckboxList,
  Select,
  StyledInput,
} from '../../components/forms/input';
import {
  BorderedTitle,
  Label,
  ListLabel,
  Paragraph,
} from '../../components/text/text';
import { DFlex, Header, Main } from '../../components/layout/layout';
import { Button } from '../../components/button/button';
import { useApi } from '../../hooks/use-api';
import { Spinner } from '../../components/spinner';
import { ErrorBanner } from '../../components/error-banner';
import { useDistricts } from '../../hooks/use-districts';
import { ImageUpload } from '../../components/forms/image-upload';
import { LocationFinder } from '../../components/forms/location-finder';
import { useConfig } from '../../context/config-context';
import { createEvent } from '../../endpoints/event';

const schema = Yup.object().shape({
  name: Yup.string().required('Naam is verplicht'),
  description: Yup.string().required('Beschrijving is verplicht'),
  location: Yup.object()
    .shape({
      type: Yup.string().required(),
      coordinates: Yup.array()
        .of(Yup.number())
        .min(2),
    })
    .required('Locatie is verplicht'),
  district: Yup.string().required('Stadsdeel is verplicht'),
  price: Yup.number(),
  attendees: Yup.number().required('Aantal beschikbare plekken is verplicht'),
  information: Yup.string(),
  dates: Yup.array()
    .of(Yup.date())
    .min(1, 'Kies minimaal 1 datum')
    .required('Datum is verplicht'),
  startTime: Yup.string().required('Aanvangsttijd is verplicht'),
  endTime: Yup.string().required('Eindtijd is verplicht'),
  tagIds: Yup.array()
    .of(Yup.string())
    .min(1, 'U moet minimaal 1 type activiteit selecteren'),
  ages: Yup.array()
    .of(Yup.string())
    .min(1, 'U moet minimaal 1 leeftijd selecteren'),
  needToPay: Yup.string(),
});

/**
 * Provider contact details form
 * @returns
 */
export function ProviderAddActivityPage(): JSX.Element {
  const [, navigate] = useHashLocation();
  const config = useConfig();
  const {
    data: organisation,
    loading: organisationLoading,
    error: organisationError,
  } = useApi('/organisation/me');
  const { data: tags, loading: tagsLoading } = useApi('/tag');
  const districts = useDistricts();
  const [submitError, setSubmitError] = React.useState<Error | null>(null);

  const loading = organisationLoading || tagsLoading;

  async function handleSubmit(values: any, formHelpers: any) {
    setSubmitError(null);
    try {
      const payload: any = {
        name: values.name,
        description: values.description,
        location: values.location,
        district: values.district,
        price: values.needToPay === 'free' ? 0 : values.price * 100,
        attendees: values.attendees,
        information: values.information,
        image: values.image,
        tagIds: values.tagIds,
      };

      // Find min and max age
      const allAges = values.ages
        .map((group: string) => group.split('-'))
        .flat()
        .map((age: string) => parseInt(age));
      const minAge = Math.min(...allAges);
      const maxAge = Math.max(...allAges);

      payload.minAge = minAge;
      payload.maxAge = maxAge;

      // Merge time with date for each slot
      const [startHour, startMin] = values.startTime
        .split(':')
        .map((v: string) => parseInt(v));
      const [endHour, endMin] = values.endTime
        .split(':')
        .map((v: string) => parseInt(v));

      payload.slots = values.dates.map((date: Date) => {
        const start = new Date(date);
        start.setHours(startHour);
        start.setMinutes(startMin);
        start.setSeconds(0);
        const end = new Date(date);
        end.setHours(endHour);
        end.setMinutes(endMin);
        end.setSeconds(0);
        return {
          startTime: start,
          endTime: end,
        };
      });

      await createEvent(config, payload);

      navigate('/events');
    } catch (err) {
      setSubmitError(err);
    } finally {
      formHelpers.setSubmitting(false);
    }
  }

  if (loading || !organisation || !tags) {
    return <Spinner />;
  }

  if (organisationError) {
    return (
      <ErrorBanner>
        Oeps! We konden je organisatie niet ophalen ({organisationError.message}
        )
      </ErrorBanner>
    );
  }

  return (
    <Main>
      <Header>
        <BorderedTitle title={organisation.name} />

        <Paragraph>Nieuwe activiteit toevoegen</Paragraph>
      </Header>

      <Formik
        initialValues={{
          name: '',
          description: '',
          location: {
            type: 'Point',
            coordinates: [],
          },
          district: '',
          price: 0,
          attendees: 0,
          information: '',
          tagIds: [],
          ages: [],
          image: '',
          dates: [],
          startTime: '',
          endTime: '',
          needToPay: 'free',
        }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {form => (
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

            <FormItem>
              <Label htmlFor="date">
                Datum activiteit
                <Calendar
                  multiple
                  minDate={new Date(Date.now() + 3600 * 1000 * 24)}
                  hideYear
                  onChange={(dates: any[]) => {
                    dates = dates.map(date => new Date(date));
                    form.setFieldValue('dates', dates);
                  }}
                />
                <Paragraph>
                  <ErrorMessage name="dates" />
                </Paragraph>
              </Label>
            </FormItem>

            <DFlex>
              <FormItem>
                <Label htmlFor="startTime">
                  Aanvangsttijd
                  <Field
                    name="startTime"
                    type="time"
                    tabIndex={5}
                    component={Input}
                  />
                  <Paragraph>
                    <ErrorMessage name="startTime" />
                  </Paragraph>
                </Label>
              </FormItem>
              <FormItem>
                <Label htmlFor="endTime">
                  Eind tijd
                  <Field
                    name="endTime"
                    type="time"
                    tabIndex={6}
                    component={Input}
                  />
                  <Paragraph>
                    <ErrorMessage name="endTime" />
                  </Paragraph>
                </Label>
              </FormItem>
            </DFlex>

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
                  <Field
                    type="checkbox"
                    name="ages"
                    value="8-12"
                    tabIndex={9}
                  />
                  <span className="checkmark"></span>
                  <ListLabel htmlFor="age812">8 - 12 jaar</ListLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <Field
                    type="checkbox"
                    name="ages"
                    value="12-16"
                    tabIndex={10}
                  />
                  <span className="checkmark"></span>
                  <ListLabel htmlFor="age1216">12 - 16 jaar</ListLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <Field
                    type="checkbox"
                    name="ages"
                    value="16-18"
                    tabIndex={11}
                  />
                  <span className="checkmark"></span>
                  <ListLabel htmlFor="age1618">16 - 18 jaar</ListLabel>
                </CheckboxItem>
                <CheckboxItem>
                  <Field type="checkbox" name="ages" value="18" tabIndex={12} />
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
                    disabled={form.values.needToPay === 'free'}
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
        )}
      </Formik>
      {submitError ? (
        <ErrorBanner>
          Oeps! We konden je activiteit niet opslaan ({submitError.message})
        </ErrorBanner>
      ) : null}
    </Main>
  );
}
