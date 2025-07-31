import React from 'react'

const AnimeCard = ({ show, onClick }) => {
    const { name, vote_average, first_air_date, poster_path } = show;
    return (
        <div className="movie-card" onClick={() => onClick(show)} >

            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}/>
            <div className={"mt-4"}>
                <h3>{name}</h3>
                <div className='content'>
                    <div className='rating'>
                        <img src='../public/star.svg' alt='star'/>
                        <p>{vote_average ? vote_average.toFixed(1): 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <p className='year'>
                        {first_air_date ? first_air_date.split('-')[0] : 'N/A'}
                    </p>
                </div>
            </div>

        </div>
    )
}
export default AnimeCard

