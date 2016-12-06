

function HangmanGame() {

	// Take an argument in the form of an array containing strings for use in the game.

	// Set current phrase.
	this.currentPhrase = "";

	this.incorrectGuesses = 0;

	this.printSpaces = function(string, arrayIndicesToPrint) {

		// Check for only letters and spaces in the string.
		var letters = /^[a-zA-Z\s]+$/;

		if (!letters.test(string)) {
			alert("Phrase contains invalid characters - letters and spaces only please.");
		}

		// Check for array of indices to print.
		// Very important NOTE!!! typeof ["hey"] returns "object" because arrays are a type of JS object... <_<
		if (typeof arrayIndicesToPrint === "object") {
			var hasArray = true;
		} else {
			var hasArray = false;
		}

		// Reset phrase container on page.
		$(".phrase-container").html("");


		// // Split phrase into separate words. This isn't as versatile as doing it character by character..
		// var splitPhrase = string.split(" ");
		// var numWords = splitPhrase.length;


		// // Print underscores to page.
		// for (let k = 0; k < numWords; k++) {
		// 	var numLetters = splitPhrase[k].length;

		// 	$(".phrase-container").append("_ ".repeat(numLetters));
		// 	$(".phrase-container").append("<br>");

		// }

		// Split phrase character by character.
		var charArray = string.split("");

		// Iterate through each character, printing to page.
		for (let k = 0; k < charArray.length; k++) {

			// Print line break for space in phrase.
			if (charArray[k] === " ") {

				$(".phrase-container").append("<br>");
				console.log("added line break");


			// Check for solved characters and print their values.
			} else {

				if (hasArray) {

					if (this.arrayContains(arrayIndicesToPrint, k)) {

						$(".phrase-container").append(charArray[k]);
						// console.log("added character");

					} else {

						// Print underscore for unknown letter.
						$(".phrase-container").append("_ ");

						// console.log("added underscore");						
					}

				} else {

					// Print underscore for unknown letter.
					$(".phrase-container").append("_ ");

					// console.log("added underscore");
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
		var indicesToReplace = [];


		// Check for any matches to the guessed letter
		for (let k = 0; k < charArray.length; k++) {

			if (er === charArray[k]) {

				// Make that letter appear on the screen?
				// Nah, add that index to indices to replace.
				indicesToReplace.push(k)

				matchedLetter = true;
			}

		} 

		if (matchedLetter) {

			// Add the letter to each letter to replace
			console.log(indicesToReplace);
			this.printSpaces(this.currentPhrase, indicesToReplace);

		} else {

			// Set up a hangman dude. Incorrect guesses += 1
			this.incorrectGuesses++;

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

var hangman = new HangmanGame();
