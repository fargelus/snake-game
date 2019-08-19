import React from 'react';


const Board = (props) => {
  (async () => {
    const response = await fetch('/scoreboard');
    const data = await response.json();
    console.log(data);
  })();

  return (<div>
            <ol>
              <li>TEST</li>
            </ol>
          </div>);
}


export default Board;
