import { updateGround, setupGround } from "./ground.js"
import { updateCactus, setupCactus, getCactusRect } from "./cactus.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { playBgm, playDieSound, stopBgm } from "./sound.js"


const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.000003

const worldEl = document.querySelector('[data-world]')
const scoreEl = document.querySelector('[data-score]')
const startScreenEl = document.querySelector('[data-start-screen]')
const lifeEl = document.querySelector('[data-life]')

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, {once: true})


let lastTime
let speedScale
let score
let life

// 프레임별 반복
function update(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime

    updateGround(delta, speedScale)
    updateDino(delta, speedScale)
    updateCactus(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    if (checkLose()) return handleLose()


    lastTime = time
    window.requestAnimationFrame(update)
}

function checkLose() {
    const dinoRect = getDinoRect()
    return getCactusRect().some(rect => isCollision(rect, dinoRect))
    
}

function isCollision(rect1, rect2) {
    if (life == 0 ) {
        return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
        )
    }

    if (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top) {
        if (life <= 0) {
            life = 0
        }
        life -= 1
        lifeEl.textContent = life
    }
}


function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}
window.requestAnimationFrame(update)

function updateScore(delta) {
    score += delta * 0.01
    scoreEl.textContent = Math.floor(score)
}

function handleStart() {
    lastTime = null
    speedScale = 1
    score = 0
    life = 100
    lifeEl.textContent = life
    setupGround()
    setupDino()
    setupCactus()
    playBgm()
    startScreenEl.classList.add("hide")
    window.requestAnimationFrame(update)
}

function handleLose() {
    setDinoLose()
    playDieSound()
    stopBgm()
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true})
        startScreenEl.classList.remove("hide")
    }, 100)
}

// 화면크기 맞추게 하기
function setPixelToWorldScale() {
    let worldToPixelScale
    if(window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT){ // 윈도우가 설정한 월드 크기와 다르면 조정
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } 
    else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldEl.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldEl.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

