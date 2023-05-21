document.addEventListener("DOMContentLoaded", function() {
  fetch('bajaj_file.json')
    .then(response => response.json())
    .then(data => renderData(data.employees))
    .catch(error => console.log(error));

  function renderData(employees) {
    const filterCheckboxes = document.querySelectorAll('.filterCheckbox');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('results');

    // Render all employees initially
    renderEmployees(employees);

    // Filter employees based on skills selection
    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const selectedSkills = getSelectedSkills();
        const filteredEmployees = filterEmployeesBySkills(employees, selectedSkills);
        renderEmployees(filteredEmployees);
      });
    });

    // Filter employees based on name search
    searchInput.addEventListener('keyup', function() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredEmployees = filterEmployeesByName(employees, searchTerm);
      renderEmployees(filteredEmployees);
    });

    function getSelectedSkills() {
      const selectedSkills = [];
      filterCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
          selectedSkills.push(checkbox.value);
        }
      });
      return selectedSkills;
    }

    function renderEmployees(employees) {
      resultsContainer.innerHTML = '';

      if (employees.length === 0) {
        resultsContainer.innerHTML = '<p>No matching employees found</p>';
      } else {
        employees.forEach(employee => {
          const employeeCard = createEmployeeCard(employee);
          resultsContainer.appendChild(employeeCard);
        });
      }
    }

    function createEmployeeCard(employee) {
      const employeeCard = document.createElement('div');
      employeeCard.classList.add('employee-card');

      const nameElement = document.createElement('h3');
      nameElement.textContent = employee.name;
      employeeCard.appendChild(nameElement);

      const skillsElement = document.createElement('p');
      skillsElement.classList.add('skills');
      skillsElement.textContent = 'Skills: ' + employee.skills.join(', ');
      employeeCard.appendChild(skillsElement);

      return employeeCard;
    }

    function filterEmployeesBySkills(employees, selectedSkills) {
      return employees.filter(employee => {
        return selectedSkills.some(skill => employee.skills.includes(skill));
      });
    }

    function filterEmployeesByName(employees, searchTerm) {
      return employees.filter(employee => {
        return employee.name.toLowerCase().includes(searchTerm);
      });
    }
  }
});
