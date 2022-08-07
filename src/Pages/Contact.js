import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { Form, Formik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { getData } from '../Helpers/FirestoreHelper';

const Contact = () => {
  const [cData, setCData] = useState(null);

  useEffect(() => {
    const data = async () => {
      let res = await getData('vdev');
      res = res[0].contact;
      setCData(res);
    };
    data();
  }, []);

  return (
    cData && (
      <div>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={3} mt={2.5} variant='h5'>
            Contact Page
          </Typography>
          <Formik>
            <Form>
              <Card>
                <CardMedia
                  component='img'
                  image={cData.bannerImg}
                  alt={cData.bannerImgAlt}
                  sx={{ width: '30vw', margin: 'auto' }}
                />
                <CardContent>
                  <Typography variant='body2' color='text.secondary'>
                    {cData.bannerImgAlt}
                  </Typography>
                </CardContent>
              </Card>
              <TextField
                sx={{ mt: 3 }}
                required
                id='outlined-required'
                label='Contact Banner'
                defaultValue={cData.bannerImgAlt}
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
          <Typography mb={3} mt={2.5} variant='h5'>
            Contact Page Responses
          </Typography>
          <List
            sx={{
              width: '100%',
              maxWidth: '50%',
              margin: '0 auto',
            }}>
            {cData.messages.map((item, index) => (
              <ListItem
                key={index}
                alignItems='flex-start'
                secondaryAction={
                  <>
                    <IconButton edge='end' aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }>
                <ListItemText
                  primary={item.email}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'>
                        {item.message}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Container>
      </div>
    )
  );
};

export default Contact;
