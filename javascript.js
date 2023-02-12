const mainContainer = document.getElementById('mainContainer');
const bookContainer = document.getElementById('bookContainer');
const submitBtn = document.getElementById('submitBtn');
const inputItem = document.getElementsByClassName('inputItem');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementsByClassName('read');

const formBox = document.getElementsByClassName('formBox');

const validate = document.getElementById('validate');
const validateMessage = document.getElementById('validateMessage');

const addBtn = document.getElementById('addBtn');
const formContainer = document.getElementById('formContainer');

let readBtn;

let bookArray = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = read;

    return this;
}

function addBookToLibrary() {
    let radioValue = '';
    for (i = 0; i < read.length; i++) {
        let e = read[i];
        if (e.checked === true) {
            radioValue = e.value;
        }
    }
    let book = new Book(title.value, author.value, pages.value, radioValue);
    bookArray.push(book);
    
}

function showBooks() {
    let newBook = document.createElement('div');

    let book = bookArray[bookArray.length - 1];
    
    for (const props in book) {
        let eName = document.createElement('p');
        let e = document.createElement('p');

        eName.textContent = props.toUpperCase();
        e.textContent = book[props];

        newBook.appendChild(eName);
        newBook.appendChild(e);
    }

    let bookBtn = document.createElement('button');
    bookBtn.type = 'button';
    bookBtn.textContent = 'Delete';
    bookBtn.addEventListener('click', deleteSelf);

    readBtn = document.createElement('button');
    readBtn.type = 'button';
    readBtn.textContent = 'Toggle Read';
    readBtn.addEventListener('click', readBook);

    let btnDiv = document.createElement('div');
    btnDiv.appendChild(readBtn);
    btnDiv.appendChild(bookBtn);
    newBook.appendChild(btnDiv);

    newBook.className = 'book';
    newBook.id = bookArray.length - 1;
    bookContainer.appendChild(newBook);
}

function clearInput() {
    for (i = 0; i < inputItem.length; i++) {
        inputItem[i].value = "";
    }
}

function deleteSelf() {
    let indexValue = this.parentElement.parentElement.id;
    console.log(bookArray);
    console.log(bookContainer.childNodes);
    bookArray.splice(indexValue, 1);
    this.parentElement.parentElement.parentElement.childNodes.forEach((e) => {
        if (e.id === indexValue){
            e.remove();
        }
    })
    let count = 0;
    bookContainer.childNodes.forEach((n) => {
        n.id = count;
        count++;
    })
    console.log("AFTER");
    console.log(bookArray);
    console.log(bookContainer.childNodes);
}

function validateInput(){
    validateMessage.textContent = "Missing ";
    for (i = 0; i < inputItem.length; i++) {
        let e = inputItem[i];
        if (e.value === "") {
            e.style.border = '2px solid red';
            validate.style.visibility = 'visible';
            validateMessage.textContent += e.id + "!";
            return false;
        } else {
            e.style.border = "1px solid black";
        }
    }
    validate.style.visibility = 'hidden';
    return true;
}

function readBook() {
    let indexValue = this.parentElement.parentElement.id;
    if (bookArray[indexValue].status === "Unread") {
        bookArray[indexValue].status = "Read";
        bookContainer.childNodes[indexValue].childNodes[7].textContent = bookArray[indexValue].status;
    } else {
        bookArray[indexValue].status = "Unread";
        bookContainer.childNodes[indexValue].childNodes[7].textContent = bookArray[indexValue].status;
    }
}


submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    let submit = validateInput();
    if (submit) {
        addBookToLibrary();
        showBooks();
        clearInput();
    }
    
})

//OPEN SIDEBAR


addBtn.addEventListener('click', function(){
    if (formContainer.style.visibility === 'visible') {
        this.textContent = 'ADD BOOK +';
        mainContainer.style.gridTemplateColumns = "3fr";
        formContainer.style.visibility = 'hidden';
    } else {
        this.textContent = "ADD BOOK -";
        mainContainer.style.gridTemplateColumns = "3fr 1fr";
        formContainer.style.visibility = 'visible';
    }
    
})
