function handleFormSubmit(event){
  event.preventDefault();
  const productDetails = {
      price: event.target.price.value,
      name: event.target.name.value,
      type: event.target.type.value,
  };

  axios
    .post("https://crudcrud.com/api/ac4af9dc51d74f6cb79b2f848e4293ad/products", productDetails)
    .then((response) => {
      getDataFromServer();
    })
    .catch((error) => console.log(error));
}

function getDataFromServer(){
  axios
    .get("https://crudcrud.com/api/ac4af9dc51d74f6cb79b2f848e4293ad/products")
    .then((response) => {
      showOnScreen(response.data);
    })
    .catch((error) => console.log(error));
}

function showOnScreen(products){
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  products.forEach((product) => {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.textContent = `${product.price} - ${product.type} - ${product.name}`;

      if (product.type === 'Electronics') {
        document.getElementById('e').appendChild(tr);
      } else if (product.type === 'Food') {
        document.getElementById('f').appendChild(tr);
      } else if (product.type === 'Skincare') {
        document.getElementById('s').appendChild(tr);
      }

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete Order';
      deleteBtn.classList.add('deleteBtn');
      deleteBtn.setAttribute('data-id', product._id);
      deleteBtn.addEventListener('click', () => {
          deleteOrder(product._id);
      });

      td.appendChild(deleteBtn);
      tr.appendChild(td);
  });
}

function deleteOrder(productId){
  axios
    .delete(`https://crudcrud.com/api/ac4af9dc51d74f6cb79b2f848e4293ad/products/${productId}`)
    .then(() => {
      getDataFromServer();
    })
    .catch((error) => console.log(error));
}

window.addEventListener("DOMContentLoaded", getDataFromServer);
document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
