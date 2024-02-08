import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='homefull'>
      <div className="titlecard">
        <div className="titlecontent">
          <h1>Quick kart</h1>
          <h4>A huge mart at your's Home</h4>
          <Link to="/login2page">
            <button>Shop Now!</button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home