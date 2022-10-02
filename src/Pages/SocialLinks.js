import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { Form, Formik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { getFileURL, updateData } from '../Helpers/FirestoreHelper';

const SocialLinks = ({ vData, handleGetData }) => {
  const tableName = 'vdev';
  const uid = vData && vData[0].uid;
  const [sData, setSData] = useState(vData && vData[0].socialLinks);

  const handleSocialDelete = (index) => {
    const data = sData.filter((item, i) => i != index);
    setSData(data);
    updateData('vdev', uid, {
      socialLinks: data,
    });
    handleGetData();
  };
  return (
    sData && (
      <div>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={3} mt={2.5} variant='h5'>
            Social Links
          </Typography>
          <Formik
            initialValues={{
              platformName: '',
              accountName: '',
              accountLink: '',
              platformIconAlt: '',
              platformIcon: null,
            }}
            onSubmit={async (values) => {
              const url = await getFileURL(values.platformIcon, tableName);
              values.platformIcon = url;
              const post = [...sData, values];
              updateData(tableName, uid, {
                socialLinks: post,
              });
              setSData([...sData, post]);
              handleGetData();
              document.querySelector('#socialLinks').reset();
            }}>
            {({ isSubmitting, handleChange, values, setFieldValue }) => (
              <Form id='socialLinks'>
                <TextField
                  sx={{ mt: 3 }}
                  required
                  id='outlined-required'
                  label='Platform Name'
                  fullWidth
                  name='platformName'
                  onChange={handleChange}
                  value={values.platformName}
                />
                <TextField
                  sx={{ mt: 3 }}
                  id='outlined-required'
                  label='Account Name'
                  fullWidth
                  name='accountName'
                  onChange={handleChange}
                  value={values.accountName}
                />
                <TextField
                  sx={{ mt: 3 }}
                  required
                  id='outlined-required'
                  label='Account Link'
                  fullWidth
                  name='accountLink'
                  onChange={handleChange}
                  value={values.accountLink}
                />

                <TextField
                  sx={{ mt: 3 }}
                  required
                  id='outlined-required'
                  label='Platform Icon Alt'
                  fullWidth
                  name='platformIconAlt'
                  onChange={handleChange}
                  value={values.platformIconAlt}
                />

                <Box sx={{ mt: 5 }}>
                  <Button variant='contained' component='label' id='upload'>
                    Upload
                    <input
                      hidden
                      name='platformIcon'
                      accept='image/*'
                      type='file'
                      onChange={(e) => {
                        setFieldValue('platformIcon', e.currentTarget.files[0]);
                      }}
                    />
                  </Button>
                  <label style={{ marginLeft: '1rem' }}>
                    {values.platformIcon && values.platformIcon.name}
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
          <List
            sx={{
              width: '100%',
              maxWidth: '50%',
              margin: '0 auto',
            }}>
            {sData.map((item, index) => (
              <div key={index}>
                <ListItem
                  alignItems='flex-start'
                  secondaryAction={
                    <>
                      <Button href={item.link} target='_blank'>
                        Open
                      </Button>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => handleSocialDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }>
                  <ListItemAvatar>
                    <Avatar alt={item.platformName} src={item.platformIcon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.platformName}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'>
                          {item.accountName}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
              </div>
            ))}
          </List>
        </Container>
      </div>
    )
  );
};

export default SocialLinks;
