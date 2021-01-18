import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Global from '../Global';
import Sidebar from './Sidebar';

// Validacion de formularios y alertas

class CreatePhone extends Component {
  
  url = Global.url;
  nameRef = React.createRef();
  manufacturerRef = React.createRef();
  descriptionRef = React.createRef();
  colorRef = React.createRef();
  priceRef = React.createRef();
  screenRef = React.createRef();
  processorRef = React.createRef();
  ramRef = React.createRef();
       
  state = {
    phone: {},
    status: null,
    selectedFile: null
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

      // Hacer una petición HTTP por POST para guardar el artículo
      axios.post(this.url + 'guardar', this.state.phone)
        .then((res) => {
          if(res.data.phoneStored){
            this.setState({
              phone: res.data.phoneStored,
              status: 'waiting'
            });

            swal(
              'Artículo creado',
              'El artículo ha sido creado correctamente',
              'success'
            )
            // Subir la Imagen
            if(this.state.selectedFile != null){
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
                    });
                  }else{
                    this.setState({
                      phone: res.data.phoneStored,
                      status: 'failed'
                    })
                  }
                });
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
  }

  fileChange = (e) => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  }
  
  render(){
    if(this.state.status === 'success'){
      return <Redirect to='/telefonos' />
    }
    
    return(
      <div className='center'>
        <section id='content'>
          <h1 className='subheader'>Crear nuevo modelo de teléfono</h1>

          <form className='mid-form' onSubmit={this.savePhone} onChange={this.changeState}>
            <div className='form-group'>
              <label htmlFor='name'>Nombre</label>
              <input type='text' name='name' ref={this.nameRef}/>

            </div>
            <div className='form-group'>
              <label htmlFor='manufacturer'>Manufacturado por</label>
              <input type='text' name='manufacturer' ref={this.manufacturerRef}></input>
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Descripcion</label>
              <textarea name='description' ref={this.descriptionRef}></textarea>
            </div>

            <div className='form-group'>
              <label htmlFor='color'>Color</label>
              <input type='text' name='color' ref={this.colorRef}></input>
            </div>

            <div className='form-group'>
              <label htmlFor='price'>Precio</label>
              <input type='number' name='price' ref={this.priceRef}></input>
            </div>

            <div className='form-group'>
              <label htmlFor='file0'>Imagen</label>
              <input type='file' name='file0' onChange={this.fileChange}/>
            </div>

            <div className='form-group'>
              <label htmlFor='screen'>Pantalla</label>
              <input type='text' name='screen' ref={this.screenRef}></input>
            </div>

            <div className='form-group'>
              <label htmlFor='processor'>Procesador</label>
              <input type='text' name='processor' ref={this.processorRef}></input>
            </div>

            <div className='form-group'>
              <label htmlFor='ram'>Ram</label>
              <input type='number' name='ram' ref={this.ramRef}></input>
            </div>
            <br/>

            <input type='submit' value='Guardar' className='btn btn-success'/>
          </form>

        </section>
        <Sidebar/>
      </div>
    )
  }
  
}
export default CreatePhone;