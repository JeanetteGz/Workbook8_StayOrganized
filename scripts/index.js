function addStickyNote() {
    const container = document.getElementById('sticky-container');
    const newNote = document.createElement('li');
    newNote.innerHTML = `
        <div class="rotate-1 lazur-bg">
            <small>${getCurrentTime()}</small>
            <h4 contenteditable="true">New Sticky Note</h4>
            <p contenteditable="true">This is a new sticky note added dynamically.</p>
            <a href="#" class="text-danger pull-right" onclick="deleteNote(this)"><i class="fa fa-trash-o "></i></a>
            <a href="#" class="text-info pull-right" onclick="editNoteContent(this)"><i class="fa fa-edit"></i></a>
        </div>
    `;
    container.appendChild(newNote);
}

function deleteNote(element) {
    const container = document.getElementById('sticky-container');
    container.removeChild(element.parentElement.parentElement);
}

function editNoteContent(element) {
    const noteDiv = element.parentElement;
    const titleElement = noteDiv.querySelector('h4');
    const contentElement = noteDiv.querySelector('p');

    // Save the current content before editing
    const previousTitle = titleElement.innerText;
    const previousContent = contentElement.innerText;

    // Enable content editing
    titleElement.contentEditable = true;
    contentElement.contentEditable = true;

    // Focus on the title element
    titleElement.focus();

    // Change the edit button to a save button
    element.innerHTML = '<i class="fa fa-save"></i>';
    element.classList.remove('text-info');
    element.classList.add('text-success');
    element.onclick = function () {
        // Save the edited content
        titleElement.contentEditable = false;
        contentElement.contentEditable = false;

        // Change the button back to edit
        element.innerHTML = '<i class="fa fa-edit"></i>';
        element.classList.remove('text-success');
        element.classList.add('text-info');
        element.onclick = function () {
            editNoteContent(element);
        };
    };
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    const date = now.toISOString().split('T')[0];
    return `${formattedTime} ${date}`;
}