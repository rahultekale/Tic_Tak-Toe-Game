document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resetbtn = document.querySelector(".reset");
    let newgamebtn = document.querySelector("#new-btn");
    let msg_container = document.querySelector(".msg-container"); 
    let msg = document.querySelector("#msg");

    let turnO = true;

    const winpattern = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (box.disabled) return;

            if (turnO) {
                box.innerHTML = "O";
                box.setAttribute("data-player", "Player 1");
                turnO = false;
            } else {
                box.innerHTML = "X";
                box.setAttribute("data-player", "Player 2");
                turnO = true;
            }
            box.disabled = true;

            checkwinner();
        });
    });

    const disableboxes = () => {
        for (let box of boxes) {
            box.disabled = true;
        }
    };

    const showsinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msg_container.classList.remove("hidden");
        disableboxes();
    };

    const checkwinner = () => {
        for (let pattern of winpattern) {
            let posval1 = boxes[pattern[0]].innerText;
            let posval2 = boxes[pattern[1]].innerText;
            let posval3 = boxes[pattern[2]].innerText;
            
            if (posval1 !== "" && posval2 !== "" && posval3 !== "") {
                if (posval1 === posval2 && posval2 === posval3) {
                    let winner = boxes[pattern[0]].getAttribute("data-player");
                    showsinner(winner);
                    return;
                }
            }
        }
    };

    const resetgame = () => {
        for (let box of boxes) {
            box.innerHTML = "";
            box.disabled = false;
            box.removeAttribute("data-player");
        }
        turnO = true;
        msg_container.classList.add("hidden");
    };

    const confirmReset = () => {
        if (confirm("Are you sure you want to reset the game?")) {
            resetgame();
        }
    };

    if (resetbtn) {
        resetbtn.addEventListener("click", confirmReset);
    }
    if (newgamebtn) {
        newgamebtn.addEventListener("click", resetgame);
    }
});
