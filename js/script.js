var fieldName = document.getElementById('Pname');
var fieldProductionDate = document.getElementById('Pdate');
var fieldExpiredDate = document.getElementById('Exdate');
var fieldQuantity = document.getElementById('quan');

// fieldName.onclick = function(){
//     fieldName.style.border = "none";
// }
// errors message 
var msg1 = document.getElementById('PnameMsg');
var msg2 = document.getElementById('PDateMsg');
var msg3 = document.getElementById('exDateMsg');
var msg4 = document.getElementById('QuanMsg');

var flag1 = false;
var flag2 = false;
var flag3 = false;
var flag4 = false;
//  validation

fieldName.onblur = function(){
    try{
        CategoryValidate(fieldName.value);
        msg1.textContent = "";
        flag1 = true;
    } catch(e){
        console.log(e);
        msg1.textContent = e.message;
        msg1.style = 'color:red';
        flag1 = false;
    }
}

fieldProductionDate.onblur = function(){
    try{
        productionValidate(fieldProductionDate.value);
        msg2.textContent = "";
        flag2 = true;
    } catch(e){
        console.log(e);
        msg2.textContent = e.message;
        msg2.style = 'color:red';
        flag2 = false;
    }
}

fieldExpiredDate.onblur = function(){
    try{
        ExpiredValidate(fieldExpiredDate.value);
        msg3.textContent = "";
        flag3 = true;
    } catch(e){
        console.log(e);
        msg3.textContent = e.message;
        msg3.style = 'color:red';
        flag3 = false;
    }
}

fieldQuantity.onblur = function(){
    try{
        QuantityValidate(fieldQuantity.value);
        msg4.textContent = "";
        flag4 = true;
    } catch(e){
        console.log(e);
        msg4.textContent = e.message;
        msg4.style = 'color:red';
        flag4 = false;
    }
}

//  category
function CategoryValidate(val){
    if(val != ""){
        return true;
    } else{
        var error = new TypeError("Category should not be empty");
        throw error;
    }
}
//  production date
function productionValidate(val){
    if(val != ""){
        return true;
    } else{
        var error = new TypeError("Production date should be selected");
        throw error;
    }
}
//  expired date
function ExpiredValidate(val){
    if(val != ""){
        return true;

    } else{
        var error = new TypeError("Expired date should be selected");
        throw error;
    }
}
// quantity
function QuantityValidate(val){
    if(val != ""){
        if(/^([1-9]|[1-9]\d+)$/.test(val)){
            return true;
        } else{
            var error = new TypeError("Quantity should be a number");
            throw error;
        }
    } else{
        var error = new TypeError("Quantity should not be empty");
        throw error;
    }
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getFirestore, addDoc, getDoc,doc, collection, onSnapshot,updateDoc , deleteDoc} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAB-d0sgRvWaRKZhe7USpCln16wXtyL5cI",
    authDomain: "medical-349d6.firebaseapp.com",
    projectId: "medical-349d6",
    storageBucket: "medical-349d6.appspot.com",
    messagingSenderId: "813481724777",
    appId: "1:813481724777:web:0ffe36dc7e0e2ed4a00bf8",
    measurementId: "G-3WQGZ55T01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


//  save data on fireSstore
// var SaveBtn = document.getElementById('btnSave');
// SaveBtn.disabled = true ;
// if(flag1&&flag2&&flag3&&flag4){
       
//     SaveBtn.disabled = false;
// } 
var btnSave = document.getElementById('btnSave');
var notSaveDiv = document.getElementById('notSaved');
var SaveDiv = document.getElementById('Saved');


window.SaveData = SaveData;
async function SaveData() {
    var productName = fieldName.value;
    var proDate = fieldProductionDate.value;
    var Exdate = fieldExpiredDate.value;
    var quan = fieldQuantity.value;

    var data = {
        Category: productName,
        productionDate: proDate,
        expiredDate: Exdate,
        Quantity: quan
    }
   
    try {
        if(flag1&&flag2&&flag3&&flag4){
            const result = await addDoc(collection(db, "products"), data);
            console.log(result.id); 
            SaveDiv.style.transform = "translate(0,50%)";
            SaveDiv.style.transitionDuration = "1s";
            setTimeout(() => {
                SaveDiv.style.transform = "translate(0,-200%)";
            }, 3000);
        } else{
            // SaveBtn.disabled = false ;
            console.log('not save');
            console.log(btnSave);
            notSaveDiv.style.transform = "translate(0,50%)";
            notSaveDiv.style.transitionDuration = "1s";
            setTimeout(() => {
                notSaveDiv.style.transform = "translate(0,-200%)";
            }, 3000);
            var error = new TypeError("Fields is empty");
            throw error;
        }  
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    console.log(fieldName.value);
    console.log(fieldProductionDate.value);
    console.log(fieldExpiredDate.value);
    console.log(fieldQuantity.value);
    clear();
}

//  get data
var body = document.getElementById('tableBody');

onSnapshot(collection(db, "products"), (snapshot) => {
    body.innerHTML = "";
    var row = "";
    for (let item of snapshot.docs) {
        // console.log(item.id)
        var details = item.data();
        // console.log(item.data())
        row += `<tr>
                <td>${details.Category}</td>
                <td>${details.productionDate}</td>
                <td>${details.expiredDate}</td>
                <td>${details.Quantity}</td>
                <td><button type="button" class="btn btn-success tableBTN" id="updateBTN" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" onclick="Update('${item.id}')">Update</button></td>
                <td><button type="button" class="btn btn-danger tableBTN" onclick="Delete('${item.id}')">Delete</button></td>
                <td><button type="button" class="btn btn-danger tableBTN" data-bs-toggle="modal" data-bs-target="#exampleModalCenterQuan" onclick="UpdateQuantity('${item.id}')">Change Quantity</button></td>
            </tr>`;
        body.innerHTML = row;
    }
    
});

//  get fields of modal
var modalName = document.getElementById('Modalname');
var modalPdate = document.getElementById('ModalPdate');
var modalEXdate = document.getElementById('ModalExdate');
var modalQuan = document.getElementById('Modalquan');
//  update data
window.Update = Update; 

async function Update(Pid){
    var Result = await getDoc(doc(db,"products",Pid));
    var data = Result.data();
    // console.log(data);
    modalName.value = data.Category;
    modalPdate.value = data.productionDate;
    modalEXdate.value = data.expiredDate;
    modalQuan.value = data.Quantity;

    //  update data on fireStore

    window.upDateData = upDateData;

    function upDateData(){
        var fieldModalName = modalName.value;
        var fieldModalProductionDate = modalPdate.value;
        var fieldModalEXdate = modalEXdate.value;
        var fieldModalQuan = modalQuan.value;
    
        var data = {
            Category: fieldModalName,
            productionDate: fieldModalProductionDate,
            expiredDate: fieldModalEXdate,
            Quantity: fieldModalQuan
        }
        var result = updateDoc(doc(db,"products",Pid),data)
        console.log(result);
    }
}

window.Delete = Delete;
async function Delete(Pid){
    var result = await deleteDoc(doc(db, "products", Pid));
    console.log(result)
}

//  upDATE Quantity
var ModalQuan = document.getElementById('TotalQuan');
var usedQuan = document.getElementById('usedQuan');
var remaiingQuan = document.getElementById('remaiingQuan');
window.UpdateQuantity = UpdateQuantity;
async function UpdateQuantity(Pid){
    var Result = await getDoc(doc(db,"products",Pid));
    var data = Result.data();
    ModalQuan.value = data.Quantity;
    
    remaiingQuan.value = "";
    usedQuan.value="";
    window.sub = sub;
   function sub(){
        remaiingQuan.value = ModalQuan.value - usedQuan.value; 
        var remainingQuantity = remaiingQuan.value;
         // var remaiingQuan = ModalQuan - usedQuan.value; 
        // var remainingQuantity = remaiingQuan;
        // console.log(remainingQuantity);
        var data = {        
            Quantity: remainingQuantity,
        }       
        try{
            var results = updateDoc(doc(db,"products",Pid),data);
        } catch(e){
            console.log(e);
        }
        console.log(results)
   }
}
//  clear fields after save data
function clear() {
    fieldName.value = "";
    fieldProductionDate.value = "";
    fieldExpiredDate.value = "";
    fieldQuantity.value = "";
}
// var btn = document.getElementById('btn');
// btn.onclick = SaveData;
