const employees = [
  { name: "Alice", age: 30, department: "HR", role: "Manager", salary: 50000 },
  { name: "Bob", age: 25, department: "Engineering", role: "Developer", salary: 70000 },
  { name: "Charlie", age: 28, department: "Sales", role: "Salesperson", salary: 45000 },
  { name: "Diana", age: 35, department: "Engineering", role: "Team Lead", salary: 80000 },
  { name: "Eva", age: 32, department: "HR", role: "Recruiter", salary: 48000 }
];

let filteredEmployees = [...employees];

const tableBody = document.getElementById("employeeTableBody");
const departmentFilter = document.getElementById("departmentFilter");
const searchInput = document.getElementById("searchInput");
const avgSalaryEl = document.getElementById("avgSalary");
const empDetailsEl = document.getElementById("employeeDetails");
const empCountEl = document.getElementById("employeeCount");

function displayEmployeeTable(data) {
  tableBody.innerHTML = "";
  data.forEach(emp => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.age}</td>
      <td>${emp.department}</td>
      <td>${emp.role}</td>
      <td>${emp.salary}</td>
    `;
    tableBody.appendChild(row);
  });
  empCountEl.textContent = data.length;
}

function convertNamesToUpperCase() {
  filteredEmployees = filteredEmployees.map(emp => ({
    ...emp,
    name: emp.name.toUpperCase()
  }));
  displayEmployeeTable(filteredEmployees);
}

function calculateAverageSalary() {
  if (filteredEmployees.length === 0) {
    avgSalaryEl.textContent = "N/A";
    return;
  }
  const total = filteredEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const average = total / filteredEmployees.length;
  avgSalaryEl.textContent = average.toFixed(2);
}

function filterByDepartment() {
  const dept = departmentFilter.value;
  filteredEmployees = dept ? employees.filter(emp => emp.department === dept) : [...employees];
  displayEmployeeTable(filteredEmployees);
}

function searchEmployeeByName() {
  const name = searchInput.value.trim().toLowerCase();
  if (!name) {
    empDetailsEl.textContent = "-";
    return;
  }
  const emp = employees.find(emp => emp.name.toLowerCase() === name);
  if (emp) {
    empDetailsEl.textContent = `${emp.name}, ${emp.age} yrs, ${emp.role} in ${emp.department}, Salary: $${emp.salary}`;
  } else {
    empDetailsEl.textContent = "No match found";
  }
}

departmentFilter.addEventListener("change", () => {
  filterByDepartment();
});

searchInput.addEventListener("input", () => {
  searchEmployeeByName();
});

displayEmployeeTable(filteredEmployees);
