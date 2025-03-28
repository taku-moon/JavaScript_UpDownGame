let answer = randomNumber();
let chance = 7;
let history = [];

let userInput = document.getElementById("user-input");
let goButton = document.getElementById("go-button");
let resetButton = document.getElementById("reset-button");

let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");

// 사용자 입력 창에 포커스가 갔을 때, 입력값을 지움
userInput.addEventListener("focus", function () {
    userInput.value = "";
});

// 엔터 키를 누르면 Go 버튼 클릭 이벤트를 트리거
userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        goButton.click(); // Go 버튼 클릭 시 실행되는 go() 함수 호출
    }
});

goButton.addEventListener("click", go);
resetButton.addEventListener("click", reset);

function randomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function updateUI(resultText, chanceText = `남은 기회: ${chance}`) {
    resultArea.textContent = resultText;
    chanceArea.textContent = chanceText;
}

function go() {
    let userInputValue = parseInt(userInput.value);

    if (isNaN(userInputValue)) {
        updateUI("숫자를 입력해주세요 :<");
        return;
    }

    if (userInputValue < 1 || userInputValue > 100) {
        updateUI("1부터 100까지 가능합니다 :<");
        return;
    }

    if (history.includes(userInputValue)) {
        updateUI("이미 입력한 숫자입니다 :<");
        return;
    }

    history.push(userInputValue);
    chance--;

    if (userInputValue < answer) {
        updateUI("UP ↑");
    } else if (userInputValue > answer) {
        updateUI("DOWN ↓");
    } else {
        updateUI("정답 :)", "");
        goButton.disabled = true;
        return;
    }

    if (chance === 0) {
        updateUI("Game Over ㅠㅅㅠ", `정답: ${answer}`);
        goButton.disabled = true;
    }
}

function reset() {
    answer = randomNumber();
    chance = 7;
    history = [];
    userInput.value = "";
    goButton.disabled = false;
    updateUI("과연 결과는 ㅇㅅㅇ?!");
    console.log(answer); // 새로운 정답을 콘솔에 출력 (디버깅용)
}

// 게임 시작 시 초기 정답 출력 (디버깅용)
console.log(answer);
