import React from 'react';
import { Parallax } from 'react-scroll-parallax';


const About = () => {
  return (
    <Parallax className="custom-class" y={[-5, 5]} tagOuter="figure">
      <div className='about-container'>
        <h1>About</h1>
        <p className='about-text'>Lorem ipsum dolor amet pitchfork meditation adaptogen sriracha, narwhal woke lomo art party. Lumbersexual thundercats coloring book, cold-pressed artisan gochujang echo park williamsburg craft beer chartreuse shabby chic truffaut. Wayfarers austin prism stumptown vexillologist fam. Tousled hashtag brooklyn biodiesel. Jianbing try-hard poutine hot chicken man braid, readymade sartorial shabby chic brunch lomo vape offal.
          Tumeric letterpress air plant small batch tilde literally glossier organic sartorial snackwave godard four loko ramps chartreuse. Hashtag chartreuse lo-fi franzen banh mi keytar schlitz live-edge cliche. Bitters man bun umami put a bird on it leggings XOXO poke mustache retro humblebrag actually biodiesel helvetica single-origin coffee asymmetrical. Pinterest jean shorts lomo waistcoat. Flannel cornhole farm-to-table, dreamcatcher kitsch locavore direct trade deep v pitchfork gastropub green juice godard knausgaard synth neutra. Deep v pork belly shoreditch, salvia meh banjo photo booth.
          Four loko bicycle rights art party migas, kombucha chambray vinyl jean shorts 8-bit. Sriracha meditation food truck, helvetica asymmetrical snackwave unicorn franzen tumblr taiyaki tacos. Fam pickled knausgaard bespoke distillery marfa squid lo-fi. Flexitarian vexillologist shaman gluten-free PBR&B distillery, umami asymmetrical viral intelligentsia heirloom kitsch organic food truck. Flannel microdosing chartreuse, post-ironic vexillologist +1 before they sold out distillery taiyaki. Flannel cred four loko kickstarter portland enamel pin gochujang tofu pinterest mustache keytar DIY pork belly coloring book vinyl. Lomo raclette dreamcatcher, plaid selfies gastropub meh vape paleo listicle crucifix +1 asymmetrical.
        </p>
      </div>
    </Parallax>
  );
}


export default About;
