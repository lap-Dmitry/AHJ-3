import Board from '../board';
import Goblin from '../goblin';

test('create game board', () => {
  const board = new Board();
  const field = board.getBoard(4);
  const received = field.querySelectorAll('.cell');
  expect(received.length).toBe(4 ** 2);
});

test('create game personage', () => {
  const goblin = new Goblin();
  const char = goblin.getChar();
  const received = char.classList.contains('goblin');
  expect(received).toBeTruthy();
});
