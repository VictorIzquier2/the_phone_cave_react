import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Telefonos from './components/Telefonos';
import Phone from './components/Phone';
import CreatePhone from './components/CreatePhone';
import EditPhone from './components/EditPhone';
import Search from './components/Search';
import Error from './components/Error';

class Router extends Component {
  render(){
    return(
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/telefonos' component={Telefonos} />
            <Route exact path='/telefonos/telefono/:id' component={Phone} />
            <Route exact path='/telefonos/crear' component={CreatePhone} />
            <Route exact path='/telefonos/editar/:id' component={EditPhone} />
            <Route exact path='/telefonos/busqueda/:search' component={Search} />
            <Route exact path='/redirect/:search' 
              render={
                (props) => {
                  const search = props.match.params.search;
                  return(
                    <Redirect to={'/telefonos/busqueda/' + search } />
                  )
                }
              }
            />
            <Route component={Error} />
          </Switch>
        <Footer/>
      </BrowserRouter>
    )
  }
}
export default Router;