document.addEventListener('DOMContentLoaded', () => {

    const confirmButton = document.querySelector('#confirm-name')


    function show() {
        document.getElementById('buttons').style.display = "block";
        document.getElementById('input').style.display = "none";
    }

    confirmButton.addEventListener('click', () => {
        document.getElementById("confirm-name").addEventListener("click", show);

    })

})