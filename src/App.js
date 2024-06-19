import Accordian from './components/accordian/Accordian';
import './App.css';
import RandomColor from './components/random-color/RandomColor';
import Ratings from './components/ratings/Ratings';
import TicTacToe from "./components/tic-tac-toe/TicTacToe";
import { useState } from 'react';
import React from 'react';

function App() {

  const [renderingApp, setrenderingapp] = useState(null);

  const components = {
    'Accordian': Accordian,
    'RandomColor': RandomColor,
    'Ratings': Ratings,
    'TicTactoe': TicTacToe,
    // Add more components here as needed
  };
  const componentProps = {
    'Accordian': {},
    'RandomColor': {},
    'Ratings': { noOfStars: 10 },
    'TicTacToe':{},
    // Add more components here as needed
  };

  function renderapp(whichapp) {
    setrenderingapp(whichapp);
    document.getElementById('list').style.display = 'none';
    let btn = document.querySelector('.menu-button');
    btn.innerText = '+';
    btn.style.width = "30px";
  }
  function showmenu() {
    let btn = document.querySelector('.menu-button');
    if (btn.innerText === '+') {
      btn.innerText = 'Main Menu';
      btn.style.width = '110px';
    }
    let element = document.getElementById('list');
    let displayValue = element.style.display;
    if (displayValue === 'none') {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
    setrenderingapp(null);


  }


  return (
    <div className="App">
      <div className='Menu'>
        <button onClick={showmenu} className='menu-button'>Main Menu</button>
        <ul id='list'>
          <li onClick={() => renderapp('Accordian')}>
            Accordian
          </li>
          <li onClick={() => renderapp('RandomColor')}>
            Random-color-generator
          </li>
          <li onClick={() => renderapp('Ratings')}>
            Ratings
          </li>
          <li onClick={()=> renderapp('TicTactoe')}>
            Tic-Tac-Toe
          </li>
        </ul>
      </div>

      {

        renderingApp && components[renderingApp] ? React.createElement(components[renderingApp], componentProps[renderingApp]) : null //[] are used for dynamic access of objects not dot notation
      }
    </div>
  );
}

export default App;
