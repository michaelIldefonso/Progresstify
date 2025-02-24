document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('kanban-board');
    const addColumnButton = document.getElementById('add-column');
    const trashCan = document.getElementById('trash-can');
    let draggedCard = null;

    // Function to add a new column
    function addColumn() {
        const column = document.createElement('div');
        column.classList.add('kanban-column');
        column.draggable = true;

        const title = document.createElement('input');
        title.type = 'text';
        title.value = 'New Column';
        title.classList.add('column-title');
        title.addEventListener('dblclick', () => title.select());

        const addCardButton = document.createElement('div');
        addCardButton.classList.add('add-card');
        addCardButton.textContent = '+ Add Card';
        addCardButton.addEventListener('click', () => addCard(column, addCardButton));

        column.appendChild(title);
        column.appendChild(addCardButton);
        board.appendChild(column);

        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', drop);
    }

    // Function to add a card to a column
    function addCard(column, addCardButton) {
        const existingInput = column.querySelector('.task-input');
        if (existingInput) return; // Prevent multiple inputs

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter task... (Press Enter to add, Esc to cancel)';
        input.className = 'task-input';

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim() !== '') {
                const newCard = document.createElement('div');
                newCard.className = 'kanban-card';
                newCard.textContent = input.value;
                newCard.draggable = true;

                newCard.addEventListener('dragstart', dragStart);
                column.insertBefore(newCard, addCardButton);
                input.remove();
            } else if (e.key === 'Escape') {
                input.remove();
            }
        });

        column.insertBefore(input, addCardButton);
        input.focus();
    }

    // Drag & Drop Logic
    function dragStart(e) {
        draggedCard = this;
        setTimeout(() => this.style.display = 'none', 0);
    }

    function dragOver(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    }

    function dragLeave() {
        this.classList.remove('drag-over');
    }

    function drop() {
        this.classList.remove('drag-over');
        this.appendChild(draggedCard);
        draggedCard.style.display = 'block';
        draggedCard = null;
    }

    // Trash Can Logic
    trashCan.addEventListener('dragover', (e) => {
        e.preventDefault();
        trashCan.classList.add('drag-over');
    });

    trashCan.addEventListener('dragleave', () => {
        trashCan.classList.remove('drag-over');
    });

    trashCan.addEventListener('drop', () => {
        if (draggedCard) {
            draggedCard.remove();
            draggedCard = null;
        }
        trashCan.classList.remove('drag-over');
    });

    addColumnButton.addEventListener('click', addColumn);
});
