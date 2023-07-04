import {
  Button,
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
import { updateData } from '../Helpers/FirestoreHelper';

const Navigation = ({ vData, handleGetData }) => {
  const [nData, setNData] = useState(vData && vData[0].navigation);
  const uid = vData && vData[0].uid;

  const handleNavDelete = async (index) => {
    const data = nData.filter((item, i) => i !== index);
    setNData(data);
    updateData('vdev', uid, {
      navigation: data,
    });
    handleGetData();
  };

  return (
    nData && (
      <div>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={3} mt={2.5} variant='h5'>
            Navigation Bar
          </Typography>
          <Formik
            initialValues={{
              navTitle: '',
              navLink: '',
            }}
            onSubmit={async (res) => {
              const post = [...nData, res];
              setNData((prevData) => [...prevData, res]);
              updateData('vdev', uid, {
                navigation: post,
              });
              document.querySelector('#nav').reset();
              handleGetData();
            }}>
            {({ isSubmitting, handleChange, values }) => (
              <Form id='nav'>
                <TextField
                  sx={{ mt: 3 }}
                  required
                  name='navTitle'
                  id='outlined-required'
                  label='Nav Title'
                  value={values.navTitle}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  sx={{ mt: 3 }}
                  required
                  id='outlined-required'
                  name='navLink'
                  value={values.navLink}
                  onChange={handleChange}
                  label='Nav Link'
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
          <Typography mb={3} mt={2.5} variant='h5'>
            Manage Navigation
          </Typography>
          <List
            sx={{
              width: '100%',
              maxWidth: '50%',
              margin: '0 auto',
            }}>
            {nData.map((item, index) => (
              <ListItem
                key={index}
                alignItems='flex-start'
                secondaryAction={
                  <>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => handleNavDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }>
                <ListItemText
                  primary={item.navTitle}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'>
                        {item.navLink}
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

export default Navigation;
