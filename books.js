const titleField = document.querySelector("#bookTitle");
const authorField = document.querySelector("#bookAuthor");
const pagesField = document.querySelector("#bookPages");
const bookCase = document.getElementById("bookcase");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const newBookButton = document.querySelector("#newbook");
let title = titleField.value;
let author = authorField.value;
let pages = pagesField.value;
let haveRead = "have read";
let library = [];
let deleteArray = [];
let haveReadContainer;
let bookCovers = [];
let toggleButtons = [];
let readStatus;

class Book {
        constructor(title, author, pages, haveRead) {
        this.title = title;   
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;               
        }

        info() {
                return `"${this.title}" by ${this.author}, ${this.pages} pages, `;
        };

        wrapperFunction() {
                addBookToLibrary(this);
        }
}

// Test Books: 
//const book1 = new Book("Harry Potter and the Philosopher's Stone", "JK Rowling", 223, "have read");
//const book2 = new Book("Never Let Me Go", "Kazuo Ishiguro", 288, "have not read");
//const book3 = new Book("War and Peace", "Leo Tolstoy", 1255, "have not read");

titleField.oninput = () => {
	title = titleField.value;
	return title;
};

authorField.oninput = () => {
	author = authorField.value;
	return author;
};

pagesField.oninput = () => {
	pages = pagesField.value;
	return pages;
};

yes.onclick = () => { 
	haveRead = "have read";
        return haveRead;
}

no.onclick = () => {
	haveRead = "have not read";
	return haveRead;
}

newBookButton.addEventListener("click", () => {
	let book = new Book(title, author, pages, haveRead);
        book.info = book.info();
        book.wrapperFunction(this);
        return book;
});

// NB: The book objects need to have unique values, or the data will not reload properly. So, three copies of one book and two copies of another - two distinct entities - will reload as just two books.

window.addEventListener("load", () => {
	if (window.localStorage.getItem('libraryObject')) {
	        library = JSON.parse(localStorage.getItem('libraryObject'));
	        library = Array.from(library);
                if (library.length > 0) {
                        readStatus = JSON.parse(localStorage.getItem("readStatus"));
                        readStatus = [...readStatus];                              
                        let i = 0;
                        library.forEach(book => {
                                book.haveRead = readStatus[i];
                                i++;
                                displayBook(book);
                        });
                        return library;
                }
	}
	else return;
});

function populateStorage() {
        localStorage.setItem('libraryObject', JSON.stringify(library));         
        readStatus = [];
        for (let i = 0; i < bookCovers.length; i++) {
                readStatus[i] = bookCovers[i].haveRead;
        }  
        localStorage.setItem("readStatus", JSON.stringify(readStatus));           
}

function addBookToLibrary(book) {
        library.push(book);  
        displayBook(book); 
        populateStorage();
        return library;  
}

function createDeleteButton() {
        const deleteButton = document.createElement("button");
        const X = document.createTextNode("X");
        deleteButton.className = "delete";
        deleteArray.push(deleteButton);
        deleteButton.appendChild(X);
        return deleteButton;
}
 
function createToggleButton() {
       const toggleButton = document.createElement("input");      
       toggleButton.setAttribute("type", "checkbox");      
       toggleButton.className = "toggle";      
       toggleButtons.push(toggleButton);  
       return toggleButton; 
}

function createToggleLabel() {
        const toggleLabel = document.createElement("label");
        toggleLabel.textContent = "Read?";
        toggleLabel.className = "toggleLabel";
        return toggleLabel;
}

function displayBook(book) {
       const bookCover = document.createElement("div");           
       bookCover.appendChild(createToggleLabel());
       bookCover.appendChild(createToggleButton()); 
       bookCover.appendChild(createDeleteButton());
       bookCover.className = "book-cover";
       bookCover.id = book.title;
       bookCover.haveRead = book.haveRead;
       let coverContent = document.createTextNode(book.info);
       haveReadContainer = document.createTextNode(bookCover.haveRead);
       bookCover.appendChild(coverContent);
       bookCover.appendChild(haveReadContainer);
       bookCovers.push(bookCover);
       bookCase.appendChild(bookCover);
       getDeleteArray();
       createToggleButtons();                 
}

function createToggleButtons() {
toggleButtons = Array.from(document.getElementsByClassName("toggle"));
toggleButtons.forEach(toggleButton => {
        toggleButton.classList.add("hasHandler");
        if (toggleButton.className.includes("hasHandler")) {
                toggleButton.removeEventListener("input", changeReadStatus);
        }
        toggleButton.addEventListener("input", changeReadStatus);
        });
}

function changeReadStatus (e) {
        const bookCover = bookCovers.find(cover => cover == e.target.parentElement);
        if (bookCover.haveRead == "have not read") {
                bookCover.haveRead = "have read";
        }                     
        else bookCover.haveRead = "have not read";       
        haveReadContainer = bookCover.childNodes[4];
        bookCover.removeChild(haveReadContainer);
        haveReadContainer = document.createTextNode(bookCover.haveRead);
        bookCover.appendChild(haveReadContainer);       
        localStorage.clear();
        populateStorage();              
}

function getDeleteArray() {
        deleteArray = [...document.getElementsByClassName("delete")];
        deleteArray.forEach(deleteButton => {
                deleteButton.addEventListener("click", (e) => {
                        outer: for (let i = 0; i < library.length; i++) {
                                if (library[i].title == e.target.parentElement.id) {
                                        let index = library.indexOf(library[i]);
                                        library.splice(index, 1);
                                        break outer;
                                }         
                        }                               
                        localStorage.clear();
                        populateStorage();  
                        e.target.parentElement.remove();                        
                        createToggleButtons();                                             
                });
        });       
        return deleteArray;
}

createToggleButtons();
