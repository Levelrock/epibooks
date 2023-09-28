import React, {useState, useEffect, createContext} from "react";



export const PostProvider = createContext();


export const PostContext = ({children}) =>{
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(false);

    const GetBooksAPI = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('https://epibooks.onrender.com')
            const data = await response.json()

            setBooks(data)
            setIsLoading(false)
            setFilteredBooks(data)


        } catch (error) {
            setError(error)
            console.log('Errore nel caricamento dei dati', error);
        }
    }

    useEffect (() => {
        GetBooksAPI();


    }, []);

    return(
        <>
            <PostProvider.Provider value={{filteredBooks, setFilteredBooks, books, isLoading, error, GetBooksAPI, setError, selected, setSelected  }} >
                {children}
            </PostProvider.Provider>



        </>
    )
}

export default PostContext;

