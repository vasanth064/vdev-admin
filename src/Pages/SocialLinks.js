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
import { useEffect, useState } from 'react';
import { getData } from '../Helpers/FirestoreHelper';
const SocialLinks = () => {
  const [sData, setSData] = useState(null);

  useEffect(() => {
    const data = async () => {
      let res = await getData('vdev');
      res = res[0].socialLinks;
      setSData(res);
    };
    data();
  }, []);
  return (
    sData && (
      <div>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={3} mt={2.5} variant='h5'>
            Social Links
          </Typography>
          <Formik>
            <Form>
              <TextField
                sx={{ mt: 3 }}
                required
                id='outlined-required'
                label='Platform Name'
                fullWidth
              />
              <TextField
                sx={{ mt: 3 }}
                required
                id='outlined-required'
                label='Account Name'
                fullWidth
              />
              <TextField
                sx={{ mt: 3 }}
                required
                id='outlined-required'
                label='Account Link'
                fullWidth
              />
              <Card sx={{ mt: 3 }}>
                <CardMedia
                  component='img'
                  alt='green iguana'
                  sx={{ width: '30vw', margin: 'auto' }}
                />
              </Card>
              <TextField
                sx={{ mt: 3 }}
                required
                id='outlined-required'
                label='Platform Icon'
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
                      <IconButton edge='end' aria-label='delete'>
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
