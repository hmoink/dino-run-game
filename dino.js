import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"
import { playJumpSound } from "./sound.js"

const dinoEl = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2 // 달리는 모션을 위해
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime 
let yVelocity

export function setupDino() { // 공룡 처음 셋업
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoEl, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getDinoRect() {
    return dinoEl.getBoundingClientRect()
    
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoEl.src = `./img/dino-stationary.png`
        return
    }

    if (currentFrameTime >= FRAME_TIME){
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        
        dinoEl.src = `./img/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

export function setDinoLose() {
    dinoEl.src = "./img/dino-lose.png"
}

function handleJump(delta) {
    if (!isJumping) return // 안뛰고 있으면 반환
    
    incrementCustomProperty(dinoEl, "--bottom", yVelocity * delta)

    if (getCustomProperty(dinoEl, "--bottom") <= 0){ // 점프 후 내려올때 땅으로 꺼지면 안됨 
        setCustomProperty(dinoEl, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta 
}

function onJump(e) {
    if(e.code !== "Space" || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
    playJumpSound()
}