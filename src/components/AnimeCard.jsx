import React from 'react'

const AnimeCard = ({show: {name,vote_average,release_date, poster_path}}) => {
    return (
        <div className="movie-card">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}/>

        </div>
    )
}
export default AnimeCard

