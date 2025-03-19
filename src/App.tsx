import { useState } from 'react'
import './App.css'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

function App() {
  
  const size: number = 6; 

  const gen1: string = '🔥';
  const tile11: string = '🚒';
  const tile12: string = '🧑‍🚒';
  const tile13: string = '💧';
  const gen2: string = '🤗';
  const tile21: string = '🤭';
  const tile22: string = '🫢';
  const tile23: string = '🫡';

  const [grid, setGrid] = useState<Array<Array<string>>>(genMatrix(size, size));
  const handleCellClick = (row: number, col: number) => {
    const pos: [number, number] = [row, col];
    if (grid[row][col] === gen1) {
      genIcon(tile11, pos, grid);
    }
    else if (grid[row][col] === gen2) {
      genIcon(tile11, pos, grid);
    }
    console.log(`${row}, ${col}`);
  };

  insertGenerators(grid, gen1, gen2);
 
  return (
    <div className="App">
       {renderGrid(grid, handleCellClick)}
    </div>
  )
}

function renderGrid(grid: Array<Array<string>>, onCellClick: (row: number, col: number) => void) {
  return (
    <table className="grid">
      <tbody>
        {grid.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} onClick={() => onCellClick(i, j)}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function genMatrix(row: number, col: number) {
  const matrix = []
  for (let i = 0; i < row; i++) {
    matrix.push(new Array(col).fill(''))
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

function insertGenerators (matrix: Array<Array<string>>, gen1: string, gen2: string) {
	const generator1: [number, number] = selectRandomTile(matrix);
  const generator2: [number, number] = selectRandomTile(matrix);

   genIcon(gen1, generator1, matrix);
   genIcon(gen2, generator2, matrix);
}

function checkSame (icon1: string, icon2: string): boolean {
	if (icon1 == icon2) {
		return true;
	}
	else {
		return false;
	}
}

function genIcon (icon: string, tile: [number, number], matrix: Array<Array<string>>){
  if (matrix[tile[0]][tile[1]] === '') {
    matrix[tile[0]][tile[1]] = icon;
  }
  else {
    genIcon(icon, selectRandomTile(matrix), matrix);
  }
}


export default App