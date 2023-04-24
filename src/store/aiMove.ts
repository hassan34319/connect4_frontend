import { store } from './store';
import { makeMove } from './gameSlice';


export const aiMove = () => {
  return async (
    dispatch: typeof store.dispatch,
    getState: typeof store.getState
  ) => {
    // getting current game settings
    const { game } = getState();
    // run simulation and getting the best possible move
    let aiMove = await fetch('http://127.0.0.1:5000/move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({move : game.prevMove})
    })
    .then(response => response.json())
    .then(data => {
      const gameState = data.gameState;
      const computerMove = data.computerMove;
      console.log(computerMove,gameState)
      // Update the game board on the frontend with the new game state
      // Display the computer's move
      if (typeof computerMove !== 'undefined' && computerMove[0] !== null) {
        // call for making ai move
        dispatch(makeMove(computerMove));
      }
    });
    };
    

};
