function changeDisplay() {
    let button = document.getElementById("newButton")
    let form = document.getElementById("newForm")
    let threads = document.getElementById("threadsDisplay")
    let pagination = document.getElementById("pagination")

    console.log(button, form, threads, pagination)

    button.style.display = 'none';
    form.style.display = 'block';
    threads.style.display = 'none';
    pagination.style.display = 'none';
}

function filterThreads() {
    const selectedCategory = document.getElementById('dropdown2').value;
    console.log(selectedCategory)
    // Hide all thread elements
    const threadElements = document.querySelectorAll('section');
    threadElements.forEach((threadElement) => {
        threadElement.style.display = 'none';
    });

    // Show threads with the selected category
    const filteredThreads = document.querySelectorAll('.' + selectedCategory);
    filteredThreads.forEach((thread) => {
        thread.style.display = 'block';
    });
}

// Add an event listener to the category dropdown
document.addEventListener('DOMContentLoaded', function() {
    // Add an event listener to the category dropdown
    const dropdown2 = document.getElementById('dropdown2');
    if (dropdown2) { // Check if the element exists before adding the listener
        dropdown2.addEventListener('change', filterThreads);
    }
});