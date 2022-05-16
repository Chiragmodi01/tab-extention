import { useEffect, useState } from "react";
import { get } from "axios";

export const useBackgroundImage = () => {
    const [bgURL, setBgURL] = useState(null);
    const defaultBgImg = 'https://pixabay.com/get/g251625c76f3e2fd9d0a8a8afc2c83e830a2920d39b20892ab3ce2f3a8c21636cf49311cd4afb1766fc59cf78c6cbab1736cf03da88a8f21ce72ad7d48839d527_1280.jpg'

    // accepted cats : backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music

    const ACCESS_KEY = '27443352-bb87137647822329acb8af729';
    const endpointLocation = `https://pixabay.com/api/?key=${ACCESS_KEY}&q=landscape&image_type=photo&orientation=horizontal&category=nature&per_page=50&order=popular`;

    const fetchBgImage = async() => {
        console.log('running')
        try {
            const res = await get(endpointLocation);
            setBgURL(res.data.hits[Math.floor(Math.random() * res.data.hits.length)].largeImageURL)
            console.log(res.data)
        } catch(error) {
            console.log(error.message);
            setBgURL(defaultBgImg)
        }
    }

    useEffect(() => {
        fetchBgImage();
    }, [])
    
    return bgURL;
}