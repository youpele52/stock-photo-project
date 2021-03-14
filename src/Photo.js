import React from 'react'

// NESTED SHIT
// reguler is nested object inside of the urls
// photoDetail obj > url obj> regular
// photoDetail obj > user obj > profile_image obj > medium
// photoDetail obj > user obj > profile_image obj > medium
const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <article className='photo'>
      <img src={regular} alt={alt_description} />
      <div className='photo-info'>
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt={name} className='user-img' />
        </a>
      </div>
    </article>
  )
}

export default Photo
