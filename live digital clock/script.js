function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const isPM = hours >= 12;
  const suffix = isPM ? 'PM' : 'AM';

  // 12-hour format
  hours = hours % 12 || 12;

  // Pad numbers with leading zero
  const pad = (n) => (n < 10 ? '0' + n : n);

  const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${suffix}`;

  // Set the time
  document.getElementById('clock').textContent = timeString;

  // Dynamic greeting
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  let greeting = '';

  if (totalMinutes >= 360 && totalMinutes < 720) {
    greeting = 'Good Morning';
  } else if (totalMinutes >= 720 && totalMinutes < 1080) {
    greeting = 'Good Afternoon';
  } else if (totalMinutes >= 1080 && totalMinutes < 1260) {
    greeting = 'Good Evening';
  } else {
    greeting = 'Good Night';
  }

  document.getElementById('greeting').textContent = greeting;
}

// Update clock every second
setInterval(updateClock, 1000);

// Initial call to display immediately
updateClock();

/*
Explanation:
The updateClock() function retrieves the current system time using the Date object,
formats it into 12-hour time with leading zeros, and updates the HTML every second
using setInterval(). It also sets a dynamic greeting based on the current hour.
*/
