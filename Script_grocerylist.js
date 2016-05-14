
    
            (function () {
           

                var btnAdd, btnRemove, ulGroceries, groceries = [];

                btnAdd = document.querySelector("#btnAddGrocery");

                btnRemove = document.querySelector("#btnRemoveGrocery");

                ulGroceries = document.querySelector("#ulGroceries");

                txtGrocery = document.querySelector("#txtGrocery");


                

                function addGrocery() {

                    var groceryName =  txtGrocery.value.toLowerCase();;

                    var validationMessage = checkGrocery(groceryName);

                    if (validationMessage) {

                        messagePrinter(validationMessage);
                    }

                    else {

                        txtGrocery.value = '';



                        createGroceryMarkup(groceryName);


                        preserveState();


                    }

                }

                function removeGrocery() {

                    var checkRadio = document.querySelector("input[type=radio][name=grocery]:checked");

                    if (!checkRadio) {

                        messagePrinter("Please select item before you remove it.");




                    }
                    else {

                        checkRadio.parentElement.parentElement.remove();
                        preserveState();

                    }

                }





                function checkGrocery(groceryName) {

                    var retVal = "";

                    if (!groceryName) {

                        retVal = "No value entered";


                    }

                    else {

                        var radioExists = document.querySelector("input[type=radio][value='" + groceryName + "']");

                        if (radioExists) {

                            retVal = "Value already exists ";



                        }
                    }

                    return retVal;
                }

                function createGroceryMarkup(groceryName) {

                    var liGrocery = document.createElement('li');
                     liGrocery.innerHTML = "<label><input type='radio' name='grocery' value='" + groceryName + "'>" + groceryName + "</label>";
                    ulGroceries.appendChild(liGrocery);

                }

                function messagePrinter(message) {
                    alert(message);

                }

                function preserveState() {
                    var allRadios, groceries = [];

                    allRadios = document.querySelectorAll("input[type=radio][name=grocery]");

                    for (var prop in allRadios) {

                        if (allRadios.hasOwnProperty(prop)) {

                            groceries.push(allRadios[prop].value);

                        }



                    }

                    window.localStorage.setItem("groceries", JSON.stringify(groceries));

                }


                function loadState() {
                    var groceries = JSON.parse(window.localStorage.getItem("groceries"));

                    for (var prop in groceries) {

                        if (groceries.hasOwnProperty(prop)) {

                            createGroceryMarkup(groceries[prop]);

                        }
                    }

                }


                //attach events here
                btnAdd.addEventListener("click", addGrocery);

                btnRemove.addEventListener("click", removeGrocery);


                //call any init code

                loadState();



            })();