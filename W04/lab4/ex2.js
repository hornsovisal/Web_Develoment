//2.Write a simple JavaScript program to join all elements of the following array into a string by using for loop.
//Sample array : myColor = ["Red", "Green", "White", "Black"];
///Expected Output : "Red,Green,White,Black"

let myColor = ["Red", "Green", "White", "Black"];
let colorString = "";
for (let i = 0; i < myColor.length; i++) {
  colorString += myColor[i];

  if (i < myColor.length - 1) {
    colorString += ",";
  }
}
console.log(colorString);
