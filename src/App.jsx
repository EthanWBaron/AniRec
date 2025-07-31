import React, {useState, useEffect} from 'react'
import Search from "./components/Search.jsx";
import jikanjs from "@mateoaranda/jikanjs";

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

    const [errorMessage, setErrorMessage] = useState('');

    const [showList, setShowList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);


    const fetchShows = async () => {
        setIsLoading(true);
        setErrorMessage('');

        try{
            const endpoint = `${TMDB_BASE_URL}/discover/tv?with_genres=16`;
            const response = await fetch(endpoint, TMDB_API_OPTIONS)

            if(!response.ok){
                throw new Error('Failed to fetch shows');
            }

            const data = await response.json();

            if (data.response == 'False'){
                setErrorMessage(data.error || 'Failed to fetch shows');
                setShowList([]);
                return
            }

            setShowList(data.results ? data.results : []);

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
        fetchShows();
    }, [])


    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                <section className={"all-movies"}>
                    <h2>All shows</h2>
                    {isLoading ? (
                        <p className={'text-white'}>Loading...</p>
                    ): errorMessage ? (<p className= 'text-red-500'>{errorMessage}</p>):
                        (<ul>
                            {showList.map((show) => (
                                <p key={show.id} className='text-white'>{show.name}</p>
                            ))}
                        </ul>)
                    }
                </section>

            </div>

        </main>
    )
}
export default App
