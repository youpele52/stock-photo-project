import { queryByRole } from '@testing-library/dom'
import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
// this url is from unsplash documentation page https://unsplash.com/documentation

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')

  const fetchImages = async () => {
    setLoading(true)
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`
    // if url is truthy that is it not ''
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()

      // console.log(data)
      // both set photos below will work
      // setPhotos([...photos, ...data])
      setPhotos((oldPhotos) => {
        // previously when we search for cat for example, all the cat images are appended
        // to end of our page. Hence here we will change such behaviour
        // if (!query) {
        //   setPage(0)
        //   return [...data]
        // }
        if (query && page === 1) {
          return data.results
        } else if (query) {
          return [...oldPhotos, ...data.results]
        } else {
          return [...oldPhotos, ...data]
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // console.log(error)
    }
  }
  // useffect that is invoked when the page renders at first
  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line
  }, [page])

  // handling scroll event
  // useffect that is invoked when the page is scrolled
  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      // inner height of the browser window
      // console.log(`innerHeight: ${window.innerHeight}`)
      // console.log(`scrollY: ${window.scrollY}`)
      // console.log(`body height: ${document.body.scrollHeight}`)

      // checking if we have gotten to the end of the page
      // we subtract 2 px from that so the func runs a little bit before we actually get to the page end
      // when we get to the page end AND loading is false then run this,
      // but do not run this if loading is true
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        console.log('it worked')
        // setPage(page + 1)
        setPage((oldPage) => {
          return oldPage + 1
        })
        // fetchImages()
      }
    })

    return () => window.removeEventListener('scroll', event)
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    // console.log(query)
    e.preventDefault()
    setPage(1)
    fetchImages()
  }

  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='search'
            className='form-input'
            value={query}
            // e here is event and not error
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((photoDetail, index) => {
            // we are passing inthe each received photoDetail to our component
            // console.log(photoDetail)
            return <Photo key={photoDetail.id} {...photoDetail} />
          })}
        </div>
        {loading && <h2 className='loading'> Loading...</h2>}
      </section>
    </main>
  )
}

export default App
