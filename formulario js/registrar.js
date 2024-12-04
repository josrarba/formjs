document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const tablebody = document.querySelector("tbody");
  const saveBtn = document.getElementById("saveBtn");
  const consultBtn = document.getElementById("consultBtn");

  const loadTableData = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    renderTable(users);
  };

  const saveUser = (user, userIndex) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (userIndex !== undefined) {
      users[userIndex] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem("users", JSON.stringify(users));
    renderTable(users);
  };

  const renderTable = (users) => {
    tablebody.innerHTML = "";
    users.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.email}</td>
        <td>${user.nombre}</td>
        <td>${user.apellido}</td>
        <td>${user.edad}</td>
        <td>${user.direccion}</td>
        <td>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newUserModal" onclick="consultUser(${index})">Consultar</button>
          <button class="btn btn-danger" onclick="deleteUser(${index})">Eliminar</button>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newUserModal" onclick="editUser(${index})">Editar</button>
        </td>
      `;
      tablebody.appendChild(row);
    });
  };

  window.consultUser = (index) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users[index];
    if (user) {
      document.getElementById("Email").value = user.email;
      document.getElementById("Nombre").value = user.nombre;
      document.getElementById("Apellido").value = user.apellido;
      document.getElementById("Edad").value = user.edad;
      document.getElementById("Direccion").value = user.direccion;
      saveBtn.style.display = "none";
      consultBtn.style.display = "inline-block";
    }
  };

  window.deleteUser = (index) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    loadTableData();
  };

  window.editUser = (index) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users[index];
    document.getElementById("Email").value = user.email;
    document.getElementById("Nombre").value = user.nombre;
    document.getElementById("Apellido").value = user.apellido;
    document.getElementById("Edad").value = user.edad;
    document.getElementById("Direccion").value = user.direccion;
    document.getElementById("userIndex").value = index;
    saveBtn.style.display = "inline-block";
    consultBtn.style.display = "none";
  };

  const resetForm = () => {
    document.getElementById("newUserForm").reset();
    document.getElementById("userIndex").value = "";
    saveBtn.style.display = "inline-block";
    consultBtn.style.display = "none";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userIndex = document.getElementById("userIndex").value;
    const user = {
      email: document.getElementById("Email").value,
      nombre: document.getElementById("Nombre").value,
      apellido: document.getElementById("Apellido").value,
      edad: document.getElementById("Edad").value,
      direccion: document.getElementById("Direccion").value,
    };
    saveUser(user, userIndex ? parseInt(userIndex) : undefined);
    resetForm();
    bootstrap.Modal.getInstance(document.getElementById("newUserModal")).hide();
  });
  loadTableData();
});
