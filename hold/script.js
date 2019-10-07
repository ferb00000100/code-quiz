
var questions = [{
		title: "What is the correct way to access the 'models' of an object named 'cars' ",
		choices: ["obj.cars[models]", "cars.models", "objCars.models", "models.cars"],
		answer: "cars.models"
	},{
		title: "What is the correct way to convert an array into a string",
		choices: ["x.splice(4, 1,'');", "x.toString();", "x.split(');", "x.array();"],
		answer: "x.toString();"
	},{
		title: "How can you view logs when running JavaScript?",
		choices: ["server system logs", "http logs", "browser console logs", "javascript application logs"],
		answer: "browser console logs"
	},{
		title: "How would you declare the variable 'x' in Javascript?",
		choices: ["var x", "x", "int x", "x = x"],
		answer: "var x"
	},{
		title: "What is one way to get user input into JavaScript?",
		choices: ["getInput()", "raw_input()", "$x = <STDIN", "prompt()"],
		answer: "prompt()"
}  ];

var startButton = document.querySelector("#startQuiz");
var leaderButton = document.querySelector("#leaderButton");
var displayLeaders = document.querySelector(".displayLeaders");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");
var question = document.querySelector("#question");
var questionWindow = document.querySelector("#qWindow");
var timer = document.querySelector("#timer");
var secondsLeft = 76;
var leaders = [];

function setTime() {
	var timerInterval = setInterval(function() {
		secondsLeft--;
		timer.textContent = "Time Remaining " + secondsLeft;

		if(secondsLeft <= 0) {
			document.getElementById("qWindow").style.display = "none";
			clearInterval(timerInterval);
		}

	}, 1000);
}


function displayQuestions(i) {
	question.textContent = questions[i].title;
	choice1.textContent = questions[i].choices[0];
	choice2.textContent = questions[i].choices[1];
	choice3.textContent = questions[i].choices[2];
	choice4.textContent = questions[i].choices[3];

}

function getLeaders() {
	leaders = JSON.parse(localStorage.getItem('leaders'));
	displayLeaders.innerHTML= "";
	console.log("leader length " + leaders.length);

	for (var i = 0; i < leaders.length; i++){

		var li =document.createElement("li");
		li.textContent = "Leader " + leaders[i].initials + " Score " +leaders[i].score;
		li.setAttribute("data-index", i);
		displayLeaders.appendChild(li);
		// console.log("leader " + leaders[i].initials);
		// displayLeaders.innerHTML = "Leader " + leaders[i].initials + " Score " +leaders[i].score;
		// console.log(leaders[i].initials);
		// console.log(leaders[i].score);
	}
}

function storeScore(initials, score) {

	var storedleaderBoard = JSON.parse(localStorage.getItem('leaders'));
	console.log("leaderBoard is " + storedleaderBoard);
	if(storedleaderBoard === null) {
		leaders = [{initials, score}];
		localStorage.setItem("leaders", JSON.stringify(leaders));
	}
	else {
		leaders = {initials, score};
		storedleaderBoard.push(leaders)
		storedleaderBoard.sort(function (a,b) {
			return b.score - a.score;
		});
		newLeaderBoard = storedleaderBoard;
		localStorage.setItem("leaders", JSON.stringify(newLeaderBoard));
		// ORIG
		// leaders = {initials, score};
		// storedleaderBoard.push(leaders);
		// localStorage.setItem("leaders", JSON.stringify(storedleaderBoard));
	}
}

function startQuestions(){
	var initials = prompt("type in your initials");
	var score = 0;
	var i = 0;
	if (initials === null) {
		window.location.reload();
		return;
	}
	document.getElementById("qWindow").style.display = "block";
	displayQuestions(i);
	questionWindow.addEventListener("click", function (event) {
		for( var i = 0; i < questions.length; i++){
		console.log("answer " + questions[i].answer);
		console.log("i is " + i);

		if (event.target.textContent === questions[i].answer) {
			document.getElementById("qWindow").style.display = "none";
			console.log("Correct Answer");
			score++;
			i++;
			if (i <=4) {
				displayQuestions(i);
				document.getElementById("qWindow").style.display = "block";
			}
			else {
				secondsLeft = 1;
			}
		}
		else {
			secondsLeft = secondsLeft - 5;
			if (secondsLeft <= 0){
				timer.textContent = "Time Remaining 0";
				return;
			}
			if (i <=4) {
				displayQuestions(i);
				// document.getElementById("qWindow").style.display = "block";
			}
			else {
				secondsLeft = 1;
			}
			i++;
		}
		if(i === 5){
			storeScore(initials, score);
			document.getElementById("qWindow").style.display = "none";
			secondsLeft = 1;
			}
		}
	})

}

function begin(){

	document.getElementById("begin").style.display = "none";
	setTime();
	startQuestions();

}

document.getElementById("qWindow").style.display = "none";
startButton.addEventListener("click", begin);
leaderButton.addEventListener("click", getLeaders);
