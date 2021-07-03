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

//TODO: the below function works. The problem was executing it upon the creation of every new book. The checkboxes which had an even number of event listeners attached to them weren't working (I suppose because these were cancelling each other out). The toggle function is now working with the static collection of books. Now I need to adapt it for when new books are added.

function createToggleButtons() {
toggleButtons = Array.from(document.getElementsByClassName("toggle"));
console.log({toggleButtons});
toggleButtons.forEach(toggleButton => {
    toggleButton.classList.add("hasHandler");
    if (toggleButton.className.includes("hasHandler")) {
        toggleButton.removeEventListener("input", changeReadStatus);
    }
    toggleButton.addEventListener("input", changeReadStatus);
    });
}

function changeReadStatus (e) {
        bookCover = bookCovers.find(cover => cover == e.target.parentElement);
        if (bookCover.haveRead == "have not read") {
                bookCover.haveRead = "have read";
        }                     
        else bookCover.haveRead = "have not read";        
        haveReadContainer = bookCover.childNodes[3];
        bookCover.removeChild(haveReadContainer);
        haveReadContainer = document.createTextNode(bookCover.haveRead);
        console.log({haveReadContainer});
        bookCover.appendChild(haveReadContainer);
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
       bookCover.appendChild(coverContent);
       bookCover.appendChild(haveReadContainer);
       bookCovers.push(bookCover);
       bookcase.appendChild(bookCover);
       getDeleteArray();
       createToggleButtons();  
       //return bookCovers;              
}

createToggleButtons();

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
               //let index = bookCovers.findIndex(cover => cover == e.target.parentElement);
               //console.log({index});
              // bookCovers.splice(index, 1);
               e.target.parentElement.remove();
              // console.log({bookCovers});
               createToggleButtons();
               console.log({toggleButtons});
               console.log({deleteArray});
               //return bookCovers;           
        });
});       
        return deleteArray;
}


