import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import NoDisponible from '../assets/images/nodisponible.png';
import swal from 'sweetalert';

class Phone extends Component {

  url = Global.url;

  state = {
    phone: {},
    status: null
  };

  getPhone = () => {
    const id = this.props.match.params.id;
    axios.get(this.url + 'telefono-from-db/' + id)
      .then(res => {
        this.setState({
          phone: res.data.phoneFromDB,
          status: 'success'
        });
      })
      .catch(err => {
        this.setState({
          phone: false,
          status: 'success'
        })
      })
  }

  deletePhone = (id) => {
    swal({
      title: '¿Estás seguro/a?',
      text: 'Una vez borrado, no podrás recuperarlo',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if(willDelete){
          swal('El modelo de teléfono se ha borrado correctamente', {
            icon: 'success'
          });
          axios.delete(this.url + 'telefono-from-db/' + id)
            .then((res) => {
              this.setState({
                phone: res.data.phoneFromDB,
                status: 'deleted'
              });
            })
        }else{
          swal('No se ha borrado el teléfono', {
            icon: 'success'
          })
        }
      })
  }
  
  componentDidMount(){
    this.getPhone();
  }
 
  render(){
    if(this.state.status === 'deleted'){
      return <Redirect to ='/telefonos'/>
    }
    return(
      <div className='center'>
        <section id='content'>
          
          {this.state.phone.name &&
          <article className='article-item article-detail'>
            <div className='image-wrap'>
               {this.state.phone.imageFileName != null ? (
                  <img src={this.url + 'get-image/' + this.state.phone.imageFileName} alt={this.state.phone.name}/>
                ) : (
                  <img src={NoDisponible} alt={this.state.phone.name}/>
                )
                }
            </div>

            <h1 className='subheader'>{this.state.phone.name}</h1><p> for only <span>{this.state.phone.price}€</span></p>
            <p>{this.state.phone.description}</p>
            
            <ul>
              <li><span>{this.state.phone.processor}</span> processor</li>
              <li><span>{this.state.phone.screen} screen </span></li>
              <li>available in <span>{this.state.phone.color}</span></li>
            </ul>
            <p>Manufactured by <strong>{this.state.phone.manufacturer}</strong></p>
            <br/>

            <Link to={'/telefonos/editar/' + this.state.phone._id} className='btn btn-warning'>Editar</Link>
            <button onClick={
              () =>{
                this.deletePhone(this.state.phone._id)
              }
            } className='btn btn-danger'>Eliminar</button>
            
            <div className='clearfix'></div>
          </article>
          }

          {!this.state.phone.name && this.state.status === 'success' &&
            <div>
              <h2 className='subheader'>El artículo buscado no existe</h2>
              <p>Intenta una nueva búsqueda</p>
            </div>
          }

          {this.state.status == null &&
            <div id='phone'>
              <h2 className='subheader'>Cargando...</h2>
              <p>Espere unos segundos</p>
            </div>

          }

        </section>

        <Sidebar  />
      </div>
    )
  }
}
export default Phone;