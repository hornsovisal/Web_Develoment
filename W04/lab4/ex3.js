//3.The new Date() constructor creates a new Date object.

// getDate()	Returns the day of the month (from 1-31)
// getDay()	Returns the day of the week (from 0-6)
// getFullYear()	Returns the year
// getHours()	Returns the hour (from 0-23)
// getMilliseconds()	Returns the milliseconds (from 0-999)
// getMinutes()	Returns the minutes (from 0-59)
// getMonth()	Returns the month (from 0-11)
// getSeconds()	Returns the seconds (from 0-59)

// Example: const d = new Date();
// let hour = d.getHours();

// 	Write a JavaScript function to say “Good Morning”, or “Good Afternoon” or “Good
// Evening” according to current time.

const d = new Date();
let hour = d.getHours();

if (hour < 12) {
  console.log("Good Morning");
} else if (hour < 18) {
  console.log("Good Afternoon");
} else {
  console.log("Good Evening");
}
