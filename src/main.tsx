import '@fontsource-variable/fredoka';
import '@fontsource-variable/source-code-pro';
import '@fontsource-variable/urbanist';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import Home from './pages/Home/Home';
import WordPathGame from './pages/WordPathGame/WordPathGame';
import { HomeThemeProviderWrapper } from './styles/home/HomeThemeContext';
import { WordPathThemeProviderWrapper } from './styles/word-path/WordThemeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HomeThemeProviderWrapper>
        <Home />
      </HomeThemeProviderWrapper>
    ),
  },
  {
    path: '/word-node-game',
    element: (
      <WordPathThemeProviderWrapper>
        <WordPathGame />
      </WordPathThemeProviderWrapper>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
