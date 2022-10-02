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
const Home = ({ vData, handleGetData }) => {
  //Data from firestore
  const tableName = 'vdev';
  const uid = vData && vData[0].uid;
  const [hData, setHData] = useState(vData && vData[0].home);

  return (
    vData &&
    hData && (
      <div>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={2.5} mt={2.5} variant='h5'>
            Home
          </Typography>
          <Formik
            initialValues={{}}
            onSubmit={async () => {
              try {
                await updateData(tableName, uid, { home: hData });
                handleGetData();
              } catch (err) {
                alert('Failed to Update 💔');
              }
            }}>
            {({ isSubmitting }) => (
              <Form>
                <TextField
                  required
                  name='job'
                  value={hData.jobName}
                  onChange={(e) =>
                    setHData({
                      ...hData,
                      jobName: e.target.value,
                    })
                  }
                  id='outlined-required'
                  label='Developer Type'
                  fullWidth
                />
                <Button
                  disabled={isSubmitting}
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
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={2.5} mt={2.5} variant='h5'>
            Placeholder Image - Desktop
          </Typography>
          <Formik
            initialValues={{
              desktopImage: null,
              desktopImageAlt: '',
            }}
            onSubmit={async (values) => {
              try {
                const url = await getFileURL(values.desktopImage, tableName);
                values.desktopImage = url;

                setHData((hData) => ({
                  ...hData,
                  desktopImage: values.desktopImage,
                  desktopImageAlt: values.desktopImageAlt,
                }));

                await updateData(tableName, uid, {
                  home: {
                    ...hData,
                    desktopImage: values.desktopImage,
                    desktopImageAlt: values.desktopImageAlt,
                  },
                });
                handleGetData();
              } catch (err) {
                alert('Failed to Update 💔');
              }
              document.querySelector('#desktopImage').reset();
            }}>
            {({ values, handleChange, setFieldValue, isSubmitting }) => (
              <Form id='desktopImage'>
                <Card>
                  <CardMedia
                    component='img'
                    image={hData.desktopImage}
                    alt={hData.desktopImageAlt}
                    sx={{ width: '30vw', margin: 'auto' }}
                  />
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      {hData.desktopImageAlt}
                    </Typography>
                  </CardContent>
                </Card>
                <TextField
                  sx={{ mt: 3 }}
                  required
                  id='outlined-required'
                  label='Image Description'
                  fullWidth
                  name='desktopImageAlt'
                  value={values.desktopImageAlt}
                  onChange={handleChange}
                />
                <Box sx={{ mt: 5 }}>
                  <Button variant='contained' component='label' id='upload'>
                    Upload
                    <input
                      hidden
                      accept='image/*'
                      type='file'
                      name='desktopImage'
                      onChange={(e) => {
                        setFieldValue('desktopImage', e.currentTarget.files[0]);
                      }}
                    />
                  </Button>
                  <label style={{ marginLeft: '1rem' }}>
                    {values.desktopImage && values.desktopImage.name}
                  </label>
                </Box>

                <Button
                  disabled={isSubmitting}
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
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={2.5} mt={2.5} variant='h5'>
            Placeholder Image - Mobile Left
          </Typography>
          <Formik
            initialValues={{
              mobileLeftImage: null,
              mobileLeftImageAlt: '',
            }}
            onSubmit={async (values) => {
              try {
                const url = await getFileURL(values.mobileLeftImage, tableName);
                values.mobileLeftImage = url;

                setHData((hData) => ({
                  ...hData,
                  mobileLeftImage: values.mobileLeftImage,
                  mobileLeftImageAlt: values.mobileLeftImageAlt,
                }));

                await updateData(tableName, uid, {
                  home: {
                    ...hData,
                    mobileLeftImage: values.mobileLeftImage,
                    mobileLeftImageAlt: values.mobileLeftImageAlt,
                  },
                });
                handleGetData();
              } catch (err) {
                alert('Failed to Update 💔');
              }
              document.querySelector('#mobileLeftImage').reset();
            }}>
            {({ values, handleChange, setFieldValue, isSubmitting }) => (
              <Form id='mobileLeftImage'>
                <Card>
                  <CardMedia
                    component='img'
                    image={hData.mobileLeftImage}
                    alt={hData.mobileLeftImageAlt}
                    sx={{ width: '30vw', margin: 'auto' }}
                  />
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      {hData.mobileLeftImageAlt}
                    </Typography>
                  </CardContent>
                </Card>
                <TextField
                  sx={{ mt: 3 }}
                  required
                  id='outlined-required'
                  label='Image Description'
                  fullWidth
                  name='mobileLeftImageAlt'
                  value={values.mobileLeftImageAlt}
                  onChange={handleChange}
                />
                <Box sx={{ mt: 5 }}>
                  <Button variant='contained' component='label' id='upload'>
                    Upload
                    <input
                      hidden
                      accept='image/*'
                      type='file'
                      name='mobileLeftImage'
                      onChange={(e) => {
                        setFieldValue(
                          'mobileLeftImage',
                          e.currentTarget.files[0]
                        );
                      }}
                    />
                  </Button>
                  <label style={{ marginLeft: '1rem' }}>
                    {values.mobileLeftImage && values.mobileLeftImage.name}
                  </label>
                </Box>

                <Button
                  disabled={isSubmitting}
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
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={2.5} mt={2.5} variant='h5'>
            Placeholder Image - Mobile Right
          </Typography>
          <Formik
            initialValues={{
              mobileRightImage: null,
              mobileRightImageAlt: '',
            }}
            onSubmit={async (values) => {
              try {
                const url = await getFileURL(
                  values.mobileRightImage,
                  tableName
                );
                values.mobileRightImage = url;

                setHData((hData) => ({
                  ...hData,
                  mobileRightImage: values.mobileRightImage,
                  dmobileRightImageAlt: values.mobileRightImageAlt,
                }));

                await updateData(tableName, uid, {
                  home: {
                    ...hData,
                    mobileRightImage: values.mobileRightImage,
                    mobileRightImageAlt: values.mobileRightImageAlt,
                  },
                });
                handleGetData();
              } catch (err) {
                alert('Failed to Update 💔');
              }
              document.querySelector('#mobileRightImage').reset();
            }}>
            {({ values, handleChange, setFieldValue, isSubmitting }) => (
              <Form id='mobileRightImage'>
                <Card>
                  <CardMedia
                    component='img'
                    image={hData.mobileRightImage}
                    alt={hData.mobileRightImageAlt}
                    sx={{ width: '30vw', margin: 'auto' }}
                  />
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      {hData.mobileRightImageAlt}
                    </Typography>
                  </CardContent>
                </Card>
                <TextField
                  sx={{ mt: 3 }}
                  required
                  id='outlined-required'
                  label='Image Description'
                  fullWidth
                  name='mobileRightImageAlt'
                  value={values.mobileRightImageAlt}
                  onChange={handleChange}
                />
                <Box sx={{ mt: 5 }}>
                  <Button variant='contained' component='label' id='upload'>
                    Upload
                    <input
                      hidden
                      accept='image/*'
                      type='file'
                      name='mobileRightImage'
                      onChange={(e) => {
                        setFieldValue(
                          'mobileRightImage',
                          e.currentTarget.files[0]
                        );
                      }}
                    />
                  </Button>
                  <label style={{ marginLeft: '1rem' }}>
                    {values.mobileRightImage && values.mobileRightImage.name}
                  </label>
                </Box>

                <Button
                  disabled={isSubmitting}
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

export default Home;
