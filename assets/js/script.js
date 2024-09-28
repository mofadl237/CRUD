var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");

var contentAdd = document.querySelector("table tbody");
//Access 4 button In This Project
var btn_add = document.getElementById("btn_add");
var btn_sort = document.getElementById("btn_sort");

/*All Function In One Function Add Data */
//Add List Product in one Array To Display Array
var AllProducts = [];
// create object to add data from global to access in any function

/* كدا global يعني التعديل جوا بيعدل عليه ىلازم ارجعه عشن اخد منه نسخه تانيه  حطه جوا داله GetData*/

//0- Get Data From Local Storage
if(localStorage.getItem('products') != null){
  AllProducts=JSON.parse(localStorage.getItem('products'));
  displayProducts();
}

//1- get DataFrom User
function getData() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    Desc: productDesc.value,
  };
  return product;
}
//2- check valid data
function validData() {
  if (productName.value == "") {
    productName.value = "Iphone";
  }
  if (productPrice.value == "") {
    productPrice.value = 2000;
  }
  if (productCategory.value == "") {
    productCategory.value = "mobile";
  }
  if (productDesc.value == "") {
    productDesc.value = "Good";
  }
}

//4- push object in array list
function addFirst(productObject) {
  AllProducts.unshift(productObject);
  localStorage.setItem('products',JSON.stringify(AllProducts));
}
function addLast(productObject) {
  AllProducts.push(productObject);
  localStorage.setItem('products',JSON.stringify(AllProducts));

}
//5- display data in array for table tbody innerHTML
function displayProducts() {
    //Clear  Content Data
    contentAdd.innerHTML = "";
    if(AllProducts.length > 1){
      btn_sort.style.visibility="visible";
    }else{
      btn_sort.style.visibility="hidden";
    }
  for (var i = 0; i < AllProducts.length; i++) {
      contentAdd.innerHTML += `<tr>
            <td>${i}</td>
            <td>${AllProducts[i].name}</td>
            <td>${AllProducts[i].price}</td>
            <td>${AllProducts[i].category}</td>
            <td>${AllProducts[i].Desc}</td>
            <td><button class="btn btn-warning" data-item="${i}" id="btn_update" onclick="updateProduct(${i})">Update</button></td>
            <td><button class="btn btn-danger"  data-item="${i}" id="btn_delete" onclick="deleteProduct(${i});">Delete</button></td>
        </tr>`;
  }
}
//6- clear data from inputs
function clearData() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}
//7- filter Add Data Sort In Array From Name
function sortedArray() {
  AllProducts.sort(function (a, b) {
    first = a.name.toString().toLowerCase();
    second = b.name.toString().toLowerCase();
    if (first > second) {
      return 1;
    } else if (first < second) {
      return -1;
    } else {
      return 0;
    }
  });
  displayProducts();
}

//8- Delete Function
function deleteProduct(i) {
  AllProducts.splice(i,1);
  localStorage.setItem('products',JSON.stringify(AllProducts));
  displayProducts();
}

//9- Update Function
function updateProduct(i){
    validData();
    var product=getData();
    AllProducts.splice(i,1,product);
    localStorage.setItem('products',JSON.stringify(AllProducts));
    displayProducts();
    clearData();
}

/*This Is Most Function In This Project */

//3-function AddProduct
function AddProduct() {
  validData();
  var product = getData();
  addLast(product);
  clearData();
  displayProducts();
}
//Add Event On Buttons
btn_add.addEventListener("click", AddProduct);
btn_sort.addEventListener("click", sortedArray);

