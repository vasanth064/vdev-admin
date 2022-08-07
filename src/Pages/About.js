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

const About = () => {
  const [aData, setAData] = useState(null);

  useEffect(() => {
    const data = async () => {
      let res = await getData('vdev');
      res = res[0].about;
      setAData(res);
    };
    data();
  }, []);

  return (
    aData && (
      <div>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={3} mt={2.5} variant='h5'>
            About Page
          </Typography>
          <Formik>
            <Form>
              <TextField
                required
                id='outlined-required'
                label='Title'
                defaultValue={aData.title}
                fullWidth
                margin='dense'
              />
              <TextField
                required
                id='outlined-required'
                label='SubTitle'
                defaultValue={aData.heading}
                fullWidth
                margin='dense'
              />
              <TextField
                id='outlined-textarea'
                label='Content'
                multiline
                defaultValue={aData.content}
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
                required
                id='outlined-required'
                label='Image Description'
                defaultValue={aData.photoAlt}
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
      </div>
    )
  );
};

export default About;
