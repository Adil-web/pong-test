const VELOCITY = 0.025
const VELOCITY_INCREASE = 0.000001
const audio = document.getElementById('my_audio')

export default class Ball {
  constructor(ball) {
    this.ball = ball
    this.reset()
  }

  get x() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--x"))
  }

  set x(value) {
    this.ball.style.setProperty("--x", value)
  }

  get y() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--y"))
  }

  set y(value) {
    this.ball.style.setProperty("--y", value)
  }

  rect() {
    return this.ball.getBoundingClientRect()
  }

  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta
    this.y += this.direction.y * this.velocity * delta
    this.velocity += VELOCITY_INCREASE * delta
    const ballRect = this.rect()
    if(ballRect.bottom >= window.innerHeight || ballRect.top <= 0) {
      // playSound()
      this.direction.y *= -1
    }
    if(paddleRects.some(paddleRect => isCollision(paddleRect, ballRect))) {
      // playSound()
      this.direction.x *= -1
    }
  }

  reset() {
    this.x = 50
    this.y = 50
    this.direction = { x: 0, y: 0.5 }
    while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
      const heading = randomNumBetween(0, 2 * Math.PI)
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    this.velocity = VELOCITY
  }
}

function isCollision(paddleRect, ballRect) {
  return paddleRect.left <= ballRect.right && 
          paddleRect.right >= ballRect.left && 
          paddleRect.top <= ballRect.bottom && 
          paddleRect.bottom >= ballRect.top
}

function randomNumBetween(min, max) {
  return Math.random() * (max - min) + min
}

function playSound() {
  audio.pause();
  audio.currentTime = 0;
  setTimeout(() => {
    audio.play()
  }, 100);
}