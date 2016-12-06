

// function makePhrase(string) {
// 	var phrase = string.toUpperCase();
// 	var splitPhrase = phrase.split(" ");
// 	var numWords = splitPhrase.length;

// 	for (let k = 0; k  < numWords; k++) {
// 	$(".phrase-container").html()

// 		// splitPhrase[k].length

// 	}

// 	// Send to another function to print the empty spaces?
// }

function Hangman() {

	// Take an argument in the form of an array containing strings for use in the game.

	// Set default phrase.
	this.phrase = "";

	this.printSpaces = function(string) {

		// Check for only letters and spaces in the string.
		var letters = /^[a-zA-Z\s]+$/;
		if (!letters.test(string)) {
			alert("Phrase contains invalid characters - letters and spaces only please.");
		}

		// Reset phrase container on page.
		$(".phrase-container").html("");

		// Split phrase into separate words.
		var splitPhrase = string.split(" ");
		var numWords = splitPhrase.length;

		for (let k = 0; k < numWords; k++) {
			var numLetters = splitPhrase[k].length;

			$(".phrase-container").append("_ ".repeat(numLetters));
			$(".phrase-container").append("<br>");

		}

		this.phrase = string.toUpperCase();
	}


	function searchLetter(letter) {

	}

}

var hangman = new Hangman();