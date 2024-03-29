const startBtn = document.querySelector("#start")
const screens = document.querySelectorAll(".screen")
const timeList = document.querySelector("#time-list")
const timeEl = document.querySelector("#time")
const board = document.querySelector("#board")
const header = document.querySelector(".screen h3")
const colors = ["red", "blue", "green", "yellow", "beige","orange", "purple"]
let time = 0
let score = 0

startBtn.addEventListener("click", (event) => {
    event.preventDefault()
    screens[0].classList.add("up")
})

timeList.addEventListener("click", event => {
    if(event.target.classList.contains("time-btn")) {
        time = parseInt(event.target.getAttribute("data-time"))
        screens[1].classList.add("up")
        startGame()
    }
})

board.addEventListener("click", event => {
    if(event.target.classList.contains("circle")) {}
    score++
    event.target.remove()
    createRandomCircle()
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if(time === 0) {
        finishGame()
    } else {
        let current = --time
        setTime(current)
        if(current < 10) {
            current = `0${current}`
            setTime(current)
    }
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    header.classList.add("hide")
    board.innerHTML = `<h1> Ваш счет: <span class="primary"> ${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement("div")
    const size = getRandomNumber(10, 50)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0,height - size)
    const color = getRandomColor()

    circle.classList.add("circle")
    circle.style.background = color
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.addEventListener("mouseover", () => {setColor(circle)})

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 3px ${color}, 0 0 15px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}