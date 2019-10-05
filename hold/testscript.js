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
var leaderBoard = localStorage.getItem('leaderBoard');
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");
var question = document.querySelector("#question");
var questionWindow = document.querySelector("#qWindow");
var timer = document.querySelector("#timer");
var secondsLeft = 76;
var leaders = [];
var score = 0;
var i = 0;

function setTime() {
	var timerInterval = setInterval(function() {
		secondsLeft--;
		timer.textContent = "Time Remaining " + secondsLeft;

		if(secondsLeft <= 0) {
			document.getElementById("qWindow").style.display = "none";
			timer.textContent = 0;
			return;
			// clearInterval(timerInterval);
		}

	}, 1000);
}


function displayQuestions(i) {
	if (i <=4 && secondsLeft >=0) {
		question.textContent = questions[i].title;
		choice1.textContent = questions[i].choices[0];
		choice2.textContent = questions[i].choices[1];
		choice3.textContent = questions[i].choices[2];
		choice4.textContent = questions[i].choices[3];
	}
	else {
		return;
	}

}

function verify(event, i) {
	console.log("event target " + event.target.textContent);
		if (event.target.textContent === questions[i].answer) {
			document.getElementById("qWindow").style.display = "none";
			console.log("Correct Answer");
			score++;
		}
		else {
			secondsLeft = secondsLeft - 20;
			console.log("seconds left " + secondsLeft);
			console.log("the value of i is  " + i);
			if (secondsLeft <= 0 || i === 5) {
				timer.textContent = 0;
				return;
			}
		}
}
function startQuestions() {
	var initials = prompt("type in your initials");

	if (initials === null) {
		window.location.reload();
		return;
	}
	document.getElementById("qWindow").style.display = "block";
	displayQuestions(i);
	questionWindow.addEventListener("click", function (event) {
		console.log("event is " + event);
		verify(event, i);
		i++;
		if (i <=4 && secondsLeft >=0) {
			displayQuestions(i);
			document.getElementById("qWindow").style.display = "block";
		}
		// if (secondsLeft <= 0 && i === 5){
		// 	secondsLeft = 0;
		// 	timer.textContent = secondsLeft;
		// 	return;
		// }
	})
}

function begin(){

	document.getElementById("begin").style.display = "none";
	setTime();
	startQuestions();

}

document.getElementById("qWindow").style.display = "none";
startButton.addEventListener("click", begin);
// leaderButton.addEventListener("click", getLeaders);