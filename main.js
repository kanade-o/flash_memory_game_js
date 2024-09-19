const BLOCKS = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
let answer = [];
let user_answer = [];
let current_level = 0;

function game_over() {
  alert('GAME OVER! Try Again!');
  reset_game();
}

function reset_game() {
  user_answer = [];
  answer = [];
  current_level = 0;
  let dom = document.getElementById('show-level');
  dom.innerHTML = "Current level: " + current_level;
}

function make_answer(level) {
  /*
  解答を作る関数.
  arg: level(数値) = 個数
  levelによって解答の個数を増やす.

  return: 解答の配列
  */
  let answers = [];
  for (let block_count = 1; block_count <= level; block_count++) {
    let answer_index = Math.floor(Math.random() * BLOCKS.length);
    answers.push(BLOCKS[answer_index]);
  }
  return answers;
}

function highlight_block(block) {
  let block_dom = document.getElementById(block);
  block_dom.style.opacity = 1;
  setTimeout(() => {
    block_dom.style.opacity = 0.5;
  }, 500);
}

function bright_blocks(ans_array) {
  ans_array.forEach((block, index) => {
    setTimeout(() => {
      highlight_block(block);
    }, 1000 * index);
  });
}

function check_answer() {
  for (let i = 0; i < user_answer.length; i++) {
    if (user_answer[i] !== answer[i]) {
      game_over();
      return;
    }
  }
  if (user_answer.length === answer.length) {
    next_level();
  }
}

function next_level() {
  current_level++;
  let dom = document.getElementById('show-level');
  dom.innerHTML = "Current level: " + current_level;
  user_answer = [];
  answer = make_answer(current_level);
  bright_blocks(answer);
}

function start() {
  reset_game();
  next_level();
}

BLOCKS.forEach(block => {
  let dom = document.getElementById(block);
  dom.addEventListener('click', () => {
    user_answer.push(block);
    check_answer();
  });
});

document.getElementById('start').addEventListener('click', start);