let title = titleinput.value;
let author = authorinput.value;

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

const book1 = new Book("Harry Potter and the Philosopher's Stone", "JK Rowling", 223, "have read");
const book2 = new Book("Never Let Me Go", "Kazuo Ishiguro", 288, "unfinished");
const book3 = new Book("War and Peace", "Leo Tolstoy", 1255, "have not read");



function addBookToLibrary(book) {
  library.push(book);
}