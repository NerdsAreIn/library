const titleField = document.querySelector("#bookTitle");
const authorField = document.querySelector("#bookAuthor");
const pagesField = document.querySelector("#bookPages");
const bookCase = document.getElementById("bookcase");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
let title = titleField.value;
let author = authorField.value;
let pages = pagesField.value;
let haveRead = "have read";
let button = document.querySelector("button");
let library = [];

const book1 = new Book("Harry Potter and the Philosopher's Stone", "JK Rowling", 223, "have read");
const book2 = new Book("Never Let Me Go", "Kazuo Ishiguro", 288, "unfinished");
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
                ${pages} pages, 
                ${haveRead}.`
        }       
        console.log(this.info());
        addBookToLibrary(this);
}

function addBookToLibrary(book) {
        library.push(book);  
        console.log({library});
        displayBook(book);   
}

function displayBook(book) {
       let bookCover = document.createElement("div");
       bookCover.className = "book-cover";
       bookCover.id = book.title;
       let coverContent = document.createTextNode(book.info());
       bookCover.appendChild(coverContent);
       bookcase.appendChild(bookCover);
}

let deleteArray = [...document.getElementsByClassName("delete")];
console.log({deleteArray});

deleteArray.forEach(deleteButton => {
        deleteButton.addEventListener("click", () => {
                for (let i = 0; i < library.length; i++) {
                if (deleteButton.parentElement.id == library[i].title) {
                library -= library[i];}
                }
        });
});
