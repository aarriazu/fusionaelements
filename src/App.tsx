import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

function App() {
  
  const grid: Array<Array<string>> = genMatrix(6, 6);
  const randomNumber: number[] = selectRandomTile(grid);
  const emoji: string = '\u2728';
  const emoji2: string = '\u265F';

  return (
    <div className="App">
      <p>
        {randomNumber[0]} - {randomNumber[1]}
      </p>
      <p>
      {emoji}
      {emoji2}
      </p>
        <table className="grid">
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </table>
    </div>
  )
}

function genMatrix(rows: number, cols: number) {
  const matrix = []
  for (let i = 0; i < rows; i++) {
    matrix.push(new Array(cols).fill(0))
  }
  return matrix
}

function selectRandomTile(matrix: Array<Array<string>>): [number, number] {
  const random: [number, number] = [
    Math.floor(Math.random() * matrix.length),
    Math.floor(Math.random() * matrix[0].length)
  ];
  return random;
}
  

export default App