document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('commandForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const command = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            answer: document.getElementById('answer').value,
        };
        addCommand(command);
    });

    document.getElementById('removeCommands').addEventListener('click', function() {
        removeCommands();
    });

    loadCommands();
});

function addCommand(command) {
    fetch('/commands', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(command),
    }).then(() => {
        loadCommands(); // Reload commands list
    });
}

function removeCommands() {
    fetch('/commands', {
        method: 'DELETE',
    }).then(() => {
        loadCommands(); // Reload commands list
    });
}

function loadCommands() {
    fetch('/commands').then(response => response.json()).then(commands => {
        const list = document.getElementById('commandList');
        list.innerHTML = ''; // Clear existing list
        commands.forEach(command => {
            const item = document.createElement('div');
            item.textContent = `${command.name}: ${command.description} - ${command.answer}`;
            list.appendChild(item);
        });
    });
}
