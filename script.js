

function makePhrase(string) {
	var phrase = string.toUpperCase();
	var splitPhrase = phrase.split(" ");
	var numWords = splitPhrase.length;

	for (let k = 0; k  < numWords; k++) {
	$(".phrase-container").html()

		// splitPhrase[k].length

	}

	// Send to another function to print the empty spaces?
}

function printSpaces(string) {
	var splitPhrase = string.split(" ");
	var numWords = splitPhrase.length;

	// var newImgTag = $("<img>");
	// newImgTag.attr("src", "images/horizontal_line-512.png");
		
	for (let k = 0; k < numWords; k++) {
		var numLetters = splitPhrase[k].length;
		// var newSpaces = newImgTag * splitPhrase[k].length;
		// console.log("_".repeat(numLetters));
		$(".phrase-container").append("_ ".repeat(numLetters));
		$(".phrase-container").append("<br>");

	}
}