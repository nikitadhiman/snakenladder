var player = [];
var boardObj = [];

const drawBoard = () => {
	const row = 10;
	const col = 10;
	var boxNo = 100;
	var board = document.getElementById('board');
	board.innerHTML = '';

	var snakeObj = [{ head: 16, tail: 6 }, { head: 53, tail: 33 }, { head: 63, tail: 59 }, { head: 86, tail: 23 }, { head: 92, tail: 72 },
	{ head: 94, tail: 74 }];
	var ladderObj = [{ head: 3, tail: 13 }, { head: 8, tail: 30 }, { head: 19, tail: 37 }, { head: 27, tail: 88 }, { head: 39, tail: 58 },
	{ head: 52, tail: 64 }, { head: 22, tail: 75 }];
	
	for (let x = 0, a = 0, b = 0; x < row * col; x++) {
		boardObj.push({
			number: x,
			snakeHead: false,
			snakeTail: 0,
			ladderHead: false,
			ladderTail: 0
		});
		if (snakeObj[a] && x === snakeObj[a].head) {
			boardObj[x].snakeHead = true;
			boardObj[x].snakeTail = snakeObj[a].tail;
			a++;
		}
		if (ladderObj[b] && x === ladderObj[b].head) {
			boardObj[x].ladderHead = true;
			boardObj[x].ladderTail = ladderObj[b].tail;
			b++;
		}
	}

	for (var i = 0; i < row; i++) {
		if (i % 2 !== 0) {
			for (var j = 9; j >= 0; j--) {
				if (boardObj[(boxNo - j - 1)].snakeHead) {
					board.innerHTML += "<div class='box snake' id=box" + (boxNo - j) + ">" + (boxNo - j) + "<p class='little-text'>Oops - Go to " + boardObj[(boxNo - j - 1)].snakeTail + "</p></div>";
				}
				else if (boardObj[(boxNo - j - 1)].ladderHead) {
					board.innerHTML += "<div class='box ladder' id=box" + (boxNo - j) + ">" + (boxNo - j) + "<p class='little-text'>Climb to " + boardObj[(boxNo - j - 1)].ladderTail + "</p></div>"
				}
				else {
					board.innerHTML += "<div class='box' id=box" + (boxNo - j) + ">" + (boxNo - j) + "</div>";
				}
			}
		}
		else {
			for (var k = 0; k < col; k++) {
				if (boardObj[(boxNo - k - 1)].snakeHead) {
					board.innerHTML += "<div class='box snake' id=box" + (boxNo - k) + ">" + (boxNo - k) + "<p class='little-text'>Oops - Go to " + boardObj[(boxNo - k - 1)].snakeTail + "</p></div>";
				}
				else if (boardObj[(boxNo - k - 1)].ladderHead) {
					board.innerHTML += "<div class='box ladder' id=box" + (boxNo - k) + ">" + (boxNo - k) + "<p class='little-text'>Climb to " + boardObj[(boxNo - k - 1)].ladderTail + "</p></div>";
				}
				else {
					board.innerHTML += "<div class='box' id=box" + (boxNo - k) + ">" + (boxNo - k) + "</div>";
				}
			}
		}
		boxNo -= 10;
		board.innerHTML += '<br/>';
	}
}


const random = () => {
	return Math.floor(Math.random() * (6)) + 1;
}

const displayPlayer = (playerNo, boxNo) => {
	if (playerNo === 0) {
		var el1 = document.querySelector(".one.player-on-board");
		if (el1) {
			el1.parentNode.removeChild(el1);
		}
		document.getElementById('box' + boxNo).innerHTML += "<div class='player one player-on-board'></div>";
	}
	else {
		var el2 = document.querySelector(".two.player-on-board");
		if (el2) {
			el2.parentNode.removeChild(el2);
		}
		document.getElementById('box' + boxNo).innerHTML += "<div class='player two player-on-board'></div>";
	}
}


const playerPosition = (playerNo) => {
	if (player[playerNo].position >= 100) {
		alert('Player' + (playerNo + 1) + ' win');
		
		location.reload();
	}
	if (boardObj[player[playerNo].position - 1].snakeHead) {
		player[playerNo].position = boardObj[player[playerNo].position - 1].snakeTail;
	}
	if (boardObj[player[playerNo].position - 1].ladderHead) {
		player[playerNo].position = boardObj[player[playerNo].position - 1].ladderTail;
	}
	displayPlayer(playerNo, player[playerNo].position);
}


const move = (playerNo) => {
	if (!playerNo) {
		document.getElementById('play0').setAttribute('disabled', 'disabled');
		document.getElementById('play1').removeAttribute('disabled');
		document.querySelector(".player1").innerHTML = "";
	}
	else {
		document.getElementById('play1').setAttribute('disabled', 'disabled');
		document.getElementById('play0').removeAttribute('disabled');
		document.querySelector(".player0").innerHTML = "";
	}
	var dice;
	dice = random();
	document.querySelector(".player" + playerNo).innerHTML = dice;
	player[playerNo].position += dice;
	playerPosition(playerNo);
	localStorage.setItem('playerPositions', JSON.stringify(player));
}

const reset = () => {
	localStorage.removeItem('playerPositions');
	location.reload();
}

const savedState = () => {
	player = JSON.parse(localStorage.getItem('playerPositions')) || [{ position: 0 }, { position: 0 }];
	if (player[0].position && player[1].position) {
		displayPlayer(0, player[0].position);
		displayPlayer(1, player[1].position);
	}
}
drawBoard();
savedState();