import React from 'react'
import './Explorebtn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

const ExploreBtn = ({text}) => {
  return (
    <div className='explore'>
      <button className='exp-btn'>{text}</button>
      <div className='arr'>
        <FontAwesomeIcon icon={faArrowRightLong} />
      </div>
    </div>
  )
}

export default ExploreBtn