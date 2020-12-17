import { hot } from 'react-hot-loader/root'
import React, { useEffect, useState } from 'react'
import image from './assets/image.jpg'
// import bg from './assets/Screenshot 2020-12-16 184240.png'
// import svg from './assets/svg.svg'
// import axios from 'axios'

const App = () => {
  const [state, setState] = useState(1)
  // console.log(state.state.s)
  useEffect(() => {
    let timer = setInterval(() => {
      setState((state) => state + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  // setState(state)
  return (
    <div
      css={`
        h1 {
          color: green;
        }
      `}
    >
      <img src={image} alt="" />
      {/* <img src={svg} alt="" /> */}
      {/* <Star /> */}
      <h1>color {state}</h1>
      <button onClick={() => setState((a) => a + 1)}>click</button>
    </div>
  )
}

let app = App

if (process.env.NODE_ENV === 'development') {
  app = hot(App)
}

export default app
