import { useState} from 'react';
import './App.css';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function App() {
  const size: number = 6;
  const [freeCells, setFreeCells] = useState<number>((size*size) - 2);

  const gen1: string = '🔥';
  const tile11: string = '🚒';
  const tile12: string = '🧑‍🚒';
  const tile13: string = '💧';
  const gen2: string = '🤗';
  const tile21: string = '🤭';
  const tile22: string = '🫢';
  const tile23: string = '🫡';

  const [grid, setGrid] = useState<Array<Array<string>>>(() => {
    const initialGrid = genMatrix(size, size);
    const generator1: [number, number] = selectRandomTile(initialGrid);
    const generator2: [number, number] = selectRandomTile(initialGrid);
  
    initialGrid[generator1[0]][generator1[1]] = gen1;
    initialGrid[generator2[0]][generator2[1]] = gen2;
  
    return initialGrid;
  });

  const handleCellUpdate = (row: number, col: number, newValue: string) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? newValue : cell))
      );
      return newGrid;
    });
  };

  const handleCellClick = (row: number, col: number) => {
    const pos: [number, number] = [row, col];
    if (grid[row][col] === gen1) {
      genIcon(tile11, pos, grid);
      if (freeCells > 0){
        setFreeCells((prevCells) => {
          return (prevCells - 1);
        }
      )
      }
    } else if (grid[row][col] === gen2) {
      genIcon(tile21, pos, grid);
      if (freeCells > 0){
        setFreeCells((prevCells) => {
          return (prevCells - 1);
        }
      )
      }
    }
    console.log(`${row}, ${col}`);
  };

  const handleCellDrag = (sourceRow: number, sourceCol: number, targetRow: number, targetCol: number) => {

    if (checkSame(grid[targetRow][targetCol], grid[sourceRow][sourceCol]) && targetRow !== sourceRow && targetCol !== sourceCol){
      if (grid[sourceRow][sourceCol] == tile11){
        handleCellUpdate(targetRow, targetCol, tile12);
        handleCellUpdate(sourceRow, sourceCol, '');
        setFreeCells((prevCells) => {
          return (prevCells + 1);
        }
      )
      }
      else if (grid[sourceRow][sourceCol] == tile12){
        handleCellUpdate(targetRow, targetCol, tile13);
        handleCellUpdate(sourceRow, sourceCol, '');
        setFreeCells((prevCells) => {
          return (prevCells + 1);
        }
      )
      }
      else if (grid[sourceRow][sourceCol] == tile21){
        handleCellUpdate(targetRow, targetCol, tile22);
        handleCellUpdate(sourceRow, sourceCol, '');
        setFreeCells((prevCells) => {
          return (prevCells + 1);
        }
      )
      }
      else if (grid[sourceRow][sourceCol] == tile22){
        handleCellUpdate(targetRow, targetCol, tile23);
        handleCellUpdate(sourceRow, sourceCol, '');
        setFreeCells((prevCells) => {
          return (prevCells + 1);
        }
      )
      }
    }
  };

  function genIcon(icon: string, tile: [number, number], matrix: Array<Array<string>>) {
    if (freeCells <= 0){
      console.log("No hay casillas vacias");
      return;
    }

    if (matrix[tile[0]][tile[1]] === '') {
      handleCellUpdate(tile[0], tile[1], icon);
    } 
    else {
      genIcon(icon, selectRandomTile(matrix), matrix);
    }
    console.log("Casillas vacias: " + (freeCells - 1));
  }

  function renderGrid(grid: Array<Array<string>>, onCellClick: (row: number, col: number) => void) {
    const handleDragStart = (e: React.DragEvent<HTMLTableCellElement>, row: number, col: number) => {
      e.dataTransfer.setData('text/plain', JSON.stringify({ row, col }));
    };
  
    const handleDrop = (e: React.DragEvent<HTMLTableCellElement>, targetRow: number, targetCol: number) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('text/plain');
      const { row: sourceRow, col: sourceCol } = JSON.parse(data);

      handleCellDrag(sourceRow, sourceCol, targetRow, targetCol);
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
      e.preventDefault();
    };
  
    return (
      <table className="grid">
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  draggable={!!cell}
                  onDragStart={(e) => handleDragStart(e, i, j)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, i, j)}
                  onClick={() => onCellClick(i, j)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="App">
      {renderGrid(grid, handleCellClick)}
    </div>
  );
}

function genMatrix(row: number, col: number) {
  const matrix = [];
  for (let i = 0; i < row; i++) {
    matrix.push(new Array(col).fill(''));
  }
  return matrix;
}

function selectRandomTile(matrix: Array<Array<string>>): [number, number] {
  const random: [number, number] = [
    Math.floor(Math.random() * matrix.length),
    Math.floor(Math.random() * matrix[0].length),
  ];
  return random;
}

function checkSame(icon1: string, icon2: string): boolean {
  return icon1 === icon2;
}

export default App;