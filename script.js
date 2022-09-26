// FIRST, CREATE A FUNCTION WHICH CHECKS TO SEE WHETHER THE INPUT FROM THE USER IS A VALID HEX COLOR
    // THE USER CAN INPUT A HEX COLOR WITH OR WITHOUT A #, e.g. 000000 or #000000
    // FOR THIS TO THEN BE PARSED THROUGH CHECKS, THE # SHOULD BE OMITTED TO 'STANDARDISE' THE INPUT TYPE.
    // THE LENGTH OF THE CHARACTER SHOULD ALSO BE CHECKED. THE DEFAULT IS 6, HOWEVER 3 CHARACTERS SHOULD ALSO BE ACCEPTED
        // N.B. 123 --> 112233
    // THE CHECKS ARE THEREFORE CONSIDERING 'ARE THE HEX VALUES ENTERED VALID TO BEGIN WITH?'

const isValidHex = (hex) => {                                           // DECLARES THE FUNCTION isValidHex WHICH ACCEPTS HEX VALUES, THEN RETURNS A RESULT DEPENDING ON THE INPUT
    if(!hex) return false;                                              // IF THE VALUE IS NOT A HEX (ie. TWO CHARACTERS, MORE THAN 6 etc,), RETURN false

    const strippedHex = hex.replace('#', '');                           // A SIMPLE WAY OF STRIPPING THE # FROM THE INPUT BY DECLARING THE VARIABLE strippedHex, SEARCHING FOR THE '#' AND SUBSEQUENTLY REPLACING IT WITH ''
    
    RegExp = /^[0-9a-fA-F]+$/;
    if (RegExp.hex) return true;
    
    return strippedHex.length === 3 || strippedHex.length === 6;        // RETURNS THE LENGTH OF THE strippedHex IF IT IS EITHER 3 OR 6

}

// CALLING THE FUNCTION BY PASSING IT A VALUE AND RETURNING THE RESULT TO THE CONSOLE LOG
// THIS IS GOOD PRACTICE TO TEST OUT THE LOGIC OF THE FUNCTION TO ENSURE THINGS ARE RUNNING AS THEY SHOULD BEFORE ANY ADDITIONAL CODING IS PARSED TO THE INPUTS

console.log(isValidHex("#000000"));                                     // SHOULD RETURN true
console.log(isValidHex("#0000000"));                                    // SHOULD RETURN false
console.log(isValidHex("#ffffff"));                                     // SHOULD RETURN true
console.log(isValidHex("#fff"));                                        // SHOULD RETURN true
console.log(isValidHex("#azp"));                                        // SHOULD RETURN false
console.log(isValidHex("#323"));                                        // SHOULD RETURN true

// N.B. THE ALPHABETICAL RANGE OF HEX VALUES ONLY RUN FROM a -- f