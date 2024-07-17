import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grafica from './Grafica';
import FormularioFormik from './Formulario';

const App = () => {
  const [valuesFormik, setValuesFormik] = useState({
    referencia: 0,
    red1: 0,
    red2: 0,
    red3: 0,
    perturbacion: 0,
  });

  // Callback function to receive data from child
  const handleValuesFormik = (values) => {
    setValuesFormik(values);
  };
  

return (
  <div className="App">
    <FormularioFormik onSetValuesFormik = {handleValuesFormik}/>
    <Grafica valuesInput={valuesFormik}/>
  </div>

);
};

export default App;