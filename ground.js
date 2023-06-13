import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"


const SPEED = 0.05
const groundEl = document.querySelectorAll('[data-ground]')

export function setupGround() {
    setCustomProperty(groundEl[0], "--left", 0) // 1번 땅 처음 위치
    setCustomProperty(groundEl[1], "--left", 300) // 2번 땅 처음 위치
}

export function updateGround(delta, speedScale) {
    groundEl.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

        if (getCustomProperty(ground, "--left") <= -300) { // -300까지 간 후 600으로 돌아와서 반복
            incrementCustomProperty(ground, "--left", 600) 
        }
    })
}