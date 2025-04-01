const titleEl = document.getElementById("title_el");
const text_el = document.getElementById("text_el");
const add_btn = document.getElementById("add_btn");
console.log(titleEl, text_el, add_btn);

add_btn.addEventListener("click", () => {
  render();
});

titleEl.addEventListener("input", (event) => {
  enableOrDisableSubmit(event);
});
text_el.addEventListener("input", (event) => {
  enableOrDisableSubmit(event);
});

// This function will enable or disable the submit button
function enableOrDisableSubmit(event) {
  if (titleEl.value && text_el.value) {
    add_btn.disabled = false;
  } else {
    add_btn.disabled = true;
  }
}

function render() {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = `
        <h2>${titleEl.value}</h2>
        <p>${text_el.value}</p>
        <button class="delete_btn">Delete</button>
        <button class="edit_btn">Edit</button>
    `;

  const container = document.getElementById("notes_container"); // Ensure this container exists in your HTML
  container.appendChild(newCard);

  const deleteBtn = newCard.querySelector(".delete_btn");
  const editBtn = newCard.querySelector(".edit_btn");

  deleteBtn.addEventListener("click", () => {
    deleteCard(newCard); // Pass the card to be deleted
  });
  editBtn.addEventListener("click", () => {
    editCard(newCard); // Pass the card to be edited
  });

  resetValuesAfterSubmit();
}

function resetValuesAfterSubmit() {
  titleEl.value = "";
  text_el.value = "";
  add_btn.disabled = true;
}

function deleteCard(card) {
  card.remove(); // Properly remove the card
}

function editCard(card) {
  const title = card.querySelector("h2").textContent;
  const text = card.querySelector("p").textContent;
  titleEl.value = title;
  text_el.value = text;
  add_btn.disabled = false;
  deleteCard(card); // Remove the card to be edited
  card.querySelector("h2").textContent = titleEl.value;
  card.querySelector("p").textContent = text_el.value;
}
