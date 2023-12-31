console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  // notes= [{"title":"Amisha","text":"I am amisha"},{"title":"notes","text":"I am notes"}]
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  // the JSON string represents a simple object with properties "title" and "content".
  // After using JSON.parse(), the variable parsedNotes now holds a JavaScript object with
  // the same properties, and you can access its values using dot notation.
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
      <div id="noteContainer_${index}" class="note_container" style="background-color: ${element.isImportant ? '#B22222' : '#030f38'};  margin-left: 10px; margin-bottom:10px;">
        <div class="card_container">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
          <button id="${index}" onclick="markAsImp(this.id)" class="btn btn-primary" style="background-color: ${
      element.isImportant ? '#030f38' : '#030f38'}">
            &#9733;
          </button>
        </div>
      </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;

  }
}
// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

function markAsImp(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj[index].isImportant = !notesObj[index].isImportant;
  localStorage.setItem("notes", JSON.stringify(notesObj));

  // let noteContainer = document.getElementById("noteContainer_" + index);
  // let button = document.getElementById(index);

  // if (notesObj[index].isImportant) {
  //   noteContainer.style.backgroundColor = "#030f38";
  //   button.style.backgroundColor = "rgb(233, 101, 13)";
  // } else {
  //   noteContainer.style.backgroundColor = "";
  //   button.style.backgroundColor = "";
  // }
}






