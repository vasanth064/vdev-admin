import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { Form, Formik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { getData } from '../Helpers/FirestoreHelper';

const Navigation = () => {
  const [nData, setNData] = useState(null);

  useEffect(() => {
    const data = async () => {
      let res = await getData('vdev');
      res = res[0].navgation;
      setNData(res);
    };
    data();
  }, []);

  return (
    nData && (
      <div>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={3} mt={2.5} variant='h5'>
            Navigation Bar
          </Typography>
          <Formik>
            <Form>
              <TextField
                sx={{ mt: 3 }}
                required
                id='outlined-required'
                label='Nav Title'
                fullWidth
              />
              <TextField
                sx={{ mt: 3 }}
                required
                id='outlined-required'
                label='Nav Link'
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
                    <Switch checked={item.active} />
                    <IconButton edge='end' aria-label='delete'>
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
