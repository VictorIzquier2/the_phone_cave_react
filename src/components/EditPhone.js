import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';
import NoDisponible from '../assets/images/nodisponible.png'

// 1. Tenemos que recoger el ID del telefono a editar de la url
// 2. Tenemos que crear un método para sacar ése objeto del backend //API
// 3. Tenemos que repoblar/rellenar el formulario con esos datos
// 4. Tenemos que actualizar el objeto haciendo una petición al BackEnd

class EditPhone extends Component {
  url = Global.url;
  nameRef = React.createRef();
  manufacturerRef = React.createRef();
  descriptionRef = React.createRef();
  colorRef = React.createRef();
  priceRef = React.createRef();
  screenRef = React.createRef();
  processorRef = React.createRef();
  ramRef = React.createRef();
  phoneId = null;
  
  state = {
    phone: {},
    status: null,
    selectedFile: null
  }
    
  getPhone = (id) => {
    axios.get(this.url + 'telefono-from-db/' + id)
      .then((res) => {
        this.setState({
          phone: res.data.phoneFromDB
        })
      })
  }


  changeState = () => {
    this.setState({
      phone:{
        name: this.nameRef.current.value,
        manufacturer: this.manufacturerRef.current.value,
        description: this.descriptionRef.current.value,
        color: this.colorRef.current.value,
        price: this.priceRef.current.value,
        screen: this.screenRef.current.value,
        processor: this.processorRef.current.value,
        ram: this.ramRef.current.value
      }
    });
  }
  
  savePhone = (e) => {
    // Rellenar el state con el formulario
    this.changeState();
  
      // Hacer una petición HTTP por PUT para editar el artículo
      axios.put(this.url + 'telefono-from-db/' + this.props.match.params.id, this.state.phone)
        .then((res) => {
          console.log(res);
          if(res.data.phoneUpdated){
            this.setState({
              phone: res.data.phoneUpdated,
              status: 'waiting'
            });

            swal(
              'Telefono creado',
              'El telefono editado',
              'success'
            )
            // Subir la Imagen
            if(this.state.selectedFile !== null){
              // Sacar el ID del artículo guardado
              const phoneId = this.state.phone._id;

              // Crear form data y añadir fichero
              const formData = new FormData();
              formData.append(
                'file0',
                this.state.selectedFile,
                this.state.selectedFile.name
              );

              // Hacer la petición Ajax
              axios.post(this.url + 'upload-image/' + phoneId, formData)
                .then(res => {
                  if(res.data.phoneStored){
                    this.setState({
                      phone: res.data.phoneStored,
                      status: 'success'
                    })
                  }else{
                    this.setState({
                      phone: res.data.phoneStored,
                      status: 'failed'
                    })
                  }
                })
            }else{
              this.setState({
                status: 'success'
              });
            }
          }else{
            this.setState({
              status: 'failed'
            });
          }
        })
        .catch(err => {
          console.log(err);
        })
  }
  
  fileChange = (e) => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  }

  componentDidMount(){
  const phoneId = this.props.match.params.id;
  this.getPhone(phoneId);
  }
  
  render(){
    if(this.state.status === 'success'){
      return <Redirect to='/telefonos'/>
    }
    return(
      <div className='center'>
        <section id='content'>
          <h1 className='subheader'>Editar artículo</h1>

          {this.state.phone.name &&
            <form className='mid-form' onSubmit={this.savePhone} onChange={this.changeState}>
              <div className='form-group'>
                <label htmlFor='name'>Nombre</label>
                <input type='text' defaultValue={this.state.phone.name} name='name' ref={this.nameRef}/>                
              </div>

            <div className='form-group'>
              <label htmlFor='manufacturer'>Manufacturado por</label>
              <input type='text' defaultValue={this.state.phone.manufacturer} name='manufacturer' ref={this.manufacturerRef}></input>
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Descripcion</label>
              <textarea defaultValue={this.state.phone.description}  name='description' ref={this.descriptionRef}></textarea>
            </div>

            <div className='form-group'>
              <label htmlFor='color'>Color</label>
              <input type='text' defaultValue={this.state.phone.color}  name='color' ref={this.colorRef}></input>
            </div>

            <div className='form-group'>
              <label htmlFor='price'>Precio</label>
              <input type='number' defaultValue={this.state.phone.price}  name='price' ref={this.priceRef}></input>
            </div>

            <div className='form-group'>
              <label htmlFor='file0'>Imagen</label>
              {this.state.phone.imageFileName !== null ? (
                <img src={this.url + 'get-image/' + this.state.phone.imageFileName} alt={this.state.phone.name} />
              ) : (
                <img src={NoDisponible} alt={this.state.phone.name} />
              )
              }
              <input type='file' name='file0' onChange={this.fileChange}/>
            </div>

            <div className='form-group'>
              <label htmlFor='screen'>Pantalla</label>
              <input type='text' defaultValue={this.state.phone.screen}  name='screen' ref={this.screenRef}></input>
            </div>

            <div className='form-group'>
              <label htmlFor='processor'>Procesador</label>
              <input type='text' defaultValue={this.state.phone.processor}  name='processor' ref={this.processorRef}></input>
            </div>

            <div className='form-group'>
              <label htmlFor='ram'>Ram</label>
              <input type='number' defaultValue={this.state.phone.ram}  name='ram' ref={this.ramRef}></input>
            </div>
            <br/>

            <input type='submit' value='Guardar' className='btn btn-success'/>
            </form>
          }

          {!this.state.phone.name &&
            <h2>Cargando...</h2>
          }

        </section>
        <Sidebar/>
      </div>
    )
  }
  
}
export default EditPhone;