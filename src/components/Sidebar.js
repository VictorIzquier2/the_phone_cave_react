import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

class Sidebar extends Component{

  searchRef= React.createRef();
  state= {
    search: "",
    redirect: false
  }

  redirectToSearch = (e) => {
    e.preventDefault();
    this.setState({
      search: this.searchRef.current.value,
      redirect: true
    });
  }

  render(){

    if(this.state.redirect){
      return(
        <Redirect to={'/redirect/' + this.state.search}/>
      )
    }
    
    return(
      <aside id='sidebar'>
        {this.props.telefonos === 'true' &&
          <div id='nav-blog' className='sidebar-item'>
            <h3>Puedes hacer esto</h3>
            <Link to={'/telefonos/crear'} className='btn btn-success'>Nuevo modelo de telefono</Link>
          </div>
        }
        
        <div id='search' className='sidebar-item'>
          <h3>Búsqueda</h3>
          <p>Encuentra el teléfono que buscas</p>
          <form onSubmit={this.redirectToSearch}>
            <input type='text' name='search' ref={this.searchRef}/>
            <input type='submit' name='submit' value='Buscar' className='btn'/>
          </form>
        </div>
      </aside>
    )
  };
}
export default Sidebar;