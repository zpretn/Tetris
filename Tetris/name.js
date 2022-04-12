document.addEventListener('DOMContentLoaded', () => {
    const nameDisplay = document.querySelector('#playerName')


    const confirmButton = document.querySelector('#confirm-name')


    function show() {
        document.getElementById('buttons').style.display = "block";
        document.getElementById('input').style.display = "none";
        var playerName = document.getElementById("name").value;
        nameDisplay.innerHTML = "Name: " + playerName

        //alert(playerName)



    }

    confirmButton.addEventListener('click', () => {
        document.getElementById("confirm-name").addEventListener("click", show);

    })

})