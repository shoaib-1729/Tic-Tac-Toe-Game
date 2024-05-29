// initial variables
// Step- 0
// the gameGrid stores the values in the grid in the UI (it is used to work logically)
// gameGrid logically kaam karne ke liye hai, ismei store hota chala jaayega
// boxes, UI mei display karega
let gameGrid;
// it stores the current player 'X' or '0'
let currentPlayer;
// winning positions (jispe jispe jeet sakta hai player)
const winningPos = [
    // horizontally
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertically
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonally
    [0, 4, 8],
    [2, 4, 6]
]
const newGameBtn = document.querySelector('.btn');
const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info')
    // function to initialize the game
    // function initGame()
    // task : set the current Player, empty the grid in the UI and logical, hide new button

// Flow of Code in Steps (Step-1)
function initGame() {
    // the current player is 'X' initially
    currentPlayer = "X"
    gameGrid = ["", "", "", "", "", "", "", "", ""]
        //   empty in the UI as well
    boxes.forEach((box, index) => {
        box.innerText = ""
        boxes[index].style.pointerEvents = 'all'
            // set the initial properties of CSS jo pehle thi i.e. 'box' and `box${index+1}`
        box.classList = `box box${index+1}`
    })
    newGameBtn.classList.remove('active')
        // Update it to the UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}
// call the initGame initially
initGame()

// Step- 5
// swapTurn() function : this is simple function of all, if currentPlayer is 'X' then change it to '0', else change it to 'X'
function swapTurn() {

    if (currentPlayer === "X") {
        currentPlayer = "0"
    } else {
        currentPlayer = "X"
    }

    // UI pe update bhi kardo
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}


// Step-2
// when clicked to the new game button, call the initGame()
newGameBtn.addEventListener('click', initGame);


// Step- 4
// handleClick() function : display the 'X' and '0' in the UI
function handleClick(index) {
    // if logical gameGrid is empty, then add "X" or "0"
    if (gameGrid[index] === "") {
        // then update the current player in the UI and logical grid
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        // pointer events ko none kar do
        boxes[index].style.pointerEvents = 'none'
    }
    // gameInfo.innerText = `Current Player - ${currentPlayer}`
    // one turn complete, then swap the turn (define, this function)
    swapTurn();
    // check ki koi jeet to nahi gaya (this is classy function of all, jeetne ka logic isi mei define hoga)
    checkWinner();
}
// Step-3
// add event listener to all the cell in the grid
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        // call a function to handle the click
        handleClick(index);
    })
})


// Step-6 (Last Step)
function checkWinner() {

    let winner = "";
    winningPos.forEach(position => {
        // check karo ki non-empty hai aur same values hai
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            // check for same values
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //  declare the winner, first check who is the winner
            if (gameGrid[position[0]] == "X")
                winner = 'X'
            else
                winner = '0'

            // winner mil chuka hai, ab click naa hone paaye isiliye pointer events ko disable kardo
            boxes.forEach(box => {
                box.style.pointerEvents = 'none'
            })

            // add green class to the cells that have the same value 'X' or '0'
            boxes[position[0]].classList.add('win')
            boxes[position[1]].classList.add('win')
            boxes[position[2]].classList.add('win')
        }
    });
    // end of for each loop
    // if winner mil gaya (update current player, new game )
    if (winner != "") {
        gameInfo.innerText = `Winner Player - ${winner}`
        newGameBtn.classList.add('active')
            // winner mil gaya ab return kar jaao
        return
    }
    // no winner found, check for tie
    // 3 case ho sakte hai, ya to winner mil gaya, ya to tie ho gaya, ya to match chal raha hai
    // agar winner empty hai, to humesha tie nahi hoga, uska matlab ye bhi ho sakta hai ki match abhi chal raha hai, isiliye tie ka ;logic humei define karna hoga
    // jab poora grid fill ho jaayega, matlab tie ho gaya match
    let fillCount = 0;
    gameGrid.forEach(ele => {
            // if box is non-empty, increment the fillCount
            if (ele !== "")
                fillCount++
        })
        // if fillCount is equal to the grid number, then tie ho gaya hai
    if (fillCount === 9) {
        // update the current player to tie
        gameInfo.innerText = 'Game Tied !'
            // make new game button visible
        newGameBtn.classList.add('active');
    }
}
// end of checkWinner() function