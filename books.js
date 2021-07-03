const titleField = document.querySelector("#bookTitle");
const authorField = document.querySelector("#bookAuthor");
const pagesField = document.querySelector("#bookPages");
const bookCase = document.getElementById("bookcase");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const button = document.querySelector("#newbook");
let title = titleField.value;
let author = authorField.value;
let pages = pagesField.value;
let haveRead = "have read";
let library = [];
let deleteArray = [];
let bookCover;
let haveReadContainer;
let haveReadContainers = [];
let bookCovers = [];
let toggleButtons = [];

const book1 = new Book("Harry Potter and the Philosopher's Stone", "JK Rowling", 223, "have read");
const book2 = new Book("Never Let Me Go", "Kazuo Ishiguro", 288, "have not read");
const book3 = new Book("War and Peace", "Leo Tolstoy", 1255, "have not read");


titleField.oninput = () => {
	title = titleField.value;
	console.log({title});
        return title;
};

authorField.oninput = () => {
	author = authorField.value;
	console.log({author});
        return author;
};

pagesField.oninput = () => {
	pages = pagesField.value;
	console.log({pages});
        return pages;
};

yes.onclick = () => { 
	haveRead = "have read";
        console.log({haveRead});
        return haveRead;
}

no.onclick = () => {
	haveRead = "have not read";
	console.log({haveRead});
        return haveRead;
}

function createToggleButtons() {
toggleButtons = Array.from(document.getElementsByClassName("toggle"));
console.log({toggleButtons});
toggleButtons.forEach(toggleButton => {
    toggleButton.addEventListener("input", (e) => {
        bookCover = bookCovers.find(cover => cover == e.target.parentElement);
        console.log({bookCover});
        //console.log(e.target.parentElement);
        if (bookCover.haveRead == "have not read") {
                bookCover.haveRead = "have read";
        }                     
        else bookCover.haveRead = "have not read";        
        //console.log({bookCovers});
        //console.log(haveReadContainers);
        //bookCover.childNodes[3].nodeValue = haveRead;
        haveReadContainer = bookCover.childNodes[3];
        bookCover.removeChild(haveReadContainer);
        //haveReadContainer.nodeValue = haveRead;
        //Array.from(bookCover.childNodes).pop();
        //bookCover.removeChild(childNodes[3]);
        haveReadContainer = document.createTextNode(bookCover.haveRead);
        console.log({haveReadContainer});
        //console.log(haveReadContainer.nodeValue);
        bookCover.appendChild(haveReadContainer);
       
/*
// FIXME: the book swap is currently only working for the last item. Think I will try creating separate text nodes for the other deets and the read status.
        let bookToRemove = library.findIndex(book => e.target.parentElement.id == book.title);
        console.log({bookToRemove});
        library.splice(bookToRemove, 1);
        console.log(e.target.parentElement.haveRead);
        e.target.parentElement.remove();
        let newbook = new Book(e.target.parentElement.id, e.target.parentElement.author, e.target.parentElement.pages, e.target.parentElement.haveRead);
        //library[bookToRemove] = newbook;
        console.log({library});
        */
        });
    });
}

button.addEventListener("click", () => {
	let book = new Book(title, author, pages, haveRead);
        return book;
});

function Book(title, author, pages, haveRead) {
        this.title = title;   
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
        this.info = function() {
                return `"${title}" 
                by ${author},
                ${pages} pages, `
}
        addBookToLibrary(this);
}

function addBookToLibrary(book) {
        library.push(book);  
        console.log({library});
        displayBook(book); 
        return library;  
}

function displayBook(book) {
       bookCover = document.createElement("div");
       let deleteButton = document.createElement("button");
       let X = document.createTextNode("X");
       toggleButton = document.createElement("input");
       toggleButton.setAttribute("type", "checkbox"); 
       toggleButton.className = "toggle";
       deleteButton.className = "delete";
       toggleButtons.push(toggleButton);
       deleteArray.push(deleteButton);
       deleteButton.appendChild(X);
       bookCover.appendChild(toggleButton);
       bookCover.appendChild(deleteButton);
       bookCover.className = "book-cover";
       bookCover.id = book.title;
       bookCover.haveRead = book.haveRead;
       coverContent = document.createTextNode(book.info());
       haveReadContainer = document.createTextNode(bookCover.haveRead);
       //haveReadContainers.push(haveReadContainer);
       bookCover.appendChild(coverContent);
       bookCover.appendChild(haveReadContainer);
       bookCovers.push(bookCover);
       bookcase.appendChild(bookCover);
       getDeleteArray();
       createToggleButtons();                
}

function getDeleteArray() {
        deleteArray = [...document.getElementsByClassName("delete")];
        deleteArray.forEach(deleteButton => {
        deleteButton.addEventListener("click", (e) => {
               //console.log(e.target.parentElement.id);
               //console.log(e.target.parentElement);
               outer: for (let i = 0; i < library.length; i++) {
               if (library[i].title == e.target.parentElement.id) {
                  let index = library.indexOf(library[i]);
                  library.splice(index, 1);
                  console.log({library});
                  break outer;
                }         
               }                                   
               e.target.parentElement.remove();
               createToggleButtons();
               console.log({toggleButtons});
               console.log({deleteArray});           
        });
});       
        return deleteArray;
}


