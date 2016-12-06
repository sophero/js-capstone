

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

		// Print underscores to page.
		for (let k = 0; k < charArray.length; k++) {

			if (charArray[k] === " ") {

				$(".phrase-container").append("<br>");

			} else {

				$(".phrase-container").append("_ ");

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

		} else {

			// Set up a hangman dude. Incorrect guesses += 1
			this.incorrectGuesses++;

			return "Not a match!"

		}

		

	}

}

var hangman = new HangmanGame();
