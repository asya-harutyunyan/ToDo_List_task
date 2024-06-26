import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider, createTheme } from '@mui/material';

interface IThemeProviderProps {
  children: ReactNode;
}

const theme = createTheme();

const Providers: FC<IThemeProviderProps> = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Provider>
);

export default Providers;
