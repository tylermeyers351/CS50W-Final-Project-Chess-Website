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