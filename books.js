let titleField = document.querySelector("#bookTitle");
let authorField = document.querySelector("#bookAuthor");
let pagesField = document.querySelector("#bookPages");
let title = titleField.value;
let author = authorField.value;
let pages = pagesField.value;
let haveRead = "have read";
let button = document.querySelector("button");
let library = [];

//const book1 = new Book("Harry Potter and the Philosopher's Stone", "JK Rowling", 223, "have read");
//const book2 = new Book("Never Let Me Go", "Kazuo Ishiguro", 288, "unfinished");
//const book3 = new Book("War and Peace", "Leo Tolstoy", 1255, "have not read");

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
let yes = document.getElementById("yes");
let no = document.getElementById("no");
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
            return `${title} by ${author}, ${pages} pages, ${haveRead}.`
    }       
    console.log(this.info());
    addBookToLibrary(this);
}

function addBookToLibrary(book) {
  library.push(book);
}