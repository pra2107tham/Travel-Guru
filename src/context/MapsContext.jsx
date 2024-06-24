import { Children, createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

const MapsContext = createContext();

export const useMapsContext = () => {
    return useContext(MapsContext) 
}

export const MapsContextProvider = ({children}) => {
    const [places,setPlaces] = useState([])
    return (
        <MapsContext.Provider value={{places,setPlaces}}>
            {children}
        </MapsContext.Provider>
    )
}