
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
var leaders = document.querySelector("#leaders");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");
var question = document.querySelector("#question");
var questionWindow = document.querySelector("#qWindow");
var timer = document.querySelector("#timer");
var secondsLeft = 76;


function setTime() {
	var timerInterval = setInterval(function() {
		secondsLeft--;
		timer.textContent = "Time Remaining " + secondsLeft;

		if(secondsLeft <= 0) {
			clearInterval(timerInterval);
			console.log("COMPLETED");
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
	document.getElementById("leaders").style.display = "block";

	leaderBoard = localStorage.getItem('leaderBoard');
	leaders.textContent = leaderBoard;


}
function storeScore(initials, score) {
	// var leaderBoard = localStorage.getItem('leaderBoard');
	var newleaderBoard;
	if(leaderBoard){
		leaderBoard = JSON.parse(leaderBoard);
		//We have some leaderboard saved
		if(leaderBoard.length >= 5){
			console.log("leader board length " + leaderBoard.length);
			//Here we need to do some comparison to determine if current user deserves to be on leaderboard
			for(var i = leaderBoard.length - 1; i >= 0;i++){
				console.log(leaderBoard.length);
				console.log("leader board score " + leaderBoard[i].score);
				if(leaderBoard[i].score < score){
					leaderBoard[i] = {initials, score};
					break;
				}
			}
			newleaderBoard = leaderBoard;
		}
		else {
			//we should jsut add and sort and save
			leaderBoard.push({initials, score});
			leaderBoard.sort(function(a,b){
				return b.score - a.score;
			});
			newleaderBoard = leaderBoard;
		}
	}
	else {
		//we ahve never created a leader board
		newleaderBoard = [{initials, score}]
	}

	// console.log(initials);
	// console.log(score);
	localStorage.setItem('leaderBoard', JSON.stringify(newleaderBoard));
}

function startQuestions(){
	var initials = prompt("type in your initials");
	var score = 0;
	var i = 0;

	document.getElementById("qWindow").style.display = "block";
	displayQuestions(i);
	questionWindow.addEventListener("click", function (event) {
		console.log(event);
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
			secondsLeft = secondsLeft - 15;
			i++;
			if (i <=4) {
				displayQuestions(i);
				document.getElementById("qWindow").style.display = "block";
			}
		}
		if(i === 5){
			storeScore(initials, score);
			document.getElementById("qWindow").style.display = "none";
			secondsLeft = 1;
		}
		console.log('HERE IS I', i);

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
