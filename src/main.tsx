import '@fontsource-variable/fredoka';
import '@fontsource-variable/source-code-pro';
import '@fontsource-variable/urbanist';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import Home from './pages/Home/Home';
import WordPathGame from './pages/WordPathGame/WordPathGame';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/word-node-game',
    element: <WordPathGame />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
