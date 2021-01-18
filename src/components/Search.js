import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Phones from './Phones';

class Search extends Component {

  render(){

    const searched = this.props.match.params.search;
    
    return(
      <div id='Search'>
        <Slider
          title={'Busqueda: ' + searched}
          size='slider-small'
        />
        <div className='center'>
          <div id='content'>
            {/* Listado de artículos que vendran del API REST de Node */}
            <Phones
              search={searched}
            />
          </div>

          <Sidebar
            blog='true'
          />
        </div>
        <div className='clearfix'></div>
      </div>
    )
  }

}
export default Search;