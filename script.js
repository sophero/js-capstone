// To do:

// Add hangman sequence! Use online image editor

// Make whole page presentable

// On loading new game cursor goes to guess a letter box.
	// Make this thing work: $("#guess-letter-form").focus();

$(document).ready(function() {
	// Instantiate the game 
	var hangman = new HangmanGame(phraseLibrary);
	initializeListeners(hangman);
});


var phraseLibrary = [
	"Borborygmus",
	"system of a down",
	"New Zealand", 
	"rhythm",
	"acquiesce",
]

function HangmanGame(phraseLibrary) {

	// Take an argument in the form of an array containing strings for use in the game.
	if (typeof phraseLibrary === "object") {

		this.phraseLibrary = phraseLibrary;

	} else {

		this.phraseLibrary = [];
	}

	// Set current phrase.
	this.currentPhrase = "";
	this.letterIndices = [];

	// Set game variables.
	this.solvedIndices = [];
	this.numIncorrectGuesses = 0;
	this.incorrectLetters = [];
	this.incorrectPhrases = [];
	this.isGameOver = false;

	this.loadPhraseFromLibrary = function() {
		var phraseLib = this.phraseLibrary;

		// Stop this method pulling out the same phrase as last time.	
		do {
			var randInt = Math.floor(Math.random() * phraseLib.length);
			console.log(randInt);
		}
		while (phraseLib[randInt].toUpperCase() === this.currentPhrase) 
			

		this.printPhrase(phraseLib[randInt]);		
	}

	this.printPhrase = function(string) {

		// Check if this is a new string and reset game variables if it is.
		if (string !== this.currentPhrase) {
			this.letterIndices = [];
			this.solvedIndices = [];
			this.numIncorrectGuesses = 0;
			this.incorrectLetters = [];
			this.incorrectPhrases = [];

			this.newPhrase = true;
			this.isGameOver = false;

			$("#letter-input").val("");
			$("#phrase-input").val("");
			$(".incorrect-letters").html("");
			$(".incorrect-phrases").html("");
			$(".num-incorrect").html(this.numIncorrectGuesses);

		} else {

			this.newPhrase = false;

		}

		// Check for only letters and spaces in the string.
		var letters = /^[a-zA-Z\s]+$/;

		if (!letters.test(string)) {
			alert("Phrase contains invalid characters - letters and spaces only please.");
			return;
		}

		// Reset phrase container on page.
		$(".phrase-container").html("");

		// Iterate through each character, print either a space, letter, or underscore.
		for (let k = 0; k < string.length; k++) {

			// Print line break for a space.
			if (string[k] === " ") {
				$(".phrase-container").append("<br>");

			// Check for solved characters and print their values.
			} else {

				// Logs which indices in the string of a new phrase are letters.
				if (this.newPhrase) {
					this.letterIndices.push(k);					
				}

				if (this.arrayContains(this.solvedIndices, k)) {
					// Print solved-for letter.
					$(".phrase-container").append(string[k] + " ");

				} else {

					// Print underscore for unknown letter.
					$(".phrase-container").append("_ ");					

				}
			}
		}

		// Set current phrase on HangmanGame object.
		this.currentPhrase = string.toUpperCase();

		return "Current phrase set to: " + this.currentPhrase;
	}


	this.matchLetter = function(letter) {

		// Reset input field.
		$("#letter-input").val("");

		// Check only a single letter entered.
		if (letter.length > 1) {
			alert("One letter at a time please!");
			return;
		}

		// Don't allow non-letter input.
		var letters = /^[a-zA-Z]*$/
		if (letters.test(letter) === false) {
			alert("That's not a letter!");
			return;
		}

		// Stop empty guesses.
		if (letter === "") {
			return;
		}

		// Put the cursor in the letter guess box.
		$("input[name=letter-input]").focus();
		console.log("hey");

		var er = letter.toUpperCase();

		// There's really no need to split the phrase into an array...same methods exist on strings.
		var curPhrase = this.currentPhrase;
		
		// Create Boolean - have matched a letter yet?
		var matchedLetter = false;

		// Check for any matches to the guessed letter in the phrase
		for (let k = 0; k < curPhrase.length; k++) {

			if (er === curPhrase[k]) {

				// Add that index to solved indices.
				this.solvedIndices.push(k)

				matchedLetter = true;
			}
		} 

		// Matched a letter,
		if (matchedLetter) {

			// Call printPhrase.
			this.printPhrase(this.currentPhrase);
			console.log(this.solvedIndices);

			// Check if there are any remaining non-space indices to be solved.
			var indicesNotMatched = [];
			for (let k = 0; k < this.letterIndices.length; k++) {

				if (this.solvedIndices.indexOf(this.solvedIndices[k]) === -1) {
					indicesNotMatched.push(k)
				}
			}

			if (indicesNotMatched.length === 0) {
				this.congratulations();	

			}
			
		} else {
		// no matching letter found,

			this.numIncorrectGuesses++;
			this.incorrectLetters.push(letter.toUpperCase());

			// Set up a hangman sequence.

			$(".incorrect-letters").html(this.incorrectLetters.toString());
			$(".num-incorrect").html(this.numIncorrectGuesses.toString());

			if (this.numIncorrectGuesses >= 9) {
				this.gameOver();
			}

		}
	}


	this.matchPhrase = function(phrase) {

		$("#phrase-input").val("");
		phrase = phrase.toUpperCase();

		if (phrase === this.currentPhrase) {

			// Congratulations!!
			this.congratulations();

			// Display entire phrase.
			for (let k = 0; k < this.currentPhrase.length; k++) {
				this.solvedIndices.push(k);
			}
			this.printPhrase(this.currentPhrase);


		} else {

			this.numIncorrectGuesses++;

			this.incorrectPhrases.push(phrase);

			$(".num-incorrect").html(this.numIncorrectGuesses.toString());
			$(".incorrect-phrases").html(this.incorrectPhrases.toString());

			if (this.numIncorrectGuesses >= 9) {
				this.gameOver();
			}
		}

	}

	this.arrayContains = function(array, element) {

		// Check for a match in the array (or string). Conditional is not type specific!
		for (let k = 0; k < array.length; k++) {

			if (element == array[k]) {
				return true;
			}
		}

		// Make it through the for loop without a match; return false.
		return false;
	}

	this.gameOver = function() {
		this.isGameOver = true;
		$("h1").html("Game over.");
	}

	this.congratulations = function() {
		this.isGameOver = true;
		$("h1").html("Congratulations!");		
	}


}



// Function to initialize object/event listeners. Argument obj should be HangmanGame instance.
function initializeListeners(obj) {

	// Hide incorrect attempts on first page load.
	$(".incorrect-attempts").hide();

	$(".load-phrase-button").on("click", function() {
		obj.loadPhraseFromLibrary();
		$("h1").html("Hangman");
		$(".incorrect-attempts").show();
	});

	$(".use-custom-phrase").on("click", function() {
		var userInput = prompt("Enter the word or phrase to play.")
		obj.printPhrase(userInput);
		$("h1").html("Hangman");
		$(".incorrect-attempts").show();
	});


	// Guess letter button and form submit
	$(".guess-letter-button").on("click", function() {
		if (obj.isGameOver) {
			return;
		}
		obj.matchLetter($("#letter-input").val());
	});

	$("#guess-letter-form").submit(function() {
		if (obj.isGameOver) {
			return false;
		}
		obj.matchLetter($("#letter-input").val());
		// Return false stops page from reloading on pressing enter in form.
		return false;
	});


	// Guess phrase button and form submit
	$(".guess-phrase-button").on("click", function() {
		if (obj.isGameOver) {
			return;
		}
		obj.matchPhrase($("#phrase-input").val());
	});

	$("#guess-phrase-form").submit(function() {
		if (obj.isGameOver) {
			return false;
		}
		obj.matchPhrase($("#phrase-input").val());
		// Return false stops page from reloading on pressing enter in form.
		return false;
	});

}



