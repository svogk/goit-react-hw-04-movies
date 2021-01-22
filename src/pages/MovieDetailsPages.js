import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Link,
  Switch,
  Route,
  useParams,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

import apiServices from '../services/apiServices';
import Loader from '../components/Loader/Loader';

import s from './MovieDetailsPages.module.css';

const Cast = lazy(() => import('../components/Cast/Cast'));
const Reviews = lazy(() => import('../components/Reviews/Reviews'));

export default function MovieDetailsPages() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    apiServices
      .getMovieDetales(movieId)
      .then(setMovie)
      .catch(error => console.log(error));
  }, [movieId]);

  const handleGoBack = () => history.goBack();

  if (!movie) return <Loader />;

  const {
    title,
    poster_path,
    overview,
    genres,
    release_date,
    vote_average,
  } = movie;

  const basePosterPath = 'https://image.tmdb.org/t/p/w300';

  return (
    <div>
      <button className={s.buttonGoBack} type="button" onClick={handleGoBack}>
        <span>&#8592;</span>Go back
      </button>
      <div>
        {movie && (
          <div className={s.movieInfo}>
            <img src={basePosterPath + poster_path} alt={title} />
            <div className={s.movieDescription}>
              <h1>
                {title} ({release_date.slice(0, 4)})
              </h1>
              <p>User Score: {vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h3>Genres</h3>
              <p>{genres.map(({ name }) => name + ' ')}</p>
            </div>
          </div>
        )}
      </div>

      <div className={s.addInfo}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to={`${url}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`${url}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path={`${path}/cast`}>
            {movie && <Cast movieId={movieId} />}
          </Route>
          <Route path={`${path}/reviews`}>
            {movie && <Reviews movieId={movieId} />}
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
