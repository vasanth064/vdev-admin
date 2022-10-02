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
import { useState } from 'react';
import {
  getFileURL,
  updateData,
  getData,
  deleteData,
} from '../Helpers/FirestoreHelper';
import { useEffect } from 'react';

const Contact = ({ vData, handleGetData }) => {
  const [cData, setCData] = useState(vData && vData[0].contact);
  const tableName = 'vdev';
  const uid = vData && vData[0].uid;

  const [messages, setMessages] = useState(null);
  const getContactMeaages = async () => {
    const res = await getData('contactMessages');
    setMessages(res);
  };
  useEffect(() => {
    getContactMeaages();
  }, []);

  const handleDeleteMessage = async (uid) => {
    await deleteData('contactMessages', uid);
    getContactMeaages();
  };

  return (
    cData && (
      <div>
        {console.log(messages)}
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={3} mt={2.5} variant='h5'>
            Contact Page
          </Typography>
          <Formik
            initialValues={{
              bannerImg: null,
              bannerImgAlt: '',
            }}
            onSubmit={async (values) => {
              try {
                const url = await getFileURL(values.bannerImg, tableName);
                values.bannerImg = url;

                setCData((cData) => ({
                  ...cData,
                  bannerImg: values.bannerImg,
                  bannerImgAlt: values.bannerImgAlt,
                }));

                await updateData(tableName, uid, {
                  contact: {
                    ...cData,
                    bannerImg: values.bannerImg,
                    bannerImgAlt: values.bannerImgAlt,
                  },
                });
                handleGetData();
              } catch (err) {
                alert('Failed to Update 💔');
              }
              document.querySelector('#bannerImg').reset();
            }}>
            {({ values, handleChange, setFieldValue, isSubmitting }) => (
              <Form id='bannerImg'>
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
                  label='Contact Banner Alt'
                  defaultValue={cData.bannerImgAlt}
                  fullWidth
                  name='bannerImgAlt'
                  value={values.bannerImgAlt}
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
                        setFieldValue('bannerImg', e.currentTarget.files[0]);
                      }}
                    />
                  </Button>
                  <label style={{ marginLeft: '1rem' }}>
                    {values.bannerImg && values.bannerImg.name}
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
          <Typography mb={3} mt={2.5} variant='h5'>
            Contact Page Responses
          </Typography>
          <List
            sx={{
              width: '100%',
              maxWidth: '50%',
              margin: '0 auto',
            }}>
            {messages &&
              messages.length !== 0 &&
              messages.map((item, index) => (
                <ListItem
                  key={index}
                  alignItems='flex-start'
                  secondaryAction={
                    <>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => handleDeleteMessage(item.uid)}>
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
