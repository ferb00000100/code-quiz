
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
var end = document.querySelector("#end");
var timer = document.querySelector("#timer");
var finish = document.getElementById("end");

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

function getLeaders() {

	leaders = JSON.parse(localStorage.getItem('leaders'));
	if (leaders === null) {
		return;
	}
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
	}
}

function displayQuestions(i) {
	question.textContent = questions[i].title;
	choice1.textContent = questions[i].choices[0];
	choice2.textContent = questions[i].choices[1];
	choice3.textContent = questions[i].choices[2];
	choice4.textContent = questions[i].choices[3];

}
function checkAnswers(i, initials){
	var score = 0;
	console.log("i is " + i);
	// console.log("question for " + i + " is " + questions[i].answer);
	// console.log("event target is " + event.target.textContent);
	console.log(questions.length);
	length = questions.length - 1;
			questionWindow.addEventListener("click", function (event) {
				console.log("question for " + i + " is " + questions[i].answer);
				console.log("event target is " + event.target.textContent);
				if (event.target.textContent === questions[i].answer) {
					score++;
					i++;
					console.log(score);
					console.log(secondsLeft);

					if (i <= 4){
						displayQuestions(i);
					}
					else {
						storeScore(initials, score);
						secondsLeft = 1;
						var btn=document.createElement("BUTTON");
						btn.textContent = "Finished"
						end.appendChild(btn);
						document.getElementById("end").style.display = "block";
					}
				}
				else {
					secondsLeft = secondsLeft - 15;
					i++;
					if (i <= 4){
						displayQuestions(i);
					}
					else {
						storeScore(initials, score);
						secondsLeft = 1;
						var btn=document.createElement("BUTTON");
						btn.textContent = "Finished"
						end.appendChild(btn);
						document.getElementById("end").style.display = "block";

					}
				}
			});
}

function startQuestions() {
	var initials = prompt("type in your initials");
	var i = 0;
	if (initials === null) {
		window.location.reload();
		return;
	}
	document.getElementById("qWindow").style.display = "block";
	displayQuestions(i);
	checkAnswers(i, initials);
	}

function begin(){

	document.getElementById("begin").style.display = "none";
	setTime();
	startQuestions();

}

function runFinish (){
	window.location.reload();

}
document.getElementById("end").style.display = "none";
document.getElementById("qWindow").style.display = "none";
startButton.addEventListener("click", begin);
leaderButton.addEventListener("click", getLeaders);
finish.addEventListener("click",runFinish)
