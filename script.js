// Get Books

const table = document.querySelector("tbody");

function getBooks() {
  table.innerHTML = "";
  const books = JSON.parse(localStorage.getItem("books"));
  books.forEach((book) => {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = book.author;

    const td2 = document.createElement("td");
    td2.textContent = book.title;

    tr.append(td1, td2);
    table.append(tr);
  });
}

getBooks();

// Generate Random Numbers

const n1 = Math.floor(Math.random() * 15 + 1);
const n2 = Math.floor(Math.random() * 15 + 1);

const label = document.querySelector("label[for=capcha]");
const input = document.querySelector("input#capcha");

label.textContent = `${n1} + ${n2} = ?`;
input.placeholder = `${n1} + ${n2} = `;

// Form Input

const notification = document.querySelector(".notification");

let arr = [];
if (localStorage.getItem("books")) {
  arr = JSON.parse(localStorage.getItem("books"));
}

document.forms.add.addEventListener("submit", (event) => {
  event.preventDefault();

  const author = event.target.elements.author.value.trim();
  const title = event.target.elements.title.value.trim();
  const capcha = Number(event.target.elements.capcha.value.trim());
  const capchaAnswer = n1 + n2;

  if (author.length > 3 && title.length > 3 && capchaAnswer === capcha) {
    const book = {
      author: author,
      title: title,
    };

    arr.push(book);

    localStorage.setItem("books", JSON.stringify(arr));
    getBooks();

    event.target.elements.author.value = "";
    event.target.elements.title.value = "";
    notification.textContent = "You have successfully added a book";
    notification.style.display = "block";
  } else {
    notification.textContent = "You have an error on the form";
    notification.style.display = "block";
  }
});
