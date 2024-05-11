import React from 'react';
import logo from './logo-th-ab.png';
import './App.css';
import { allComponents, provideFluentDesignSystem } from '@fluentui/web-components';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { LinearRegression } from './LinearRegression'
import { MovingAverageTimeSeries } from './MovingAverageTimeSeries'
import { LinearRegressionTimeSeries } from './LinearRegressionPropertyTimeSeries'

initializeIcons();
provideFluentDesignSystem().register(allComponents);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="title">KI in der Immobilienwirtschaft</div>
      </header>
      <div className="model">
        <LinearRegression></LinearRegression>
      </div>
      <div className="model">
        <LinearRegressionTimeSeries></LinearRegressionTimeSeries>
      </div>
      <div className="model">
        <MovingAverageTimeSeries></MovingAverageTimeSeries>
      </div>
    </div>
  );
}

export default App;
