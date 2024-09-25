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
}
function addLast(productObject) {
  AllProducts.push(productObject);
}
//5- display data in array for table tbody innerHTML
function displayProducts() {
    //Clear  Content Data
    contentAdd.innerHTML = "";
  for (var i = 0; i < AllProducts.length; i++) {
    contentAdd.innerHTML += `<tr>
            <td>${i}</td>
            <td>${AllProducts[i].name}</td>
            <td>${AllProducts[i].price}</td>
            <td>${AllProducts[i].category}</td>
            <td>${AllProducts[i].Desc}</td>
            <td><button class="btn btn-warning" data-item="${i}" id="btn_update" onclick="updateProduct(this)">Update</button></td>
            <td><button class="btn btn-danger"  data-item="${i}" id="btn_delete" onclick="deleteProduct(this);">Delete</button></td>
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
function deleteProduct(e) {
  var startDelete = parseInt(e.getAttribute("data-item"));
  AllProducts.splice(startDelete,1);
  displayProducts();
}

//9- Update Function
function updateProduct(e){
    var startDelete = parseInt(e.getAttribute("data-item"));
    validData();
    var product=getData();
    AllProducts.splice(startDelete,1,product);
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

