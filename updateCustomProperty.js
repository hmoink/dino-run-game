// 업데이트를 편하게 하기 위해

export function getCustomProperty(elem, prop) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0  //style과 value 값을 가져 오는데 없으면 그냥 0
}

export function setCustomProperty(elem, prop, value) {
    elem.style.setProperty(prop, value)

}

export function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
}