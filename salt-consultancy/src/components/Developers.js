import React from 'react';


const Developers = () => {
  const skills1 = ['JavaScript', 'MongoDB', 'Express', 'Git', 'HTML', 'Handlebars', 'CSS', 'Mocha', 'PostgreSQL']
  const skills2 = ['JavaScript', 'React', 'MongoDB', 'Express', 'TDD', 'REST', 'NPM', 'Mocha', 'jQuery', 'PostgreSQL']
  const skills3 = ['JavaScript', 'Node', 'Express', 'CSS', 'TDD', 'REST', 'NPM', 'Mocha', 'PostgreSQL']
  return (
    <div className='dev-container'>
      <h1>Developers</h1>
      <div className="grid-container">
        <div className='developer'>
          <img src="/img/andre.jpg"></img>
          <h5>André Tauffer</h5>
          <h6>Skills:</h6>
          <div className='skills'>
            {skills1.map((skill, i) => {
              return <p>- {skill}</p>
            })}
          </div>
        </div>
        <div className='developer'>
          <img src="/img/christian.jpg"></img>
          <h5>Christian Sandström</h5>
          <h6>Skills:</h6>
          <div className='skills'>
            {skills2.map(skill => {
              return <p>- {skill}</p>
            })}
          </div>
        </div>
        <div className='developer'>
          <img src="/img/chris.jpg"></img>
          <h5>Christoffer Sundqvist</h5>
          <h6>Skills:</h6>
          <div className='skills'>
            {skills3.map(skill => {
              return <p>- {skill}</p>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


export default Developers;
