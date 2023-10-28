const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const filter = document.getElementById("filter");
let isEditMode = false;
const formBtn = itemForm.querySelector("button");


function displayItems() {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item)=> addItemToDom(item))
    checkUI();
}

const addItem = (e) =>{
    e.preventDefault();
    let value = itemInput.value;
    if (value === ""){
        alert("Write something you fucking dude");
        return ;
    }
    // check if edit mode 
    if (isEditMode){
       const item = document.querySelector(".edit-mode")
       removeItemFromStorage(item)
       item.remove();
       isEditMode = false
    }else{
        let itemsFromStorage = getItemsFromStorage();
        if(itemsFromStorage.includes(value)){
            alert("Item already present")
            return;
        }
    }
    addItemToDom(value)
    addItemToStorage(value);
    itemInput.value = "";
    checkUI();

}

 function addItemToDom(item) {
    const list = document.createElement("li");
    list.appendChild(document.createTextNode(item));
    const btn = createButton("remove-item btn-link text-red") ;
    list.appendChild(btn)
    itemList.appendChild(list)
 }

 const createButton = (class2) => {
    const btn = document.createElement("button");
    btn.className = class2 ;
    const icon = createIcon("fa-solid fa-xmark");
    btn.appendChild(icon);
    return btn ; 
}

const createIcon = (class1) => {
    const icon = document.createElement("i")
    icon.className = class1 ;
    return icon ;
};

function addItemToStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    
    itemsFromStorage.push(item);
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
   
}


function getItemsFromStorage() {
    let itemsFromStorage;
    if(localStorage.getItem('items') === null) {
        itemsFromStorage =[]
    }
    else{
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }
   return itemsFromStorage ;
   
}

const onClickItem = (e) => {
    if(e.target.parentElement.classList.contains("remove-item")) {
        removeItem(e.target.parentElement.parentElement)
    }else{
       editMode(e.target);
    }
}
const editMode = (item) => {
    isEditMode = true;
    itemList.querySelectorAll("li").forEach((i)=>{
        i.classList.remove("edit-mode");
    })
    item.classList.add("edit-mode");
    const text = item.textContent;
    itemInput.value = text;
    formBtn.innerHTML ='<i class ="fa-solid fa-pen"></i> Update Item'
    formBtn.style.backgroundColor = "green"

}
 const removeItem = (item) => {
   
        if(confirm("Are you sure?")) {
            item.remove();
            removeItemFromStorage(item);
        }
        

       checkUI();
}
 function removeItemFromStorage(item) {
    itemsFromStorage = getItemsFromStorage();
    const text = item.firstChild.textContent.toLowerCase();
    const newitem =  itemsFromStorage.filter(i => 
     i.toLowerCase() !== text )
     localStorage.setItem('items',JSON.stringify(newitem));
 }

const clearItems = () => {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
        checkUI();
    }
    localStorage.removeItem("items")
}

function filterItem(e) {
        const text = e.target.value.toLowerCase();
        const items = itemList.querySelectorAll("li");
        
        items.forEach((item) => {
            const itemText = item.firstChild.textContent.toLowerCase();
    
            if (itemText.includes(text)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    }
    
    

function checkUI() {
    
    const items = itemList.querySelectorAll("li")
    if (items.length === 0) {
        document.getElementById("clear").style.display = "none"
        document.getElementById("filter").style.display = "none"
    }
    else{
        document.getElementById("clear").style.display = "block"
        document.getElementById("filter").style.display = "block"
    }
    
        formBtn.style.backgroundColor = "#333"
        formBtn.innerHTML = '<i class ="fa-solid fa-plus"></i> Add Item'
}

function init(){

    itemList.addEventListener("click",onClickItem);
    itemForm.addEventListener("submit",addItem);
    clearBtn.addEventListener("click",clearItems);
    filter.addEventListener("input",filterItem)
    document.addEventListener("DOMContentLoaded",displayItems)




}
checkUI();
init();



