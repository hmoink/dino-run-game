import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const CACTUS_INTRVAL_MIN = 500
const CACTUS_INTRVAL_MAX = 2000
const worldEl = document.querySelector("[data-world]")

let nextCactusTime
export function setupCactus() {
    nextCactusTime = CACTUS_INTRVAL_MIN
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
    })
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta *speedScale * SPEED * -1)
        if (getCustomProperty(cactus, "--left") <= -100) {  // 넘어간 선인장 제거
            cactus.remove()
        }
    })

    if (nextCactusTime <= 0) {
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTRVAL_MIN, CACTUS_INTRVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
}

export function getCactusRect() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "./img/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    worldEl.append(cactus)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}