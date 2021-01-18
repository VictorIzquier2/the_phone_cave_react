import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import {Link} from 'react-router-dom';
import NoDisponible from '../assets/images/nodisponible.png';

class Phones extends Component {

  url = Global.url;

  state = {
    phones: [],
    status: null
  }

  getPhones = () => {
    axios.get(this.url + "telefonos-from-db")
      .then( (res) => {
        this.setState({
          phones: res.data.phonesFromDB,
          status: 'success'
        });
      })
  }

  getLastPhones = () => {
    axios.get(this.url + 'telefonos-from-db/last')
      .then((res) => {
        this.setState({
          phones: res.data.phonesFromDB,
          status: 'success'
        });
      })
  }
  
  getPhonesBySearch = (searched) => {
    axios.get(this.url + 'search/' + searched)
      .then((res) => {
        if(res.data.phonesFromDB){
          this.setState({
            phones: res.data.phonesFromDB,
            status: 'success'
          });
        }else{
          this.setState({
            phones: res.data.phonesFromDB,
            status: 'failed'
          })
        }
      })
  }
  
  componentDidMount(){
    const home = this.props.home;
    const search = this.props.search;
    if(home === 'true'){
      this.getLastPhones();
    }else if(search && search !== null && search !== undefined){
      this.getPhonesBySearch(search);
    }else{
      this.getPhones();
    }
  }

  render(){
    if(this.state.phones.length < 1 && this.state.status === null){
      return(
        <div id='phones'>
          <h1>Cargando...</h1>
        </div>
      );
    }else if(this.state.phones.length < 1 && this.state.status === 'success'){
      return(
        <div id='phones'>
          <h1>No hay modelos de teléfono para mostrar</h1>
        </div>
      );
    }else{
      const listPhones = this.state.phones.map(
        (phone, i) => {
          return(
            <article key={i} className='article-item' id='article-template'>
              <div className='image-wrap'>
                {phone.imageFileName != null ? (
                  <img src={this.url + 'get-image/' + phone.imageFileName} alt={phone.name}/>
                ) : (
                  <img src={NoDisponible} alt={phone.name}/>
                )
                }
              </div>
              <h2>{phone.name}</h2>
              <p><strong>{phone.manufacturer}</strong></p>
              <span>{phone.price}€</span>
              <Link to={'/telefonos/telefono/' + phone._id}>Leer más</Link>

            </article>
          );
        }
      )
      return(
        <div id='telefonos'>
          {listPhones}
        </div>
      );
    }
  }
}
export default Phones;