let dieSound
let jumpSound
let bgm = new Audio('./sound/bgm.mp3')

export function playBgm() {
    bgm.currentTime = 0.9
    bgm.volume = 0.2
    playSound(bgm)
}

export function playDieSound() {
    dieSound = new Audio('./sound/die.wav')
    dieSound.volume = 0.07
    playSound(dieSound)
}

export function playJumpSound() {
        jumpSound  = new Audio(`./sound/nyu${Math.floor(Math.random() * 10) % 3 + 1}.mp3`)
        jumpSound.volume = 0.07
        playSound(jumpSound)
}

function playSound(sound) {
    sound.play()
}

export function stopBgm() {
    bgm.pause()
    bgm.currentTime = 0.9
}