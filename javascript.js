//take in an how big of board user wants. make a 
//boad that big with squares, and event listerns attached that reference an id that
//uses a multi dimensional array

let player = "X";
let turns = 0;
let playerMovesArray = [];

document.querySelector("#createBoard").addEventListener("click", function () {

    let selectedBoardSize = document.querySelector("input").value;
    createBoard(selectedBoardSize);
})

const createBoard = (selectedBoardSize) => {
    let boardHtml = "";
    createPlayerMovesArray(selectedBoardSize);

    for (let j = 0; j < selectedBoardSize; j++) {
        boardHtml += `<section class="boardRow">`;
        for (let i = 0; i < selectedBoardSize; i++) {
            boardHtml += `<section id="${j}--${i}" class="boardBox"></section>`
        }
        boardHtml += `</section>`;
    }

    // Reference to container
    const containerEl = document.querySelector(".pickSizeSection")

    // Update HTML of container
    containerEl.innerHTML = boardHtml
    createdBoardEventListeners(selectedBoardSize);
}

const createPlayerMovesArray = (selectedBoardSize) => {
    for (let j = 0; j < selectedBoardSize; j++) {
        let innerArray = [];
        for (let i = 0; i < selectedBoardSize; i++) {
            innerArray.push("");
        }
        playerMovesArray.push(innerArray);
    }
}

const createdBoardEventListeners = (selectedBoardSize) => {

    const allBoxes = document.querySelectorAll(".boardBox")

    // Add a click event listener to each button
    for (box of allBoxes) {
        box.addEventListener(
            "click",
            (event) => {

                if (document.getElementById(`${event.target.id}`).innerHTML === "") {
                    document.getElementById(`${event.target.id}`).innerHTML = `<p class="boxText">${player}</p>`;
                    let splitId = event.target.id.split("--");

                    if (player === "X") {
                        playerMovesArray[splitId[1]][splitId[0]] = "X"
                        player = "O";
                    } else {
                        playerMovesArray[splitId[1]][splitId[0]] = "O";
                        player = "X";
                    }

                    if (checkWinner(playerMovesArray)) {
                        console.log(player + " losses")
                    }
                }
            })
    }
}

const checkWinner = (playerMovesArray) => {

    //check if there is a win horizontally
    for (let indexj = 0; indexj < playerMovesArray.length; indexj++) {

        let previous = playerMovesArray[indexj][0];
        let current = playerMovesArray[indexj][0];
        let indexi = 0;
        while (previous == current) {
            indexi++;
            if (indexi === playerMovesArray.length && previous !== "") {
                return true;
            } else {
                current = playerMovesArray[indexj][indexi];
            }
        }
    }
    //TODO could prob combine some of these together by swithc the indices around
    // but prob to lazy to do it for awhile

    //check if there is a win vertically
    for (let indexi = 0; indexi < playerMovesArray.length; indexi++) {

        let previous = playerMovesArray[0][indexi];
        let current = playerMovesArray[0][indexi];
        let indexj = 0;
        while (previous == current) {
            indexj++;
            if (indexj === playerMovesArray.length && previous !== "") {
                return true;
            } else {
                current = playerMovesArray[indexj][indexi];
            }
        }
    }

    //check diagonal down
    let previous = playerMovesArray[0][0];
    let current = playerMovesArray[0][0];
    let indexj = 0;
    let indexi = 0;
    while (previous == current) {
        indexj++;
        indexi++;
        if (indexj === playerMovesArray.length && previous !== "") {
            return true;
        } else {
            current = playerMovesArray[indexj][indexi];
        }
    }

    previous = playerMovesArray[playerMovesArray.length - 1][0];
    current = playerMovesArray[playerMovesArray.length - 1][0];
    indexj = 0;
    indexi = playerMovesArray.length - 1;
    while (previous == current) {
        indexj++;
        indexi--;

        if (indexj === playerMovesArray.length && previous !== "") {
            return true;
        } else {
            current = playerMovesArray[indexj][indexi];
        }
    }
    return false;
}
