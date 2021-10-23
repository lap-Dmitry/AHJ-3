import Board from './board';
import Goblin from './goblin';
import GamePlay from './gamePlay';

const board = new Board();
const char = new Goblin();
const gamePlay = new GamePlay(board, char);

gamePlay.init();
