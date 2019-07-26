import React, { useRef } from 'react';
import { Parallax } from 'react-scroll-parallax';


const Developers = () => {
  let devRef = useRef(null)
  return (
    <Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
    <div>

        <h1>Developers</h1>
      <div ref={devRef} className='developers-container'>
        <div className="dev-container">
          <div className='developer'>
            <img src="/img/andre.jpg" alt="Andre"></img>
            <div className='developer-info'>
              <h5>Andre Tauffer</h5>

              <p>JavaScript | Node.js | Express | Git | React | MongoDB | CSS | Mocha | PostgreSQL</p>
            </div>
          </div>
          <div className='developer'>
            <img src="/img/christian.jpg" alt="Christian"></img>
            <div className='developer-info'>
              <h5>Christian Sandström</h5>

              <p>JavaScript | Node.js | Express | Git | React | MongoDB | CSS | Mocha | PostgreSQL</p>
            </div>
          </div>
          <div className='developer'>
            <img src="/img/chris.jpg" alt="Christoffer"></img>
            <div className='developer-info'>
              <h5>Christoffer Sundqvist</h5>

              <p>JavaScript | Node.js | Express | Git | React | MongoDB | CSS | Mocha | PostgreSQL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Parallax>
  );
}


export default Developers;
