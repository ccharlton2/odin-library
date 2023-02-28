const library = [];
const libraryContainer = document.querySelector(".library-container");

const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const pages = form.elements.pages.value;
  const hasRead = form.elements["has-read"].value === "on";

  const book = new Book(title, author, pages, hasRead);

  addBook(book);

  fetchLibrary();
});

const newBookButton = document.getElementById("new-book-button");
newBookButton.addEventListener("click", () => {
  bookForm.classList.toggle("hidden");
  newBookButton.classList.toggle("hidden");
});

fetchLibrary();

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.getInfo = function getInfo() {
    return `${title} by ${author}, ${
      pages === 1 ? `${pages} Page` : `${pages} Pages`
    }, ${
      hasRead ? "You have read this book." : "You haven't read this book yet."
    }`;
  };
}

Book.prototype.setRead = function () {
  if (this.hasRead) {
    this.hasRead = false;
  } else {
    this.hasRead = true;
  }
};

function addBook(book) {
  library.push(book);
}

function fetchLibrary() {
  libraryContainer.textContent = "";
  if (library) {
    for (let index = 0; index < library.length; index += 1) {
      const bookId = index;

      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      bookCard.setAttribute("id", bookId);

      const titleParagaph = document.createElement("p");
      titleParagaph.textContent = `Title: ${library[index].title}`;

      const authorParagaph = document.createElement("p");
      authorParagaph.textContent = `Author: ${library[index].author}`;

      const pagesParagaph = document.createElement("p");
      pagesParagaph.textContent = `Pages: ${library[index].pages}`;

      const readCheckboxLabel = document.createElement("label");
      readCheckboxLabel.textContent = "Read?";
      readCheckboxLabel.setAttribute("for", `checkbox-${bookId}`);

      const readCheckbox = document.createElement("input");
      readCheckbox.setAttribute("type", "checkbox");
      readCheckbox.setAttribute("id", `checkbox-${bookId}`);
      readCheckbox.checked = library[index].hasRead;

      readCheckbox.addEventListener("change", (e) => {
        library[bookId].setRead();

        fetchLibrary();
      });

      const removeBookButton = document.createElement("button");
      removeBookButton.classList.add("delete");
      removeBookButton.textContent = "Delete";
      removeBookButton.addEventListener("click", () => {
        library.splice(index, 1);
        fetchLibrary();
      });

      bookCard.appendChild(titleParagaph);
      bookCard.appendChild(authorParagaph);
      bookCard.appendChild(pagesParagaph);
      bookCard.appendChild(readCheckboxLabel);
      bookCard.appendChild(readCheckbox);
      bookCard.appendChild(removeBookButton);

      libraryContainer.appendChild(bookCard);
    }
  }
}
