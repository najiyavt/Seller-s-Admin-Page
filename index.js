const us = document.getElementById('skin');
const uf = document.getElementById('food');
const ue = document.getElementById('elec');

function handleFormSubmit(event){

    event.preventDefault();

    const productDetails = {
       price: event.target.price.value,
       name: event.target.name.value,
       type: event.target.type.value,
    }
    axios
       .post("https://crudcrud.com/api/d95d5ffbc97846b58d64ba6b70f96bc3/products", productDetails)
       .then((res) => {
        getDataFromServer();
       })
       .catch((error) => console.log(error));
}

function getDataFromServer(){
    axios
       .get("https://crudcrud.com/api/d95d5ffbc97846b58d64ba6b70f96bc3/products")
       .then((res) => {
        showOnScreen(res.data);
       })
       .catch((error) => console.log(error));
}

function showOnScreen(user) {
    
  ue.innerHTML = '';
  uf.innerHTML = '';
  us.innerHTML = '';

  user.forEach((data) => {
      const li = document.createElement('li');
      li.innerHTML = `
      <label>${data.price} -</label> 
      <label>${data.type} - </label> 
      <label>${data.name}</label> 
      <button class='deleteBtn' data-id="${data._id}">Delete</button>
      `
      if(data.type === 'Electronics'){
        ue.appendChild(li);
      }else if (data.type === 'Food'){
        uf.appendChild(li);
      }else{
        us.appendChild(li)
      }
  })
  document.querySelectorAll('.deleteBtn').forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', () => {
         const p = deleteBtn.getAttribute("data-id");
         deleteProduct(p);
      })
    });
}
      
function deleteProduct(productId){
  axios
    .delete(`https://crudcrud.com/api/d95d5ffbc97846b58d64ba6b70f96bc3/products/${productId}`)
    .then(() => {
      getDataFromServer();
    })
    .catch((error) => console.log(error));
}

window.addEventListener("DOMContentLoaded", getDataFromServer);
document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
