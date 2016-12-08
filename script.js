// To do:

// Add congratulations and death messages
// Add cookie being eaten or some image sequence with incorrect guesses

// Make whole page presentable

// Add to word/phrase library!

// Add instructions to page for how to play game

// Can still submit non-letter guesses.

// Keep track of submitted letters and stop user from submitting the same letter?

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

	this.solvedIndices = [];

	this.numIncorrectGuesses = 0;
	this.incorrectLetters = [];
	this.incorrectPhrases = [];

	this.loadPhraseFromLibrary = function() {
		var phraseLib = this.phraseLibrary;

		// Stop method pulling out the same phrase as last time	
		do {
			var randInt = Math.floor(Math.random() * phraseLib.length);
			console.log(randInt);
		}
		while (phraseLib[randInt].toUpperCase() === this.currentPhrase) 

		// It works!!!! I had forgotten .toUpperCase() ..... oh dear.
		// The reason I went for do/while here as opposed to simply a while loop
		// (both work) was so I wouldn't have to define randInt before the while loop
		// and then again in the while loop. Using do saves a duplicate line of code, apparently,
		// 'cause it does the thing at least once before checking the while loop?

		this.printPhrase(phraseLib[randInt]);		
	}

	this.printPhrase = function(string, arrayIndicesToPrint) {

		// Check if this is a new string and reset game variables if it is.
		if (string !== this.currentPhrase) {
			this.solvedIndices = [];
			this.numIncorrectGuesses = 0;
			this.incorrectLetters = [];
			this.incorrectPhrases = [];

			$(".incorrect-letters").html("");
			$(".incorrect-phrases").html("");
			$(".num-incorrect").html(this.numIncorrectGuesses);
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
		// Reset input field
		$("#letter-input").val("");

		// Check only a single letter
		if (letter.length > 1) {
			alert("One letter at a time please!")
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

			// Call printPhrase with new list of solved indices.
			console.log(this.solvedIndices);
			this.printPhrase(this.currentPhrase, this.solvedIndices);

		} else {

			this.numIncorrectGuesses++;
			this.incorrectLetters.push(letter);

			// Set up a hangman sequence.

			$(".incorrect-letters").html(this.incorrectLetters.toString());
			$(".num-incorrect").html(this.numIncorrectGuesses.toString());

			return "Not a match!"

		}
	}


	this.matchPhrase = function(phrase) {

		$("#phrase-input").val("");
		phrase = phrase.toUpperCase();

		if (phrase === this.currentPhrase) {

			// Congratulations!!

			for (let k = 0; k < this.currentPhrase.length; k++) {
				this.solvedIndices.push(k);
			}

			this.printPhrase(this.currentPhrase, this.solvedIndices);

		} else {

			this.numIncorrectGuesses++;

			this.incorrectPhrases.push(phrase);

			$(".num-incorrect").html(this.numIncorrectGuesses.toString());
			$(".incorrect-phrases").html(this.incorrectPhrases.toString());

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


}



// Instantiate the game 
var hangman = new HangmanGame(phraseLibrary);


// Function to initialize object/event listeners. Argument obj should be HangmanGame instance.
function initializeListeners(obj) {

	$(".incorrect-attempts").hide();

	$(".load-phrase-button").on("click", function() {
		obj.loadPhraseFromLibrary();
		$(".incorrect-attempts").show();
	});

	$(".use-custom-phrase").on("click", function() {
		var userInput = prompt("Enter the word or phrase to play.")
		obj.printPhrase(userInput);
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


