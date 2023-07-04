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
import {
  getData,
  deleteData,
  deleteArrayItem,
  updateArrayItem,
  getFileURL,
  addData,
} from '../Helpers/FirestoreHelper';

const Projects = () => {
  const colors = ['#8be9fd', '#ffb86c', '#ff79c6', '#ff5555', '#f1fa8c'];
  const random = () => {
    return Math.floor(Math.random() * (5 - 0)) + 0;
  };

  const [tags, setTags] = useState(null);
  const [projects, setProjects] = useState(null);
  const [tagUID, setTagUID] = useState(null);
  const [projectStack, setProjectStack] = useState([]);

  const getTags = async () => {
    const res = await getData('projectTags');
    setTagUID(res[0].uid);
    setTags(res[0].tags);
  };

  const getProjects = async () => {
    const res = await getData('projects');
    setProjects(res);
  };

  const handleDeleteProject = async (uid) => {
    await deleteData('projects', uid);
    getProjects();
  };

  const handleDeleteTags = async (item) => {
    await deleteArrayItem('projectTags', tagUID, 'tags', item);
    getTags();
  };

  useEffect(() => {
    getTags();
    getProjects();
  }, []);

  return (
    tags &&
    projects && (
      <div>
        <Container mt={5} mb={5}>
          <Typography mb={3} mt={2.5} variant='h5'>
            Manage Categories
          </Typography>
          <Formik
            initialValues={{
              tagName: '',
            }}
            onSubmit={async ({ tagName }) => {
              await updateArrayItem('projectTags', tagUID, 'tags', tagName);
              getTags();
            }}>
            {({ isSubmitting, handleChange, values }) => (
              <Form>
                <Stack direction='row' spacing={1} sx={{ mt: 5, mb: 5 }}>
                  {tags.map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      variant='filled'
                      style={{
                        background: `${colors[random()]}`,
                        color: '#282a36',
                      }}
                      onDelete={() => handleDeleteTags(item)}
                    />
                  ))}
                </Stack>
                <TextField
                  required
                  id='outlined-required'
                  label='Category Name'
                  fullWidth
                  name='tagName'
                  onChange={handleChange}
                  value={values.tagName}
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
            Add Projects
          </Typography>
          <Formik
            initialValues={{
              projectName: '',
              gitLink: '',
              projectLink: '',
              projectCategory: '',
              projectBanner: null,
              projectBannerAlt: '',
            }}
            onSubmit={async (values) => {
              const url = await getFileURL(values.projectBanner, 'projects');
              values.projectBanner = url;
              const data = {
                ...values,
                projectStack,
              };
              console.log(data);
              await addData('projects', data);
              getProjects();
              document.querySelector('#project').reset();
            }}>
            {({ isSubmitting, values, handleChange, setFieldValue }) => (
              <Form id='project'>
                <TextField
                  required
                  id='projectName'
                  label='Project Name'
                  fullWidth
                  onChange={handleChange}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <TextField
                    sx={{ mt: 3, mr: 3 }}
                    label='Stack Used'
                    id='stack'
                  />
                  <Button
                    variant='contained'
                    sx={{ mt: 3 }}
                    onClick={() => {
                      const stack = document.querySelector('#stack');
                      setProjectStack((prevStack) => [
                        ...prevStack,
                        stack.value,
                      ]);
                      stack.value = '';
                    }}>
                    ADD
                  </Button>
                </div>

                {projectStack && projectStack.length !== 0 && (
                  <Stack direction='row' spacing={1} sx={{ mt: 3 }}>
                    {projectStack.map((item, index) => (
                      <Chip
                        key={index}
                        label={item}
                        variant='filled'
                        style={{
                          background: `${colors[random()]}`,
                          color: '#282a36',
                        }}
                        onDelete={() => {
                          setProjectStack(
                            projectStack.filter((i) => i !== item)
                          );
                        }}
                      />
                    ))}
                  </Stack>
                )}
                <TextField
                  sx={{ mt: 3 }}
                  required
                  id='gitLink'
                  label='Git Link'
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  sx={{ mt: 3 }}
                  required
                  id='projectLink'
                  label='Project Link'
                  fullWidth
                  onChange={handleChange}
                />
                <FormControl sx={{ mt: 3 }}>
                  <FormLabel id='demo-row-radio-buttons-group-label'>
                    Category
                  </FormLabel>
                  <RadioGroup
                    name='projectCategory'
                    value={values.selectedOption}
                    onChange={(event) => {
                      setFieldValue(
                        'projectCategory',
                        event.currentTarget.value
                      );
                    }}
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'>
                    {tags.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item}
                        control={<Radio />}
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>

                <TextField
                  sx={{ mt: 3 }}
                  required
                  id='projectBannerAlt'
                  label='Image Alt'
                  onChange={handleChange}
                  fullWidth
                />
                <Box sx={{ mt: 5 }}>
                  <Button variant='contained' component='label' id='upload'>
                    Upload
                    <input
                      hidden
                      accept='image/*'
                      type='file'
                      name='projectBanner'
                      onChange={(e) => {
                        setFieldValue(
                          'projectBanner',
                          e.currentTarget.files[0]
                        );
                      }}
                    />
                  </Button>
                  <label style={{ marginLeft: '1rem' }}>
                    {values.projectBanner && values.projectBanner.name}
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

        <Container mt={5} mb={5}>
          <Typography mb={3} mt={2.5} variant='h5'>
            Manage Projects
          </Typography>
          <Box sx={{ display: 'grid', placeItems: 'center' }}>
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
              {projects &&
                projects.map((item, index) => (
                  <Card sx={{ maxWidth: 345 }} key={index}>
                    <CardMedia
                      component='img'
                      height='140'
                      image={item.projectBanner}
                      alt={item.projectBannerAlt}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {item.projectName}
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
                          {item.projectStack.map((item, index) => (
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
                          label={item.projectCategory}
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
                          href={item.projectLink}
                          target='_blank'>
                          Send
                        </Button>
                        <Button
                          variant='contained'
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteProject(item.uid)}>
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
