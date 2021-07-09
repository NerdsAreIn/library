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

// Test Books: 
//const book1 = new Book("Harry Potter and the Philosopher's Stone", "JK Rowling", 223, "have read");
//const book2 = new Book("Never Let Me Go", "Kazuo Ishiguro", 288, "have not read");
//const book3 = new Book("War and Peace", "Leo Tolstoy", 1255, "have not read");


titleField.oninput = () => {
	title = titleField.value;
	console.log({title});
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
        return book;
});

window.addEventListener("load", () => {
        if (library) {
                library = JSON.parse(localStorage.getItem('libraryObject'));
                library = Array.from(library);
                readStatus = JSON.parse(localStorage.getItem("readStatus"));
                readStatus = [...readStatus];                
                let i = 0;
                library.forEach(book => {
                        book.haveRead = readStatus[i];
                        i++;
                        book.info = function() {
                                return "'" + book.title + "', " + book.author + ", " + book.pages + ", ";
                        };
                        displayBook(book);
                });
                return library;
        }
        else return;
});

function populateStorage() {
        console.log({library});
        localStorage.setItem('libraryObject', JSON.stringify(library));
        readStatus = [];
        for (let i = 0; i < bookCovers.length; i++) {
                readStatus[i] = bookCovers[i].haveRead;
        }   
        localStorage.setItem("readStatus", JSON.stringify(readStatus));           
}

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
        displayBook(book); 
        populateStorage();
        return library;  
}

function displayBook(book) {
       const bookCover = document.createElement("div");
       const deleteButton = document.createElement("button");
       const X = document.createTextNode("X");
       const toggleButton = document.createElement("input");
       const toggleLabel = document.createElement("label");
       toggleLabel.textContent = "Read?";
       toggleButton.setAttribute("type", "checkbox");
       toggleLabel.className = "toggleLabel";
       toggleButton.className = "toggle";
       deleteButton.className = "delete";
       toggleButtons.push(toggleButton);
       deleteArray.push(deleteButton);
       deleteButton.appendChild(X);
       bookCover.appendChild(toggleLabel);
       bookCover.appendChild(toggleButton); 
       bookCover.appendChild(deleteButton);
       bookCover.className = "book-cover";
       bookCover.id = book.title;
       let coverContent = document.createTextNode(book.info());
       haveReadContainer = document.createTextNode(book.haveRead);
       bookCover.appendChild(coverContent);
       bookCover.appendChild(haveReadContainer);
       bookCovers.push(bookCover);
       bookcase.appendChild(bookCover);
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
        bookCover = bookCovers.find(cover => cover == e.target.parentElement);
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