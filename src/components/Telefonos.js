import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Phones from './Phones';

class Telefonos extends Component {

  state = {
    articles: {},
    status: null
  }

  render(){
       
    return (
      <div id='telefonos'>
        <Slider
          title='Telefonos'
          size='slider-small'
        />
        <div className='center'>
          <div id='content'>
            {/* Listado de telefonos que vendran del API REST de Node*/}
            <Phones/>
            
          </div>
          
          <Sidebar
            telefonos='true'
          />
        </div>
        <div className='clearfix'></div>
      </div>
    )
  }
}
export default Telefonos;