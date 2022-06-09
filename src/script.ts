// Assign variable to the generate button
const generateBtn = document.querySelector("#generate")!;

// Write password to the #password input
const writePassword = () => {
  const password = generatePassword();
  let passwordText = document.querySelector("#password") as HTMLInputElement;
  passwordText.value = password!; // non-null assertion
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Create empty arrays for character type selections
let numbers: Array<number> = [];
let upperChars: Array<string> = [];
let lowerChars: Array<string> = [];

// Global function added to create array from given CharCode start and end codes
let createArrayFromCharCodes = (startCharCode: number, endCharCode: number, array: Array<any>) : void => {
  for (let i = startCharCode; i <= endCharCode; i++) {
    array.push(String.fromCharCode(i));
  }
};

// Create numbers array from 0 to 9
createArrayFromCharCodes(48, 57, numbers);

// Create upper characters array from A to Z
createArrayFromCharCodes(65, 90, upperChars);

// Create lower characters array from a to z
createArrayFromCharCodes(97, 122, lowerChars);

// Create special character array
let special: Array<string> = [
  "!",
  "@",
  "#",
  "%",
  "^",
  "$",
  "£",
  "&",
  "+",
  "=",
  "-",
  ".",
  "{",
  "}",
];

// Generates random number based on any array length using the Array as an input
let randomNumberFromArray = (array: Array<any>) : number => {
  const random = Math.floor(Math.random() * array.length);
  return random;
};

// Global function to push ALL selected character types to the selectionArray
const pushAllToSelectedArray = (char: Array<any>, selectionArray: Array<any>): void => {
  char.forEach((element) => {
    selectionArray.push(element);
  });
};

// Global function to push SINGLE random selections from any defined Array Character Type (Also takes any array)
const pushRandomToPasswordArray = (charType: Array<any>, passwordArray: Array<any>): void => {
  passwordArray.push(charType[randomNumberFromArray(charType)]);
};

// Main function to generate password
const generatePassword = () : string | null => {
  let selectionArray: Array<any> = [];

  // enables number of password characters input via a prompt
  let characters: any = prompt(
    "How many characters would you like your password to contain?"
  );

  // enables alert prompts for too short or too long passwords
  if (characters < 8) {
    alert("Password is too short.");
    return null;
  } else if (characters > 128) {
    alert("Password is too long!");
    return null;
  }

  // create empty password array
  let password: Array<string> = [];

  // prompt message for special character selection
  if (confirm("Click OK to confirm including special characters")) {
    pushAllToSelectedArray(special, selectionArray);
    pushRandomToPasswordArray(special, password);
  }

  // prompt message for number character selection
  if (confirm("Click OK to confirm including numeric characters")) {
    pushAllToSelectedArray(numbers, selectionArray);
    pushRandomToPasswordArray(numbers, password);
  }

  // prompt message for lower characters selection
  if (confirm("Click OK to confirm including lowercase characters")) {
    pushAllToSelectedArray(lowerChars, selectionArray);
    pushRandomToPasswordArray(lowerChars, password);
  }

  // prompt message for caps characters selection
  if (confirm("Click OK to confirm including uppercase characters")) {
    pushAllToSelectedArray(upperChars, selectionArray);
    pushRandomToPasswordArray(upperChars, password);
  }

  // Creates alert and terminates upon no character type selection
  if (selectionArray.length === 0) {
    alert("At least one character types needs to be selected.");
    return null;
  }

  // Store number of selections for last reshuffling step
  const selections = password.length;

  // Adjust characters to take on remaining characters needed
  characters -= password.length;

  //Push random selection to meet initial character selection length
  for (var i = 0; i < characters; i++) {
    pushRandomToPasswordArray(selectionArray, password);
  }

  // Finally shuffle initial single pushed values only as other indices have already been randomized
  for (var i = 0; i <= selections - 1; i++) {
    const randomIndex = randomNumberFromArray(password);
    [password[i], password[randomIndex]] = [password[randomIndex], password[i]];
  }

  // Use join method to convert the Password Array to a string and return
  return password.join("");
};