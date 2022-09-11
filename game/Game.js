import Ball from "./Ball";
import Paddle from "./Paddle";
// const playBtn = document.getElementById('play-btn')
// const ball = new Ball(document.getElementById('ball'))
// const player_paddle = new Paddle(document.getElementById('player-paddle'))
// const enemy_paddle = new Paddle(document.getElementById('enemy-paddle'))
// const player_score = document.getElementById('player-score')
// const enemy_score = document.getElementById('enemy-score')

// let isStarted = false
// playBtn.addEventListener('click', () => {
//   isStarted = true
// })

// let lastTIme
// function update(time) {
//   if (lastTIme) {
//     const delta = time - lastTIme
//     if (isStarted) {
//       ball.update(delta, [player_paddle.rect(), enemy_paddle.rect()])
//     }
//     enemy_paddle.update(delta, ball.y)
//     if (isLoose()) computeScores()
//   }
//   lastTIme = time
//   window.requestAnimationFrame(update)
// }

// update()

// document.addEventListener('mousemove', (e) => {
//   player_paddle.position = (e.y / window.innerHeight) * 100
// })

// function isLoose() {
//   const rect = ball.rect()
//   return rect.right >= window.innerWidth || rect.left <= 0
// }

// function computeScores() {
//   const rect = ball.rect()
//   if (player_score.paddleEl.innerText > 3 || +enemy_score.paddleEl.innerText > 3) {
//     isStarted = false
//   }
//   if (rect.right >= window.innerWidth) {
//     player_score.paddleEl.textContent = +player_score.paddleEl.innerText + 1
//   }
//   if (rect.left <= 0) {
//     enemy_score.paddleEl.textContent = +enemy_score.paddleEl.innerText + 1
//   }
//   ball.reset()
// }

export default class PongGame {
  constructor(config) {
    this.playBtn = config.playBtn
    this.ball = new Ball(config.ball)
    this.player_paddle = new Paddle(config.player_paddle)
    this.enemy_paddle = new Paddle(config.enemy_paddle)
    this.player_score = config.player_score
    this.enemy_score = config.enemy_score
    this.isStarted = false
    this.lastTIme = null
  }

  start(time = 4) {
    document.addEventListener('mousemove', (e) => {
      this.player_paddle.position = (e.y / window.innerHeight) * 100
    })
    this.playBtn.addEventListener('click', () => {
      this.isStarted = true
    })

    if (this.lastTIme) {
      const delta = time - this.lastTIme
      if (this.isStarted) {
        this.ball.update(delta, [this.player_paddle.rect(), this.enemy_paddle.rect()])
      }
      this.enemy_paddle.update(delta, this.ball.y)
      if (this.isLoose()) this.computeScores()
    }
    this.lastTIme = time
    window.requestAnimationFrame(this.start.bind(this))
  }

  computeScores() {
    const rect = this.ball.rect()
    if (this.player_score.innerText > 3 || +this.enemy_score.innerText > 3) {
      this.isStarted = false
    }
    if (rect.right >= window.innerWidth) {
      this.player_score.textContent = +this.player_score.innerText + 1
    }
    if (rect.left <= 0) {
      this.enemy_score.textContent = +this.enemy_score.innerText + 1
    }
    this.ball.reset()
  }

  isLoose() {
    const rect = this.ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
  }
}