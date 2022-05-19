import { useEffect } from "react"

export const useFetchLocalStorage = (key, setState, parsed) => {
    const getData = useEffect(() => {
        if(parsed) {
            const data = JSON.parse(localStorage.getItem(key));
            setState(data);
        } else {
            const data = localStorage.getItem(key);
            setState(data);
        }
    }, [])
    
    return {getData}
}