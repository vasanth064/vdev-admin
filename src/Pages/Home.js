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
import { useEffect, useState } from 'react';
import { getData } from '../Helpers/FirestoreHelper';

const Home = () => {
  const [hData, setHData] = useState(null);

  useEffect(() => {
    const data = async () => {
      let res = await getData('vdev');
      res = res[0].home;
      setHData(res);
    };
    data();
  }, []);

  return (
    hData && (
      <div>
        <Container sx={{ marginBottom: '3rem' }}>
          {console.log(hData)}
          <Typography mb={2.5} mt={2.5} variant='h5'>
            Home
          </Typography>
          <Formik onSubmit={() => {}}>
            <Form>
              <TextField
                required
                id='outlined-required'
                label='Developer Type'
                defaultValue={hData.jobName}
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                fullWidth
                style={{ marginTop: '3rem' }}>
                Submit
              </Button>
            </Form>
          </Formik>
        </Container>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={2.5} mt={2.5} variant='h5'>
            Placeholder Image - Desktop
          </Typography>
          <Formik>
            <Form>
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
              />
              <Box sx={{ mt: 5 }}>
                <Button variant='contained' component='label' id='upload'>
                  Upload
                  <input hidden accept='image/*' type='file' />
                </Button>
                <label style={{ marginLeft: '1rem' }}>filename.png</label>
              </Box>

              <Button
                type='submit'
                variant='contained'
                fullWidth
                style={{ marginTop: '3rem' }}>
                Submit
              </Button>
            </Form>
          </Formik>
        </Container>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={2.5} mt={2.5} variant='h5'>
            Placeholder Image - Mobile Left
          </Typography>
          <Formik>
            <Form>
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
              <Box sx={{ mt: 5 }}>
                <Button variant='contained' component='label' id='upload'>
                  Upload
                  <input hidden accept='image/*' type='file' />
                </Button>
                <label style={{ marginLeft: '1rem' }}>filename.png</label>
              </Box>

              <Button
                type='submit'
                variant='contained'
                fullWidth
                style={{ marginTop: '3rem' }}>
                Submit
              </Button>
            </Form>
          </Formik>
        </Container>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={2.5} mt={2.5} variant='h5'>
            Placeholder Image - Mobile Right
          </Typography>
          <Formik>
            <Form>
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
              <Box sx={{ mt: 5 }}>
                <Button variant='contained' component='label' id='upload'>
                  Upload
                  <input hidden accept='image/*' type='file' />
                </Button>
                <label style={{ marginLeft: '1rem' }}>filename.png</label>
              </Box>

              <Button
                type='submit'
                variant='contained'
                fullWidth
                style={{ marginTop: '3rem' }}>
                Submit
              </Button>
            </Form>
          </Formik>
        </Container>
      </div>
    )
  );
};

export default Home;
