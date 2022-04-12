document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startEasyBnt = document.querySelector('#start-easy-button')
    const startMediumBnt = document.querySelector('#start-medium-button')
    const startHardBnt = document.querySelector('#start-hard-button')


    const width = 10
    let nextRandom = 0
    let timerid = 0
    let score = 0

    const pics = [
        'url(images/orange.jpg)',
        'url(images/pink.jpg)',
        'url(images/purple.jpg)',
        'url(images/lightblue.jpg)',
        'url(images/darkgreen.jpg)',
        'url(images/green.jpg)',
        'url(images/yellow.jpg)'
    ]

    const lBlock = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zBlock = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tBlock = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oBlock = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iBlock = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const theBlocks = [lBlock, zBlock, tBlock, oBlock, iBlock]

    let currentPosition = 4
    let currentRotation = 0

    let random = Math.floor(Math.random() * theBlocks.length)
    let current = theBlocks[random][currentRotation]

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('block')
            squares[currentPosition + index].style.backgroundImage = pics[random]

        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('block')
            squares[currentPosition + index].style.backgroundImage = 'none'

        })
    }


    function control(e) {
        if (e.keyCode === 65) {
            moveLeft()
        } else if (e.keyCode === 87) {
            rotate()
        } else if (e.keyCode === 68) {
            moveRight()
        } else if (e.keyCode === 83) {
            moveDown()
        }
    }


    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theBlocks.length)
            current = theBlocks[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addscore()
            gameOver()
        }
    }

    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if (!isAtLeftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }

        draw()
    }

    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

        if (!isAtRightEdge) currentPosition += 1

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }

        draw()
    }


    function rotate() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if (!isAtRightEdge && !isAtLeftEdge) {
            currentRotation++
            if (currentRotation === current.length) {
                currentRotation = 0
            }

        }

        if (isAtRightEdge || isAtRightEdge -1){
            if (current.length === 4){
                if (isAtRightEdge -1){
                    if (currentRotation % 2 === 0){
                        currentPosition = currentPosition -1
                        currentRotation++
                    }
                    else {
                        currentPosition = currentPosition +1
                        currentRotation--
                    }

                    if (currentRotation === current.length) {
                        currentRotation = 0
                    }
                }
                if (currentRotation % 2 === 0){
                    currentPosition = currentPosition -2
                    currentRotation++
                }
                else {
                    currentPosition = currentPosition +2
                    currentRotation--
                }

                if (currentRotation === current.length) {
                    currentRotation = 0
                }
            }
            else {
                currentPosition = currentPosition -1
                currentRotation++
                if (currentRotation === current.length) {
                    currentRotation = 0
                }
            }
        }

        if (isAtLeftEdge){
            if (current.length === 4){
                if (currentRotation % 2 === 0){
                    currentRotation++

                }
                else {
                    currentPosition = currentPosition +1
                    currentRotation--
                }

                if (currentRotation === current.length) {
                    currentRotation = 0
                }
            }
            else {
                currentPosition = currentPosition +1
                currentRotation++
                if (currentRotation === current.length) {
                    currentRotation = 0
                }
            }
        }

        current = theBlocks[random][currentRotation]
        draw()
    }


    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0


    const upNextBlocks = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        [0, 1, displayWidth, displayWidth + 1],
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]
    ]

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('block')
            square.style.backgroundImage = 'none'
        })
        upNextBlocks[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('block')
            displaySquares[displayIndex + index].style.backgroundImage = pics[nextRandom]

        })
    }

    startEasyBnt.addEventListener('click', () => {
        if (timerid) {

            clearInterval(timerid)
            timerid = null
        } else {
            document.addEventListener('keydown', control)
            draw()
            timerid = setInterval(moveDown, 700)
            nextRandom = Math.floor(Math.random() * theBlocks.length)
            displayShape()

        }

    })

    startMediumBnt.addEventListener('click', () => {
        if (timerid) {

            clearInterval(timerid)
            timerid = null
        } else {
            document.addEventListener('keydown', control)
            draw()
            timerid = setInterval(moveDown, 500)
            nextRandom = Math.floor(Math.random() * theBlocks.length)
            displayShape()

        }

    })


    startHardBnt.addEventListener('click', () => {
        if (timerid) {

            clearInterval(timerid)
            timerid = null
        } else {
            document.addEventListener('keydown', control)
            draw()
            timerid = setInterval(moveDown, 250)
            nextRandom = Math.floor(Math.random() * theBlocks.length)
            displayShape()

        }

    })

    function addscore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('block')
                    squares[index].style.backgroundImage = 'NONE'
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end'
            undraw()
            clearInterval(timerid)
        }
    }


})

