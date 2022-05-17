import { useEffect, useState } from "react";
import { get } from "axios";

export const useBackgroundImage = () => {
    const [bgURL, setBgURL] = useState(null);
    const [bgCategories, setBgCategoies] = useState(['nature']);
    const randomBgCategory = bgCategories[Math.floor(Math.random()*bgCategories.length)]
    // bgCategories.map((category) => category)

    const defaultBgImg = 'https://pixabay.com/get/g51f2ec521e94f4b828cab9c04e990341ec3fe5557c35e190a2b4befa185a2f61ad1f474c407ff1b93f2a18e093deb0a35bb0734dd9483411d18a55ff98748bd3_1280.jpg'

    const ACCESS_KEY = '27443352-bb87137647822329acb8af729';
    const endpointLocation = `https://pixabay.com/api/?key=${ACCESS_KEY}&q=landscape&image_type=photo&orientation=horizontal&category=${randomBgCategory}&per_page=50&order=popular`;

    console.log(endpointLocation)

    const fetchBgImage = async() => {
        try {
            const res = await get(endpointLocation);
            setBgURL(res.data.hits[Math.floor(Math.random() * res.data.hits.length)].largeImageURL)
        } catch(error) {
            console.log(error.message);
            setBgURL(defaultBgImg)
        }
    }

    useEffect(() => {
        fetchBgImage();
    }, [])
    
    return {bgURL, bgCategories, setBgCategoies}

    // const ACCESS_KEY ='yqZg2NDW5ZeY5mY9xhrcBgW3dt6sJzvZ40SmZOzPOC0';
    // const endpointLocation = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`;
}