import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Masonry from '@mui/lab/Masonry';
import { Container } from '@mui/system';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { getData } from '../Helpers/FirestoreHelper';

const Projects = () => {
  const colors = ['#8be9fd', '#ffb86c', '#ff79c6', '#ff5555', '#f1fa8c'];
  const random = () => {
    return Math.floor(Math.random() * (5 - 0)) + 0;
  };

  const [pData, setPData] = useState(null);

  useEffect(() => {
    const data = async () => {
      let res = await getData('vdev');
      res = res[0].portfolio;
      setPData(res);
    };
    data();
  }, []);

  return (
    pData && (
      <div>
        <Container sx={{ marginBottom: '3rem' }}>
          <Typography mb={3} mt={2.5} variant='h5'>
            Add Projects
          </Typography>
          <Formik>
            <Form>
              <TextField
                required
                id='outlined-required'
                label='Project Name'
                fullWidth
              />
              <TextField
                sx={{ mt: 3 }}
                required
                id='outlined-required'
                label='Stack Used'
                fullWidth
              />
              <Stack direction='row' spacing={1} sx={{ mt: 3 }}>
                <Chip
                  label='Deletable'
                  variant='filled'
                  style={{
                    background: `${colors[random()]}`,
                    color: '#282a36',
                  }}
                  onDelete={() => {}}
                />
                <Chip
                  label='Deletable'
                  variant='filled'
                  style={{
                    background: `${colors[random()]}`,
                    color: '#282a36',
                  }}
                  onDelete={() => {}}
                />
              </Stack>
              <TextField
                sx={{ mt: 3 }}
                required
                id='outlined-required'
                label='Project Link'
                fullWidth
              />
              <FormControl sx={{ mt: 3 }}>
                <FormLabel id='demo-row-radio-buttons-group-label'>
                  Category
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'>
                  <FormControlLabel
                    value='female'
                    control={<Radio />}
                    label='Female'
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                sx={{ mt: 3 }}
                required
                id='outlined-required'
                label='Image Description'
                fullWidth
              />
              <Box sx={{ mt: 3 }}>
                <Button variant='contained' component='label' id='upload'>
                  Upload
                  <input hidden accept='image/*' type='file' />
                </Button>
                <label style={{ marginLeft: '1rem' }}>filename.png</label>
              </Box>
              <Card sx={{ mt: 3 }}>
                <CardMedia
                  component='img'
                  alt='green iguana'
                  sx={{ width: '30vw', margin: 'auto' }}
                />
                <CardContent>
                  <Typography variant='body2' color='text.secondary'>
                    Lizards are a widespread group of squamate reptiles.
                  </Typography>
                </CardContent>
              </Card>
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
        <Container mt={5} mb={5}>
          <Typography mb={3} mt={2.5} variant='h5'>
            Manage Categories
          </Typography>
          <Formik>
            <Form>
              <Stack direction='row' spacing={1} sx={{ mt: 5, mb: 5 }}>
                {pData.categories.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    variant='filled'
                    style={{
                      background: `${colors[random()]}`,
                      color: '#282a36',
                    }}
                    onDelete={() => {}}
                  />
                ))}
              </Stack>
              <TextField
                required
                id='outlined-required'
                label='Category Name'
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
        <Container mt={5} mb={5}>
          <Typography mb={3} mt={2.5} variant='h5'>
            Manage Projects
          </Typography>
          <Box sx={{ display: 'grid', placeItems: 'center' }}>
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
              {pData.projects.map((item, index) => (
                <Card sx={{ maxWidth: 345 }} key={index}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {item.name}
                    </Typography>
                    <Box>
                      <Typography
                        variant='subtitle1'
                        color='text.secondary'
                        mb={1}
                        mt={2}>
                        Tech Stack
                      </Typography>
                      <Stack direction='row' spacing={1}>
                        {item.code.map((item, index) => (
                          <Chip
                            key={index}
                            label={item}
                            variant='filled'
                            style={{
                              background: `${colors[random()]}`,
                              color: '#282a36',
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                    <Box>
                      <Typography
                        variant='subtitle1'
                        color='text.secondary'
                        mb={1}
                        mt={2}>
                        Category
                      </Typography>
                      <Chip
                        label={item.tag}
                        variant='filled'
                        color='secondary'
                      />
                    </Box>
                  </CardContent>
                  <CardActionArea>
                    <CardActions
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '0.5rem 0.5rem',
                      }}>
                      <Button
                        variant='contained'
                        endIcon={<SendIcon />}
                        href={item.link}
                        target='_blank'>
                        Send
                      </Button>
                      <Button variant='contained' startIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </CardActions>
                  </CardActionArea>
                </Card>
              ))}
            </Masonry>
          </Box>
        </Container>
      </div>
    )
  );
};

export default Projects;
