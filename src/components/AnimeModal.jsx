import React from 'react'

const AnimeModal = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">{show.name}</h2>
                <p className="text-gray-700">{show.overview || "No description available."}</p>
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Close
                </button>
            </div>
        </div>
    )
}
export default AnimeModal
