
var logFloorTwelve = (num) => Math.floor(Math.log(num) / Math.log(12));

function intToDozenal(num) {
    function math(num,carry) {
        //we don't have a number left, so return our digit array
        if (num === 0) {
            return carry;
        }

        //this will tell us what digit we are working in, the dozen place or gross place, etc
        let place = logFloorTwelve(num);

        //if the carry isn't set yet, create an array equal to our place plus one
        carry = carry || new Array(place + 1).fill(0);

        //the weight of a digit in this place, for example, the doz place is worth 12
        let placeValue = Math.pow(12,place);

        //What value belongs in this place in a doz representation
        let value = Math.floor(num / placeValue);

        //set the value in the digit list
        carry[place] = value;

        //subtract the weighted value
        num -= value * placeValue;

        //continue with the reduced number
        return math(num, carry);
    }
   
    //reverse numbers into reading order
    //convert 10 and 11 to their string representation
    //join them into a string
    return math(num).reverse().map((n) => {
       if (n === 10) return 'X';
       if (n === 11) return 'E';
       return n;
    }).join('');
}

function dozenalToInt(str) {
    function convert(n) {
      if (n === "X") return 10;
      if (n === "E") return 11;
      if (n < 10) return n;

      throw new Error("Bad str");  
    };

    function pow12(value, place) {
        return Math.pow(12,place) * value;
    };

    function sum(a,b) {
       return a + b;
    }

    //ensure we have a string
    str = '' + str;

    //split the string into an array
    //reverse the reading order into math order
    //convert the doz strings to ints
    //convert the weighted value into a base 10 weighted value
    //add them together
    return str.split('').reverse().map(convert).map(pow12).reduce(sum);
};
