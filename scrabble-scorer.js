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

function transform(struct) {
   let newStruct =  new Object();

   for (x in struct){
      
      for (y in struct[x]){
         //stuct[x][y] is the letter 
         //x is the value
         let lowerLetter = struct[x][y].toLowerCase();
         let numb = parseInt(x);
         //populate new object
         newStruct[lowerLetter] = numb;
      }
   }

   newStruct[" "] = 0;
   return newStruct;

};


let oldScrabbleScorer = function(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let points = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
         points = points + parseInt(pointValue);
		 }
 
	  }
	}
   //old return statement
	//return letterPoints;
   return points;
 }
 let newPointStructure = transform(oldPointStructure);


 let scrabbleScorer = function(word){
   word = word.toLowerCase();
   let points = 0;


   for (let i = 0; i < word.length; i++) {

      //the value of the letter is simply the points
      points += newPointStructure[word[i]];


   }

   

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
   let word = input.question("Let's play some scrabble! Enter a word: ");
   return word;
};


//let simpleScorer;

//let vowelBonusScorer;



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
      scorerFunction:   scrabbleScorer
   },

   


];

function scorerPrompt() {

   let option = input.question(`
      
   Which scoring algorithm would you like to use?

   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system
   Enter 0, 1, or 2: `);
   option = parseInt(option);
   console.log("");
   
   if (option < 0 || option > 2) {
      return -1;
   }

   //return scoringAlgorithms[option].scorerFunction(word);
   return scoringAlgorithms[option];

}



function runProgram() {
   //flag will make sure that the user enters correct reponsees
   
   let word = initialPrompt();

   //regex to check if string only contains characters that are vailid for the scrabble scorer (letters)
   if (/[^a-zA-Z| ]/.test(word)){
      console.log("make sure the word you enter only contains letters!")
      return -1;
   }
   

   let scoreMethod = scorerPrompt();

   if (scoreMethod == -1) {
      console.log("please enter a valid response.\nenter 0, 1 or 2 please! ");
      return -1;
   }
   
   
   console.log("You've chosen",scoreMethod.name)
   console.log("the score is", scoreMethod.scorerFunction(word),"for",word);
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
