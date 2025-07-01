let output = "";

function press(value) {
  output += value;
  document.getElementById("display").value = output;
}

function clr() {
  output = "";
  document.getElementById("display").value = "";
}

function calculate() {
  try {
    output = eval(output).toString();
    document.getElementById("display").value = output;
  } catch (e) {
    document.getElementById("display").value = "Error";
  }
}
