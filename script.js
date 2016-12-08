// To do:

// Make congratulations work when you guess the right letter
 // - use printSpaces check to create array of space indices
 // then make this.letterIndices

// Add cookie being eaten or some image sequence with incorrect guesses

// Make whole page presentable

// On loading new game cursor goes to guess a letter box?

// Add to word/phrase library!

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

	this.printPhrase = function(string, arrayIndicesToPrint) {

		// Check if this is a new string and reset game variables if it is.
		if (string !== this.currentPhrase) {
			this.letterIndices = [];
			this.solvedIndices = [];
			this.numIncorrectGuesses = 0;
			this.incorrectLetters = [];
			this.incorrectPhrases = [];

			this.newPhrase = true;

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
			return
		}

		// Check for array of indices to print.
		// Very important NOTE!!! typeof ["I", "am", "an", "array!"]
		// returns "object" because arrays are a type of JS object... <_<
		if (typeof arrayIndicesToPrint === "object") {
			var hasArray = true;
		} else {
			var hasArray = false;
		}


		// Reset phrase container on page.
		$(".phrase-container").html("");

		// Again, no need to split into an array. String should work just fine.
		// Iterate through each character, printing either a space, letter, or underscore to page.
		for (let k = 0; k < string.length; k++) {

			// Print line break for space in phrase.
			if (string[k] === " ") {

				$(".phrase-container").append("<br>");


			// Check for solved characters and print their values.
			} else {

				// Logs letter indices to use in matchLetter to check for solved phrase.
				if (this.newPhrase) {
					this.letterIndices.push(k);					
				}

				if (hasArray) {

					if (this.arrayContains(arrayIndicesToPrint, k)) {

						$(".phrase-container").append(string[k] + " ");

					} else {

						// Print underscore for unknown letter.
						$(".phrase-container").append("_ ");					
					}

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

		var er = letter.toUpperCase();

		// There's really no need to split the phrase into an array...same methods exist on strings.
		var curPhrase = this.currentPhrase;
		
		// Boolean for finding matching letter.
		var matchedLetter = false;

		// Check for any matches to the guessed letter in the phrase
		for (let k = 0; k < curPhrase.length; k++) {

			if (er === curPhrase[k]) {

				// Add that index to solved indices.
				this.solvedIndices.push(k)

				matchedLetter = true;
			}
		} 

		if (matchedLetter) {

			// Check if all non-space indices are solved..
			// var allLettersMatched = false;
			var indicesNotMatched = [];
			for (let k = 0; k < this.letterIndices.length; k++) {
				if (this.solvedIndices.indexOf(this.solvedIndices[k]) === -1) {
					indicesNotMatched.push(k)
				}
			}
			if (indicesNotMatched.length === 0) {
				this.congratulations();	
			}

			// Call printPhrase with new list of solved indices.
			console.log(this.solvedIndices);
			this.printPhrase(this.currentPhrase, this.solvedIndices);

		} else {

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

			// Unoptimized way to display entire phrase.
			for (let k = 0; k < this.currentPhrase.length; k++) {
				this.solvedIndices.push(k);
			}
			this.printPhrase(this.currentPhrase, this.solvedIndices);


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

		// No matches, return false.
		return false;
	}

	this.gameOver = function() {
		$("h1").html("Game over.");
	}

	this.congratulations = function() {
		$("h1").html("Congratulations!");		
	}


}



// Instantiate the game 
var hangman = new HangmanGame(phraseLibrary);


// Function to initialize object/event listeners. Argument obj should be HangmanGame instance.
function initializeListeners(obj) {

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


	$(".guess-letter-button").on("click", function() {
		obj.matchLetter($("#letter-input").val());
	});

	$("#guess-letter-form").submit(function() {
		obj.matchLetter($("#letter-input").val());

		// Return false stops page from reloading on pressing enter in form.
		return false;
	});


	$(".guess-phrase-button").on("click", function() {
		obj.matchPhrase($("#phrase-input").val());
	})

	$("#guess-phrase-form").submit(function() {
		obj.matchPhrase($("#phrase-input").val());
		// Return false stops page from reloading on pressing enter in form.
		return false;
	});

}

initializeListeners(hangman);


