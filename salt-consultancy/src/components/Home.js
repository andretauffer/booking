import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Parallax } from 'react-scroll-parallax';


const Home = () => {
  return (
    <Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
      <div className='home-container'>
        <Jumbotron className="jumbotron">
          <h1>Salt Consultancy</h1>
          <p>
            Highly experienced node.js professionals available for short term assignments.
          </p>
          <p>
            <Button className="jt-btn" variant="primary">Book now</Button>
          </p>
        </Jumbotron>
      </div>
    </Parallax>
  );
}


export default Home;