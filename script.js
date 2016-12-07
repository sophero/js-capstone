

function HangmanGame() {

	// Take an argument in the form of an array containing strings for use in the game.

	// Set current phrase.
	this.currentPhrase = "";

	this.solvedIndices = [];

	this.incorrectGuesses = 0;

	this.printSpaces = function(string, arrayIndicesToPrint) {

		// Check if this is a new string and reset solved indices if it is.
		if (string !== this.currentPhrase) {

			this.solvedIndices = [];
			
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


		// Decompose phrase into array of constituent characters.
		var charArray = string.split("");

		// Iterate through each character, printing either a space, letter, or underscore to page.
		for (let k = 0; k < charArray.length; k++) {

			// Print line break for space in phrase.
			if (charArray[k] === " ") {

				$(".phrase-container").append("<br>");


			// Check for solved characters and print their values.
			} else {

				if (hasArray) {

					if (this.arrayContains(arrayIndicesToPrint, k)) {

						$(".phrase-container").append(charArray[k] + " ");

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


	this.searchLetter = function(letter) {

		var er = letter.toUpperCase();
		var charArray = this.currentPhrase.split("");
		
		var matchedLetter = false;
		$("#guess-input")[0].value = "";

		// Check for any matches to the guessed letter
		for (let k = 0; k < charArray.length; k++) {

			if (er === charArray[k]) {

				// Make that letter appear on the screen?
				// Nah, add that index to indices to replace.
				this.solvedIndices.push(k)

				matchedLetter = true;
			}

		} 

		if (matchedLetter) {

			// Add the letter to each letter to replace
			console.log(this.solvedIndices);
			this.printSpaces(this.currentPhrase, this.solvedIndices);

		} else {

			// Set up a hangman dude. Incorrect guesses += 1
			this.incorrectGuesses++;

			$(".num-incorrect").html(this.incorrectGuesses);

			return "Not a match!"

		}
	}


	this.arrayContains = function(array, element) {

		// Check for a match in the array. Not type specific!
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
var hangman = new HangmanGame();

function initializeListeners(obj) {

	$(".guess-button").on("click", function() {

		if (obj.currentPhrase === "") {

			// Load a new phrase and run
		}
		obj.searchLetter($("#guess-input")[0].value);
	});

	$("#guess-input-form").submit(function() {

		// Same code as above... tried to write a function in HangmanGame constructor
		// but it causes trouble using this.. not sure why.
		if (obj.currentPhrase === "") {

			// Load a new phrase and run
		}
		obj.searchLetter($("#guess-input")[0].value);

		// Return false stops the page from reloading.
		return false;
	});

}

initializeListeners(hangman);