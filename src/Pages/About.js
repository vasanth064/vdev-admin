import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { getFileURL, updateData } from '../Helpers/FirestoreHelper';

const About = ({ vData, handleGetData }) => {
  const tableName = 'vdev';
  const uid = vData && vData[0].uid;
  const [aData, setAData] = useState(vData && vData[0].about);
  return (
    aData && (
      <div>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={3} mt={2.5} variant='h5'>
            About Page
          </Typography>
          <Formik
            initialValues={{
              photoAlt: '',
              photo: null,
            }}
            onSubmit={async (values) => {
              try {
                if (values.photo) {
                  const url = await getFileURL(values.photo, tableName);
                  values.photo = url;
                }

                setAData((aData) =>
                  values.photo
                    ? {
                        ...aData,
                        photo: values.photo,
                        photoAlt: values.photoAlt,
                      }
                    : values.photoAlt.length !== 0
                    ? {
                        ...aData,
                        photoAlt: values.photoAlt,
                      }
                    : {
                        ...aData,
                      }
                );

                await updateData(
                  tableName,
                  uid,
                  values.photo
                    ? {
                        about: {
                          ...aData,
                          photo: values.photo,
                          photoAlt: values.photoAlt,
                        },
                      }
                    : values.photoAlt.length !== 0
                    ? {
                        about: {
                          ...aData,
                          photoAlt: values.photoAlt,
                        },
                      }
                    : {
                        about: {
                          ...aData,
                        },
                      }
                );
                handleGetData();
              } catch (err) {
                alert('Failed to Update 💔');
              }
            }}>
            {({ values, setFieldValue }) => (
              <Form>
                <TextField
                  required
                  id='outlined-required'
                  label='Title'
                  value={aData.title}
                  onChange={(e) =>
                    setAData({
                      ...aData,
                      title: e.target.value,
                    })
                  }
                  fullWidth
                  margin='dense'
                />
                <TextField
                  required
                  id='outlined-required'
                  label='SubTitle'
                  value={aData.heading}
                  onChange={(e) =>
                    setAData({
                      ...aData,
                      heading: e.target.value,
                    })
                  }
                  fullWidth
                  margin='dense'
                />
                <TextField
                  id='outlined-textarea'
                  label='Content'
                  multiline
                  value={aData.content}
                  onChange={(e) =>
                    setAData({
                      ...aData,
                      content: e.target.value,
                    })
                  }
                  fullWidth
                  margin='dense'
                  rows={5}
                />
                <Card sx={{ marginTop: '3rem' }}>
                  <CardMedia
                    component='img'
                    image={aData.photo}
                    alt={aData.photoAlt}
                    sx={{ width: '30vw', margin: 'auto' }}
                  />
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      {aData.photoAlt}
                    </Typography>
                  </CardContent>
                </Card>
                <TextField
                  sx={{ mt: 3 }}
                  id='outlined-required'
                  label='Image Description'
                  fullWidth
                  name='photoAlt'
                  value={aData.photoAlt}
                  onChange={(e) => {
                    setFieldValue('photoAlt', e.currentTarget.value);
                    setAData({
                      ...aData,
                      photoAlt: e.currentTarget.value,
                    });
                  }}
                />

                <Box sx={{ mt: 5 }}>
                  <Button variant='contained' component='label' id='upload'>
                    Upload
                    <input
                      id='photo'
                      hidden
                      accept='image/*'
                      type='file'
                      onChange={(e) => {
                        setFieldValue('photo', e.currentTarget.files[0]);
                      }}
                    />
                  </Button>
                  <label style={{ marginLeft: '1rem' }}>
                    {values.photo && values.photo.name}
                  </label>
                </Box>

                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                  style={{ marginTop: '3rem' }}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    )
  );
};

export default About;
