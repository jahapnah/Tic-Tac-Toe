const boxes = document.querySelectorAll(".box");    
const gameInfo = document.querySelector(".game-info")
const btn = document.querySelector(".btn")



let currentPlayer;
let gameGrid;
gameInit();

function gameInit()
{
    currentPlayer = "X"
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box)=>{
        box.innerText = "";
        box.classList.remove("win");
        box.style.pointerEvents = "all"
    })
    btn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

// Lets start the game ------------------------->


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents  = "none";

        // swap the player
        swapPlayer();

        // Check for win
        checkGameOver();
    }
}

function swapPlayer()
{
    if(currentPlayer == "X"){
        currentPlayer = "O";
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
    }
    else{
        currentPlayer = "X";
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
    }
}

function checkGameOver(){

    let winner = "";

    winningPositions.forEach( (position) => {


        if(( gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" )&&(gameGrid[position[0]] === gameGrid[position[1]])&&(gameGrid[position[1]] === gameGrid[position[2]]))
        {

            if(gameGrid[position[0]] == "X"){
                winner = "X";
            }
            else{
                winner = "O";
            }

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
        }

    })

    // winner mil chuka hai :)
    if(winner !== ""){
        gameInfo.innerText = `Winner Player - ${winner}`;
        btn.classList.add("active");
        return;
    }

    // Tie condition
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        btn.classList.add("active");
    }
}

boxes.forEach((box, index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});

btn.addEventListener("click", ()=>{
    gameInit();
})