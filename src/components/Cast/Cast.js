import { useState, useEffect } from 'react';
import apiServices from '../../services/apiServices';
import s from './Cast.module.css';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    apiServices
      .getMovieCast(movieId)
      .then(({ cast }) => {
        setCast(cast);
      })
      .catch(error => console.log(error));
  }, [movieId]);

  const basePosterPath = 'https://image.tmdb.org/t/p/w200';

  return (
    <div>
      <ul className={s.cast}>
        {cast &&
          cast.map(({ credit_id, profile_path, character, name }) => (
            <li key={credit_id} className={s.castItem}>
              {profile_path && (
                <img src={basePosterPath + profile_path} alt={name} />
              )}
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
