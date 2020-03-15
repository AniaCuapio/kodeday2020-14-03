import React from 'react';
// import logo from './logo.svg';
import './App.css';

import api from "./lib/api.js";


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        modalActivo: false,
        personajes:[],
        idPersonajeSeleccionado: []
      }
    }
  componentDidMount(){
    api.getAllCharacters()
    .then(results => {
      this.setState({
        personajes: results
      }) 
    })
    .catch(e=>console.error(e))
  }

    activarModal(id) {
      api.getCharacterById(id)
      .then(personaje=> {
        this.setState({
          modalActivo: true,
          idPersonajeSeleccionado: personaje
        })
      })
    }

  desactivarModal() {
    this.setState({
    modalActivo: false
    })
  }
  


  renderCards(p) {
    console.log(p,'holaaaa')
    return (

      <div key={p.id} className='Card' onClick={e => this.activarModal(p.id)}>
        <div className='Card-imagen'>
          <figure>
            <img alt='test' src={p.image} />
          </figure>

        <div className="Card-description">
          <div className="Card-name">
            <h3> {p.name} </h3>
          </div>
        </div>

      </div>
</div>
    )

  }
  render() {
    const { modalActivo, personajes} =this.state
    const cards = personajes.map(p => this.renderCards(p))
    console.log(personajes, 'aqui')
    return (
      <div className="App">
        <div className="App-container">
          <h1>Rick and Morty</h1>
          <div className="Cards-container">
            {cards}
          </div>
          { modalActivo ? (
            <div className='modal' onClick={e => this.desactivarModal()}>
              <div className='Card-detalle'>
                <div className='Card-imagen'>
                  <figure>
                    <img alt='test' src={this.state.personajeSeleccionado.image} />
                  </figure>
                </div>
                <div className='Card-detalle-descripcion'>
                  <div className='descripcion'>
                  <h3></h3>
                    <div className='caracteristica'>
                      <p>Status</p>
                      <p className='caracteristica-valor'>
                    
                      </p>
                    </div>
                    <div className='caracteristica'>
                      <p>Especie</p>
                      <p className='caracteristica-valor'>
                        {this.state.personajeSeleccionado.name}
                      </p>
                    </div>
                    <div className='caracteristica'>
                      <p>Genero</p>
                      <p className='caracteristica-valor'>
                      {this.state.personajeSeleccionado.gender}
                      </p>
                    </div>
                    <div className='caracteristica'>
                      <p>Origen</p>
                      <p className='caracteristica-valor'>
                      {this.state.personajeSeleccionado.origin}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null }
        </div>
      </div>
    );
  }
}

export default App;
