import { Paper, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { Route, Routes, useLocation } from 'react-router-dom';
import AppHeader from './Components/AppHeader';
import { PrivateRoute } from './Components/PrivateRoute';
import projectRoutes from './projectRoutes';
import { ThemeProvider } from '@mui/material/styles';
import vdevAdminTheme from './Theme';
import GoogleAuthenticationProvider from './Contexts/GoogleAuthContext';
import { ScopedCssBaseline } from '@mui/material';

function App() {
  const location = useLocation();

  return (
    <GoogleAuthenticationProvider>
      <ScopedCssBaseline enableColorScheme>
        <ThemeProvider theme={vdevAdminTheme}>
          {location.pathname !== '/login' ? (
            <Toolbar>
              <AppHeader />
            </Toolbar>
          ) : null}
          <Routes>
            {projectRoutes.map((item, index) =>
              item.private ? (
                <Route
                  key={index}
                  path={item.path}
                  element={
                    <PrivateRoute>
                      <Paper
                        square
                        sx={{ minHeight: '100vh', paddingBottom: '5vh' }}>
                        <Box sx={{ pt: 5 }}>{item.element}</Box>
                      </Paper>
                    </PrivateRoute>
                  }
                />
              ) : (
                <Route key={index} path={item.path} element={item.element} />
              )
            )}
          </Routes>
        </ThemeProvider>
      </ScopedCssBaseline>
    </GoogleAuthenticationProvider>
  );
}

export default App;
