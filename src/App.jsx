import React, {useState} from 'react'
import Search from "./components/Search.jsx";


const App = () => {
    const [searchTerm, setSearchTerm] = useState('');


    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img className="logo" src="../public/logo.png" alt="logo"/>
                    <h1>Find <span className="text-gradient">Trending Anime</span></h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>

        </main>
    )
}
export default App
