/* ASSIGN CONST VARIABLES FROM DOM ELEMENTS*/

const   hexInput = document.getElementById("hex-input"),                    // GET VALUES FROM INPUT VIA DOM ELEMENT AND ASSIGN THIS TO hexInput
        inputColor = document.getElementById("selected-color"),             // GET VALUES FOR THE SELECTED COLOR VIA DOM ELEMENT AND ASSIGN THIS TO inputColor
        sliderBar = document.getElementById("slider"),
        sliderText = document.getElementById("slider-text");

/* USER INPUT CHECK */

hexInput.addEventListener('keyup', () => {                                  // DETECTS IF THE USER IS TYPING IN THE INPUT BOX, THEN PARSES THE FOLLOWING

    const hex = hexInput.value;                                             // ASSIGN THE VALUE OF THE hexInput TO VARIABLE hex
    
    if ((!isValidHex(hex))) return;                                         // CHECKS IF THE INPUT IS VALID BY EXECUTING THE isValidHex FUNCTION. IF THE CONDITIONAL CHECK HERE FAILS, return AND STOP PARSING. THIS IS CRUCIAL, BEFORE THE FOLLOWING CAN BE PARSED.

    const strippedHex = hex.replace('#', '');                               // SEE LINE 27

    inputColor.style.backgroundColor = "#" + strippedHex;                   // TAKES THE VALUE OF strippedHex, APPENDS # TO THE BEGINNING OF IT (ie. STANDARDISING THE VALUE ENTERED) AND ASSIGNS THIS VALUE TO THE BACKGROUND-COLOR PROPERTY OF THE INPUT COLOR DIV

});

/* VALID HEX FUNCTION CHECK */

const isValidHex = (hex) => {                                               // DECLARES THE FUNCTION isValidHex WHICH ACCEPTS HEX VALUES, THEN RETURNS A RESULT DEPENDING ON THE INPUT
    
    const   regexCheck = /^[0-9a-fA-F]+$/,
            strippedHex = hex.replace('#', '');                             // A SIMPLE WAY OF STRIPPING THE # FROM THE INPUT BY DECLARING THE VARIABLE strippedHex, SEARCHING FOR THE '#' AND SUBSEQUENTLY REPLACING IT WITH ''

    if ((strippedHex.length === 3 || strippedHex.length === 6) && (regexCheck.test(strippedHex))) {
        return true;
    } else {
        return false;
    }
};

/* CONVERT HEX TO GRB FUNCTION */

const convertHexToRGB = (hex) => {

    if ((!isValidHex(hex))) return null;                                    // THE isValidHex FUNCTION SHOULD AGAIN BE EXECUTED BEFORE THE FOLLOWING CAN BE PARSED TO THE VALUE

    let strippedHex = hex.replace('#', '');                                 // THE hex VALUE PASSED IS CONVERTED AND PASSED TO strippedHex, WHICH THEN BECOMES THE VARIABLE USED (NOT THE RAW DATA INPUTTED ie. hex ITSELF)

    if (strippedHex.length === 3) {                                         // THIS CONDITION DOUBLES UP EACH INDIVIDUAL VALUE TO A PAIR (e.g. 123 --> 112233) WHICH IS HOW HEX VALUES CONVENTIONALLY WORK
        strippedHex = strippedHex[0] + strippedHex[0]                       // TAKE THE FIRST VALUE IN THE STRING AND CONCATENATE IT WITH THE SAME VALUE
                    + strippedHex[1] + strippedHex[1]                       // TAKE THE SECOND VALUE IN THE STRING AND CONCATENATE IT WITH THE SAME VALUE
                    + strippedHex[2] + strippedHex[2];                      // TAKE THE THIRD VALUE IN THE STRING AND CONCATENATE IT WITH THE SAME VALUE
    }

    // console.log(strippedHex);                                            // SHOULD RETURN 112233 (CANNOT BE PLACED ON BELOW SECTION AS VARIABLE IS LOCAL SCOPE)

    const   r = parseInt(strippedHex.slice(0, 2), 16),                      // EXTRACT THE FIRST TWO VALUES OF THE STRING, MULTIPLY THIS BY 16 USING parseInt, THEN ASSIGN THIS VALUE TO r
            g = parseInt(strippedHex.slice(2, 4), 16),                      // EXTRACT THE NEXT TWO VALUES OF THE STRING, MULTIPLY THIS BY 16 USING parseInt, THEN ASSIGN THIS VALUE TO g
            b = parseInt(strippedHex.slice(4, 6), 16);                      // EXTRACT THE FINAL TWO VALUES OF THE STRING, MULTIPLY THIS BY 16 USING parseInt, THEN ASSIGN THIS VALUE TO b

    return {r,g,b};                                                         // RETURN THE CONVERTED VALUE. OFTEN, {r:r, g:g, b:b} IS USED HOWEVER ISN'T REQUIRED HERE, AS THE VARIABLE NAMES ALREADY CORRESPOND ACCORDINGLY
}

/* CONVERT RGB BACK TO HEX FUNCTION */

const convertRGBToHex = (r,g,b) => {
    let convertedRed = ("0" + r.toString(16)).slice(-2),                    // TAKES THE VALUE OF r AND PARSES toString WITH A BASE OF 16. "0" IS THEN APPENDED TO THE START. SLICE THEN TAKES THE LAST TWO VALUES (IRRESPECTIVE OF IT BEING 2 OR 3 CHARACTERS LONG - STANDARDISATION)
        convertedGreen = ("0" + g.toString(16)).slice(-2),                  // TAKES THE VALUE OF g AND PARSES toString WITH A BASE OF 16. "0" IS THEN APPENDED TO THE START. SLICE THEN TAKES THE LAST TWO VALUES (IRRESPECTIVE OF IT BEING 2 OR 3 CHARACTERS LONG - STANDARDISATION)
        convertedBlue = ("0" + b.toString(16)).slice(-2);                   // TAKES THE VALUE OF b AND PARSES toString WITH A BASE OF 16. "0" IS THEN APPENDED TO THE START. SLICE THEN TAKES THE LAST TWO VALUES (IRRESPECTIVE OF IT BEING 2 OR 3 CHARACTERS LONG - STANDARDISATION)
    
    const convertedHex = "#" + convertedRed + convertedGreen + convertedBlue;

    return convertedHex;
}

//console.log(convertRGBToHex(0,255,255));

/* DISPLAY PERCENTAGE IN TEXT FROM SLIDER DRAG */

sliderBar.addEventListener('input', () => {
    sliderText.innerHTML = `${sliderBar.value} &#37;`;
})

/* ALTER COLOR BY PERCENTAGE */

const alterColor = (hex, percentage) => {                                   // ACCEPT THE FOLLOWING PARAMETERS (NOT DECLARED) WHICH WILL BE MANIPULATED WITHIN THE FUNCTION
    const {r,g,b} = convertHexToRGB(hex);                                   // PARSE THE FUNCTION convertHexToRGB() AND ASSIGN THE VALUES (SEE LINE 56 - THE FUNCTION RETURNS AN OBJECT WITH AN 'r', 'g' and 'b' VALUE) TO CONST VARIABLES r, g, b BY DESTRUCTURING THE VALUES THAT IS RETURNED FROM THE FUNCTION INLINE (ie. INSTEAD OF DECLARING obj.r, obj.g, obj.b INDIVIDUALLY)
    console.log(r,g,b);                                                     // CONSOLE LOG THE CORRESPONDING OBJECT VARIABLES DECLARED ABOVE (LOCAL)

    const calculateAmount = Math.floor((percentage / 100) * 255);           // TAKE THE VALUE PASSED TO percentage VIA THE ARGUMENT ON LINE 88 AND DIVIDE THIS BY 100, THEN MULTIPLE BY THE BASE 255. Math.floor() ROUNDS THIS DOWN TO ENSURE IT IS AN INTEGER. THIS AMOUNT IS THEN APPLIED TO THE hex VALUES RETURNED FROM THE ABOVE.

    const   newR = controlValuesWithin0To255(r, calculateAmount),           // CALLS THE FUNCTION AND PASSES THE ARGUMENTS TO IT
            newG = controlValuesWithin0To255(g, calculateAmount),
            newB = controlValuesWithin0To255(b, calculateAmount);

    // console.log(newR, newG, newB);
    return convertRGBToHex(newR, newG, newB);                               // LEVERAGES THE convertRGBToHex FUNCTION TO THEN CONVERT THESE NEW CALCULATED VALUES TO A HEX 
}

/* KEEP OUTPUT VALUES WITHIN RANGE OF 0 TO 255 */

const controlValuesWithin0To255 = (hex, amount) => {
    const newHex = hex + amount;
    if (newHex > 255) return 255;
    if (newHex < 0) return 0;
    return newHex;
}

console.log(alterColor('fff', -10));                                         // FUNCTION ABOVE MUST BE CALLED AND PASSED RESPECTIVE ARGUMENTS IF console.log IS TO BE PARSED. THIS WILL RETURN undefined OTHERWISE.