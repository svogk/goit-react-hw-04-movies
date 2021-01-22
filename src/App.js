import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import NotFoundPage from './pages/NotFoundPage';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "Home-page" */),
);
const MoviesPages = lazy(() =>
  import('./pages/MoviesPages' /* webpackChunkName: "Movies-page" */),
);
const MovieDetailsPages = lazy(() =>
  import(
    './pages/MovieDetailsPages' /* webpackChunkName: "Movie-details-page" */
  ),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPages />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPages />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
