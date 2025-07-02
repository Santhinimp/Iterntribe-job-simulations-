const tableBody = document.querySelector('#userTable tbody');

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    users.forEach(user => {
      addUserRow(user);
    });
  })
  .catch(error => console.error('Error fetching users:', error));

function addUserRow(user) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td contenteditable="false">${user.name}</td>
    <td contenteditable="false">${user.username}</td>
    <td contenteditable="false">${user.email}</td>
    <td contenteditable="false">${user.address.city}</td>
    <td>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;

  const editBtn = tr.querySelector('.edit-btn');
  const deleteBtn = tr.querySelector('.delete-btn');
  const editableTds = tr.querySelectorAll('td[contenteditable]');

  editBtn.addEventListener('click', () => {
    const isEditing = editBtn.textContent === 'Save';

    editableTds.forEach(td => td.contentEditable = isEditing ? 'false' : 'true');
    editBtn.textContent = isEditing ? 'Edit' : 'Save';
    editBtn.className = isEditing ? 'edit-btn' : 'save-btn';
  });

  deleteBtn.addEventListener('click', () => {
    tr.remove();
  });

  tableBody.appendChild(tr);
}
