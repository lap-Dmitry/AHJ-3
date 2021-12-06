export default class GamePlay {
  constructor(board, char) {
    this.board = board;
    this.boardSize = 4;
    this.char = char;
    this.activeChar = null;
    this.boardListeners = [];
    this.dead = null;
    this.miss = null;
    this.count = null;
  }

  init() {
    this.redrawBoard();
    this.board.addEventListener('click', this.onBoardClick.bind(this));
    this.start();
  }

  redrawBoard() {
    this.board = this.board.getBoard(this.boardSize);
    const body = document.querySelector('body');
    const container = document.createElement('div');

    container.classList.add('container');
    container.innerHTML = '<h1 class=\'title\'>Goblin Game</h1>';
    this.counter = this.createGoblinCounter();
    container.appendChild(this.counter);
    container.appendChild(this.board);
    body.insertBefore(container, body.firstChild);
    this.cells = [...this.board.children];
  }

  createGoblinCounter() {
    this.goblinCounter = document.createElement('div');
    this.goblinCounter.classList.add('status');
    this.goblinCounter.innerHTML = 'Убито гоблинов: <span class="dead">0</span><br>Промахов: <span class="miss">0</span><br>';
    return this.goblinCounter;
  }

  onBoardClick(event) {
    event.preventDefault();
    this.dead = document.querySelector('.dead');
    this.miss = document.querySelector('.miss');
    this.boardListeners.forEach((callback) => callback(event.target));

    if (event.target.classList.contains('goblin')) {
      ++this.dead.textContent;
      event.target.classList.remove('goblin');
    } else {
      ++this.miss.textContent;
    }

    if (this.dead.textContent >= 10) {
      this.resetScore();
      alert('Вы победили');
    }

    if (this.miss.textContent >= 5) {
      this.resetScore();
      alert('Вы проиграли');
    }
    this.count = 0;
    this.changeCursor();
  }

  generateposition() {
    const position = Math.floor(Math.random() * this.boardSize ** 2);
    if (this.position === position) {
      this.generateposition();
      return;
    }
    this.deletedChar();
    this.position = position;
    this.adventChar();
  }

  gameOver() {
    this.miss = document.querySelector('.miss');
    setTimeout(() => {
      if (!this.position) {
        this.miss.textContent++;
      }
    }, 1000);
  }

  deletedChar() {
    if (this.activeChar === null) {
      return;
    }
    this.cells[this.position].firstChild.remove();
  }

  adventChar() {
    this.activeChar = this.char.getChar();
    this.cells[this.position].appendChild(this.activeChar);
  }

  resetScore() {
    this.miss.textContent = 0;
    this.dead.textContent = 0;
  }

  changeCursor() {
    this.board.classList.toggle('hammer');
    this.board.classList.toggle('hammer-two');
  }

  start() {
    setInterval(() => {
      this.generateposition();
      this.miss.textContent = +this.miss.textContent + this.count;

      if (this.count !== 1) {
        setTimeout(this.count = 1, 1000);
      }
      if (this.miss.textContent >= 5) {
        alert('Попробуйте ещё раз!');
        this.resetScore();
      }
    }, 1000);
    this.gameOver();
  }
}
