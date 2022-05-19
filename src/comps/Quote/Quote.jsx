import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Quote.css'

function Quote() {
    const [quote, setQuote] = useState({title:'', author: ''});

    const fetchQuote = async() => {
        const URL = 'https://zenquotes.io/api/random';
        try {
            const res = await axios.get(URL, {headers: res.header( "Access-Control-Allow-Origin" )});
            console.log(res);
            const data = JSON.parse(res.data);
            setQuote({title: data.q, author: data.a});
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchQuote();
    }, [])

  return (
    <div className='Quote flex-centered'>
        <span className="quote-title">{quote.title}</span>
        <span className="auote-author">{quote.author}</span>
    </div>
  )
}

export {Quote}