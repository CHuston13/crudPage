document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
  
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/items');
      const data = await response.json();
      render(data);
    };
  
    const render = (data) => {
      appContainer.innerHTML = `
        <h2>CRUD Site</h2>
        <button onclick="addItem()">Add Item</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(item => `
              <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>
                  <button onclick="editItem(${item.id})">Edit</button>
                  <button onclick="deleteItem(${item.id})">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    };
  
    window.addItem = async () => {
      const name = prompt('Enter item name:');
      if (name) {
        await fetch('http://localhost:3000/api/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });
        fetchData();
      }
    };
  
    window.editItem = async (id) => {
      const newName = prompt('Enter new name:');
      if (newName) {
        await fetch(`http://localhost:3000/api/items/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, name: newName }),
        });
        fetchData();
      }
    };
  
    window.deleteItem = async (id) => {
      const confirmDelete = confirm('Are you sure you want to delete this item?');
      if (confirmDelete) {
        await fetch(`http://localhost:3000/api/items/${id}`, {
          method: 'DELETE',
        });
        fetchData();
      }
    };
  
    fetchData();
  });
  