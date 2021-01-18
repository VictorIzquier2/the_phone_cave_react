import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Phones from './Phones';

class Home extends Component {
  render() {
    return(
      <div id='home'>
        <Slider
          title='Bienvenido a The Phone Cave'
          btn='telefonos'
          size='slider-big'
        />
        <div className='center'>
          <div id='content'>
              <h1 className='subheader'>Últimos teléfonos</h1>
              <Phones
                home='true'
              />
          </div>
          <Sidebar/>
        </div>
        <div className='clearfix'></div>
      </div>
    )
  }
}
export default Home;