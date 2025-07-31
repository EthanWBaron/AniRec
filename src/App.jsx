import React, {useState, useEffect} from 'react'
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import AnimeCard from "./components/AnimeCard.jsx";
import {useDebounce} from 'react-use'
import AnimeModal from "./components/AnimeModal.jsx";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const TMDB_API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedShow, setSelectedShow] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');

    const [showList, setShowList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);


    const fetchShows = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('');

        try{
            const endpoint = query ?
                `${TMDB_BASE_URL}/search/tv?query=${encodeURIComponent(query)}` : `${TMDB_BASE_URL}/discover/tv?with_genres=16`;
            const response = await fetch(endpoint, TMDB_API_OPTIONS)

            if(!response.ok){
                throw new Error('Failed to fetch shows');
            }

            const data = await response.json();

            let results = data.results;

            if (searchTerm) {
                results = results.filter((show) => show.genre_ids?.includes(16));
            }

            if (data.response == 'False'){
                setErrorMessage(data.error || 'Failed to fetch shows');
                setShowList([]);
                return
            }

            setShowList(data.results ? results : []);

            console.log(data);

        }
        catch(error){
            console.error(`error fetching shows ${error}`)
            setErrorMessage('Could not fetch any shows, please try again later');
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchShows(debounceSearchTerm);
    }, [debounceSearchTerm])


    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">

                <img src="../public/logo.png" className="logo" align="center" />
                <h1>Search Animations</h1>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                <section className={"all-movies"}>
                    <h2 className="mt-[20px]">All shows</h2>
                    {isLoading ? (
                        <Spinner className="align-middle"></Spinner>
                    ): errorMessage ? (<p className= 'text-red-500'>{errorMessage}</p>):
                        (<ul>
                            {showList.map((show) => (
                                <AnimeCard key={show.id} show={show}
                                           onClick={() => setSelectedShow(show)}>

                                </AnimeCard>
                            ))}
                        </ul>)
                    }
                </section>

            </div>

            {selectedShow && (
                <AnimeModal
                    open={!!selectedShow}
                    show={selectedShow}
                    onClose={() => setSelectedShow(null)}
                />
            )}
        </main>
    )
}
export default App
