import React from 'react';

const AnimeModal = ({ open, onClose, show }) => {
    if (!open || !show) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-0 flex justify-center items-center p-4 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="relative bg-[#0f0f1b] text-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-md mx-auto p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-400 w-[20px] h-[20px]"
                >
                    &times;
                </button>

                <img
                    src={show.poster_path ? `https://image.tmdb.org/t/p/w500/${show.poster_path}` : '/no-movie.png'}
                    alt={show.name}
                    className="w-60 h-100 rounded-md mb-4 mx-auto"
                />

                <h2 className="text-xl font-bold mb-2">{show.name}</h2>

                <p className="text-sm text-gray-300 max-h-48 overflow-y-auto">
                    {show.overview || 'No description available.'}
                </p>

                <div className="flex items-center text-sm text-gray-400 space-x-2 mt-3">
                    <div className="flex items-center space-x-1">
                        <img src="/star.svg" className="w-4 h-4" alt="star" />
                        <span>{show.vote_average ? show.vote_average.toFixed(1) : 'N/A'}</span>
                    </div>
                    <span>•</span>
                    <span>{show.first_air_date ? show.first_air_date.split('-')[0] : 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};

export default AnimeModal;
