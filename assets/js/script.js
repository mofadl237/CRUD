let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");
let productSearch = document.querySelector("#productSearch");
let contentAdd = document.querySelector("table tbody");
//Access 4 button In This Project
let btn_add = document.getElementById("btn_add");
let btn_sort = document.getElementById("btn_sort");
let btn_update = document.querySelector("#btn_update");

/*All Function In One Function Add Data */
//Add List Product in one Array To Display Array
let AllProducts = [];
let productUpdate = 0;
// create object to add data from global to access in any function

/* كدا global يعني التعديل جوا بيعدل عليه ىلازم ارجعه عشن اخد منه نسخه تانيه  حطه جوا داله GetData*/

//0- Get Data From Local Storage
if (localStorage.getItem("products") != null) {
  AllProducts = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

//1- get DataFrom User
function getData() {
  return {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    Desc: productDesc.value,
  };
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
  localStorage.setItem("products", JSON.stringify(AllProducts));
}
function addLast(productObject) {
  AllProducts.push(productObject);
  localStorage.setItem("products", JSON.stringify(AllProducts));
}
//5- display data in array for table tbody innerHTML
function displayArray(Array) {
  contentAdd.innerHTML = "";
  if (Array.length < 1) {
    contentAdd.innerHTML += `<tr > <td colspan="7"  style="text-align: center;">Not Found Product</td> </tr>`;
  }
  for (var i = 0; i < Array.length; i++) {
    contentAdd.innerHTML += `<tr>
          <td>${i}</td>
          <td>${Array[i].name}</td>
          <td>${Array[i].price}</td>
          <td>${Array[i].category}</td>
          <td>${Array[i].Desc}</td>
          <td><button class="btn btn-outline-warning text-white" data-item="${i}" id="btn_update" onclick="loadDataChange(${i})">Update</button></td>
          <td><button class="btn btn-danger"  data-item="${i}" id="btn_delete" onclick="deleteProduct(${i});">Delete</button></td>
      </tr>`;
  }
}
function displayProducts() {
  //Clear  Content Data

  if (AllProducts.length > 1) {
    btn_sort.style.visibility = "visible";
  } else {
    btn_sort.style.visibility = "hidden";
  }
  displayArray(AllProducts);
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
  AllProducts.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(AllProducts));
  displayProducts();
}

//9- Update Function
function loadDataChange(i) {
  btn_add.classList.add("d-none");
  btn_update.classList.remove("d-none");

  productCategory.value = AllProducts[i].category;
  productDesc.value = AllProducts[i].Desc;
  productName.value = AllProducts[i].name;
  productPrice.value = AllProducts[i].price;
  productUpdate = i;
}
function updateData() {
  btn_add.classList.remove("d-none");
  btn_update.classList.add("d-none");
  AllProducts[productUpdate] = getData();
  localStorage.setItem("products", JSON.stringify(AllProducts));
  clearData();
  displayProducts();
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
//10- Search Data
function searchData() {
  var search = productSearch.value;
  var ProductSearchArray = [];
  for (var i = 0; i < AllProducts.length; i++) {
    if (AllProducts[i].name.toLowerCase().includes(search.toLowerCase())) {
      ProductSearchArray.push(AllProducts[i]);
    }
  }
  displayArray(ProductSearchArray);
}
productSearch.addEventListener("input", searchData);
//Add Event On Buttons
btn_add.addEventListener("click", AddProduct);
btn_sort.addEventListener("click", sortedArray);
btn_update.addEventListener("click", updateData);
