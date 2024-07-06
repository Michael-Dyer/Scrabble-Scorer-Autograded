// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let oldScrabbleScorer = function(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let points = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			//letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         points = points + parseInt(pointValue);
		 }
 
	  }
	}
   //old return statement
	//return letterPoints;
   return points;
 }

 let simpleScorer = function(word){
   let points = 0;
	word = word.toUpperCase();
   
   for (let i = 0; i < word.length; i++) {
      points++;
     
    }

    return points;

 }

let vowelBonusScorer = function(word){
   let points = 0;
	word = word.toUpperCase();

   for (let i = 0; i < word.length; i++) {
      if (word[i] == 'A' || word[i] == 'E' || word[i] == 'I' || word[i] == 'O' || word[i] == 'U' || word[i] == 'Y'){
         points = points + 3;
      } 
      else{
         points++;
      }
     
   }

   return points;

 }


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word:");
   return word;
};

let newPointStructure;

//let simpleScorer;

//let vowelBonusScorer;

let scrabbleScorer;

const scoringAlgorithms = [
   //0
   {
      name: "Simple Score",
      description:   "Each letter is worth 1 point.",
      scorerFunction:   simpleScorer
   },

   //1
   {
      name: "Bonus Vowels",
      description:   "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction:   vowelBonusScorer
   },

   //2
   {
      name: "Scrabble",
      description:   "The traditional scoring algorithm.",
      scorerFunction:   oldScrabbleScorer
   },

   


];

function scorerPrompt(word) {

   //note to self
   //don't allow other options and make more descriptive
   let option = input.question("Please Select a scoring option between 0-2! ");
   option = parseInt(option);
   console.log(scoringAlgorithms[option].scorerFunction(word));
}

function transform() {};

function runProgram() {
   let word = initialPrompt();

   scorerPrompt(word);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
