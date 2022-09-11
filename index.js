// import PongGame from './game/Game'
// const playBtn = document.getElementById('play-btn')
// const ball = document.getElementById('ball')
// const player_paddle = document.getElementById('player-paddle')
// const enemy_paddle = document.getElementById('enemy-paddle')
// const player_score = document.getElementById('player-score')
// const enemy_score = document.getElementById('enemy-score')

// const game = new PongGame({
//   playBtn,
//   ball,
//   player_paddle,
//   enemy_paddle,
//   player_score,
//   enemy_score
// })

// game.start()
















import Ball from "./Ball";
import Paddle from "./Paddle";
const playBtn = document.getElementById('play-btn')
const ball = new Ball(document.getElementById('ball'))
const player_paddle = new Paddle(document.getElementById('player-paddle'))
const enemy_paddle = new Paddle(document.getElementById('enemy-paddle'))
const player_score = new Paddle(document.getElementById('player-score'))
const enemy_score = new Paddle(document.getElementById('enemy-score'))
const topBtn = document.getElementById('top-btn')
const bottomBtn = document.getElementById('bottom-btn')

let isStarted = false
playBtn.addEventListener('click', () => {
  isStarted = true
})

let lastTIme
function update(time) {
  if (lastTIme) {
    const delta = time - lastTIme
    if(isStarted) {
      ball.update(delta, [player_paddle.rect(), enemy_paddle.rect()])
    }
    enemy_paddle.update(delta, ball.y)
    if (isLoose()) computeScores()
  }
  lastTIme = time
  window.requestAnimationFrame(update)
}

update()

topBtn.addEventListener('click', (e) => {
  if(player_paddle.position >= 6) {
    player_paddle.position -= 5
  }
})
bottomBtn.addEventListener('click', (e) => {
  if(player_paddle.position <= 92) {
    player_paddle.position += 5
  }
})
// document.addEventListener('mousemove', (e) => {
//   player_paddle.position = (e.y / window.innerHeight) * 100
// })

function isLoose() {
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

function computeScores() {
  const rect = ball.rect()
  if(player_score.paddleEl.innerText > 3 || +enemy_score.paddleEl.innerText > 3) {
    isStarted = false
  }
  if (rect.right >= window.innerWidth) {
    player_score.paddleEl.textContent = +player_score.paddleEl.innerText + 1
  }
  if (rect.left <= 0) {
    enemy_score.paddleEl.textContent = +enemy_score.paddleEl.innerText + 1
  }
  ball.reset()
}
