let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGamebtn = document.querySelector("#New-Game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let running = true;

const Win_patterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    running = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!running || !turnO || box.innerText !== "") return;

        // Player's move (O)
        box.innerText = "O";
        box.disabled = true;
        turnO = false;

        if (checkWinner("O")) {
            showWinner("O");
            running = false;
            return;
        }

        // Check for draw before computer plays
        if (isDraw()) {
            showDraw();
            return;
        }

        // Computer's turn (X) after a short delay
        setTimeout(computerMove, 500);
    });
});

const computerMove = () => {
    if (!running) return;

    // Find all empty boxes
    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") emptyBoxes.push(index);
    });

    if (emptyBoxes.length === 0) {
        showDraw();
        return;
    }

    // Randomly pick an empty box (simple AI)
    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomIndex].innerText = "X";
    boxes[randomIndex].disabled = true;

    if (checkWinner("X")) {
        showWinner("X (Computer)");
        running = false;
        return;
    }

    if (isDraw()) {
        showDraw();
        return;
    }

    // Switch turn back to player
    turnO = true;
};

const disableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText="";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations!🎉🥳 Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    running = false;
};

const checkWinner = () => {
    for(let pattern of Win_patterns)
    {
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        if(pos1val!="" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
            }
        }
    }
};

const isDraw = () => {
    return [...boxes].every(box => box.innerText !== "");
};

newGamebtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
