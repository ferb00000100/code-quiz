
var questions = [{
		title: "Commonly used data types DO NOT include:",
		choices: [
			"strings",
			"booleans",
			"alerts",
			"numbers"
		],
		answer: "alerts"
	},{
		title: "The condition in an if / else statement is enclosed within ____.",
		choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
		answer: "parentheses"

}];

var startButton = document.querySelector("#startQuiz");
var submitQ1 = document.querySelector("#sumbitQ1");

var question = document.querySelector("#question");
var answerStrings = document.querySelector("#question1");
var answeBooleans = document.querySelector("#question1");
var answerAlerts = document.querySelector("#question1");
var answerNumbers = document.querySelector("#question1");


// function questions(x)
function begin(){
	x=1;
	document.getElementById("begin").style.display = "none";

	document.getElementById("q1").style.display = "block";
	// questions.textContent = questions.title;

	question.textContent = questions[0].title;
	// questions(5);

}

document.getElementById("q1").style.display = "none";
// startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", begin);


// test  = questions.choices;