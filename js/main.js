import axios from "axios";

const deleteDog = async (id, card, name) => {
  try {
    const response = await axios.delete(`http://localhost:3000/cats/${id}`);
    if (response.status === 200) {
      card.remove();
      console.log(`Se eliminó a ${name} correctamente`);
    }
  } catch (error) {
    console.error(`Error al eliminar a ${name}`, error);
  }
};

const addEventDelete = (deleteButton, id, card, name) => {
  deleteButton.addEventListener('click', async () => {
    const modal = document.getElementById('modal');
    const confirmButton = document.getElementById('confirm-delete');
    const cancelButton = document.getElementById('cancel-delete');

    modal.style.display = 'block';

    const confirmDelete = async () => {
      await deleteDog(id, card, name);
      modal.style.display = 'none';
    };

    const cancelDelete = () => {
      modal.style.display = 'none';
    };

    confirmButton.addEventListener('click', confirmDelete);
    cancelButton.addEventListener('click', cancelDelete);
  });
};

const createElements = dogs => {
  const main = document.querySelector('.content');

  dogs.forEach(dog => {
    const { img, name, telefono, pais, descripcion, id } = dog;
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="edit">
        <img src="./imagenes/edit.png" alt="">
        <p>Edit</p>
      </div>
      <div class="delete">
        <img src="./imagenes/delete.png" alt="">
        <p>Delete</p>
      </div>
      <div class="img">
        <img src="${img}" alt="${name}">
      </div>
      <p class="name">${name}</p>
      <div class="info">
        <p class="cell">${telefono}</p>
        <span class="separator">|</span>
        <p class="email">${name}@gmail.com</p>
      </div>
      <p class="country">${pais}</p>
      <p>${descripcion}</p>
    `;

    const deleteButton = card.querySelector('.delete');
    addEventDelete(deleteButton, id, card, name);

    main.appendChild(card);
  });
};

const init = () => {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await axios.get('http://localhost:3000/cats');
      const { data } = response;
      createElements(data);
    } catch (error) {
      console.error('Error al obtener los datos de la API:', error);
    }
  });
};


init();