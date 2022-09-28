// FIRST, CREATE A FUNCTION WHICH CHECKS TO SEE WHETHER THE INPUT FROM THE USER IS A VALID HEX COLOR
    // THE USER CAN INPUT A HEX COLOR WITH OR WITHOUT A #, e.g. 000000 or #000000
    // FOR THIS TO THEN BE PARSED THROUGH CHECKS, THE # SHOULD BE OMITTED TO 'STANDARDISE' THE INPUT TYPE.
    // THE LENGTH OF THE CHARACTER SHOULD ALSO BE CHECKED. THE DEFAULT IS 6, HOWEVER 3 CHARACTERS SHOULD ALSO BE ACCEPTED
        // N.B. 123 --> 112233
    // THE CHECKS ARE THEREFORE CONSIDERING 'ARE THE HEX VALUES ENTERED VALID TO BEGIN WITH?'

const hexInput = document.getElementById("hex-input");                  // GET VALUES FROM INPUT VIA DOM ELEMENT AND ASSIGN THIS TO hexInput
const inputColor = document.getElementById("selected-color");           // GET VALUES FOR THE SELECTED COLOR VIA DOM ELEMENT AND ASSIGN THIS TO inputColor

hexInput.addEventListener('keyup', () => {

    const hex = hexInput.value;
    
    if ((!isValidHex(hex))) return;

    const strippedHex = hex.replace('#', '');

    inputColor.style.backgroundColor = "#" + strippedHex;

});

const isValidHex = (hex) => {                                           // DECLARES THE FUNCTION isValidHex WHICH ACCEPTS HEX VALUES, THEN RETURNS A RESULT DEPENDING ON THE INPUT
    
    const regexCheck = /^[0-9a-fA-F]+$/;

    const strippedHex = hex.replace('#', '');                           // A SIMPLE WAY OF STRIPPING THE # FROM THE INPUT BY DECLARING THE VARIABLE strippedHex, SEARCHING FOR THE '#' AND SUBSEQUENTLY REPLACING IT WITH ''

    if ((strippedHex.length === 3 || strippedHex.length === 6) && (regexCheck.test(strippedHex))) {
        return true;
    } else {
        return false;
    }
};

/*  THE FUNCTION CREATES A VARIABLE (SAME NAME) AND IS PASSED THE INPUT IN THE hex PARAMETER. INSIDE THE FUNCTION,
    A VARIABLE IS CREATED WHICH STORES A REGEX CHECK. ANOTHER VARIABLE IS CREATED WHICH TAKES THE hex CONTENTS AND
    STRIPS THE '#' AT THE BEGINNING. AN if STATEMENT THEN CHECKS WHETHER THE FINAL hex IS EITHER 3 OR 6 DIGITS IN
    LENGTH AND THE CONTENTS OF THE strippedHex VARIABLE MATCHES THE REGEX CHECK. IF THE hex IS USED HERE, IT WILL 
    RETURN false, AS hex WILL MAY CONTAIN A '#', WHICH FAILS THE REGEX CHECK, AND SUBSEQUENTLY THE if STATEMENT*/

// THE CHECK SHOULD CHECK BE 'IF HEX IS PRESENT AND IS BETWEEN 3 OR 6 AND FULFILS REGEX CHECK, RETURN true <-- TO BE DONE
// CALLING THE FUNCTION BY PASSING IT A VALUE AND RETURNING THE RESULT TO THE CONSOLE LOG
// THIS IS GOOD PRACTICE TO TEST OUT THE LOGIC OF THE FUNCTION TO ENSURE THINGS ARE RUNNING AS THEY SHOULD BEFORE ANY ADDITIONAL CODING IS PARSED TO THE INPUTS

console.log(isValidHex("#000000"));                                     // SHOULD RETURN true
console.log(isValidHex("#0000000"));                                    // SHOULD RETURN false
console.log(isValidHex("#ffffff"));                                     // SHOULD RETURN true
console.log(isValidHex("#fff"));                                        // SHOULD RETURN true
console.log(isValidHex("#azp"));                                        // SHOULD RETURN false
console.log(isValidHex("#323"));                                        // SHOULD RETURN true

// N.B. THE ALPHABETICAL RANGE OF HEX VALUES ONLY RUN FROM a --> f