(function(){
	document.addEventListener("DOMContentLoaded", onload());
	function onload(){
		renderer = PIXI.autoDetectRenderer(1800, 600, {backgroundColor:0x000000});
		stage = new PIXI.Stage(0x000000);
		document.body.appendChild(renderer.view);
		renderer.view.style.position = "absolute";
		gameContainer = new PIXI.DisplayObjectContainer();

		player1= new PIXI.Graphics();
		player1.beginFill(0xFFFFFF);
		player1.lineStyle(2, 0x888888);
		player1.drawRect(0,0,5,150);
		player1.position.x = 25;
		player1.position.y = 10;

		player2= new PIXI.Graphics();
		player2.beginFill(0xFFFFFF);
		player2.lineStyle(2, 0x888888)
		player2.drawRect(0,0,5,150);
		player2.position.x = 1770;
		player2.position.y = 10;

		ball = new PIXI.Graphics();
		ball.beginFill(0xFFFF00);
		ball.drawCircle(0, 0, 10);
		ball.position.x = 870;
		ball.position.y = 20;

		score1 = 0;
		score2 = 0;
		text1 = new PIXI.Text(score1.toString(), {font: "80px Arial", fill: "#FFFFFF"});
		text2 = new PIXI.Text(score2.toString(), {font: "80px Arial", fill: "#FFFFFF"});
		text1.position.x = 1800/4;
		text1.position.y = 20;
		text2.position.x = 1800 * (3/4);
		text2.position.y = 20;
		gameInProgress = false;

		stage.addChild(gameContainer);
		gameContainer.addChild(player1);
		gameContainer.addChild(player2);
		gameContainer.addChild(ball);
		gameContainer.addChild(text1);
		gameContainer.addChild(text2);
		keyMap = {
			up1: false,
			down1: false,
			up2: false,
			down2: false
		}
		ballDirection = {
			top: 5,
			right: 5
		}
		document.addEventListener('keydown', checkKeyDown);
		document.addEventListener('keyup', checkKeyUp);
		requestAnimationFrame(update);
	}

	function bounce(){
		ball.x += ballDirection.right;
		ball.y += ballDirection.top;
		if (ball.y <= 0 || ball.y >= 590) {
			ballDirection.top = -ballDirection.top;
		}
		if (ball.x <= (player1.position.x+10) && ball.x >= player1.position.x){
			if (ball.y >= player1.position.y && ball.y <= (player1.position.y + 150)) {
				ballDirection.right = -ballDirection.right * 2;
			}
		}
		if (ball.x >= (player2.position.x-15) && ball.x <= player2.position.x){
			if (ball.y >= player2.position.y && ball.y <= (player2.position.y + 150)) {
				ballDirection.right = -ballDirection.right * 2;
			}
		}
		if (ball.x <= 0){
			score2++;
			gameInProgress = false;
			resetBall();
		}
		if (ball.x >= 1800) {
			score1++;
			gameInProgress = false;
			resetBall();
		}
	}

	function resetBall(){
		ball.position.x = 870;
		ball.position.y = 20;
		ballDirection = {
			top: 5,
			right: 5
		}
		text1.setText(score1.toString());
		text2.setText(score2.toString());
	}

	function checkKeyDown(e){
		switch(e.keyCode) {
			case 87:
				keyMap.up1 = true;
				break;
			case 83:
				keyMap.down1 = true;
				break;
			case 38:
				keyMap.up2 = true;
				break;
			case 40:
				keyMap.down2 = true;
				break;
			case 32:
				gameInProgress = true;
		}
	}

	function checkKeyUp(e){
		switch(e.keyCode) {
			case 87:
				keyMap.up1 = false;
				break;
			case 83:
				keyMap.down1 = false;
				break;
			case 38:
				keyMap.up2 = false;
				break;
			case 40:
				keyMap.down2 = false;
				break;
		}
	}

	function goUp(object) {
		var top = object.y;
		if (top <= 0) {
			return;
		}
		else {
			object.y = object.y - 20;
		}
	}

	function goDown(object) {
		var top = object.y;
		if (top >= (600 - 155)) {
			return;
		}
		else {
			object.y = object.y + 20;
		}
	}
	function move(){
		if (keyMap.up1) {
			goUp(player1);
		}
		if (keyMap.down1){
			goDown(player1);
		}
		if (keyMap.up2) {
			goUp(player2);
		}
		if (keyMap.down2){
			goDown(player2);
		}
	};
	function update(){
		if (gameInProgress){
			bounce();
		}
		move();
		requestAnimationFrame(update);
		renderer.render(stage)
	}


})()