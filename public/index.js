$(document).ready(() => {
    fetch('http://localhost:3000/getAll')
        .then(res => res.json())
        .then(data => createTable(data.data));

    $('.add-btn').on('click', function() {
        const name = $('#name-input').val();
        $('#name-input').value = "";
        console.log('hello', name);
        fetch('http://localhost:3000/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name })
        })
            .then(response => response.json())
            .then(data => insertRowInTable(data.data))
            .catch(err => console.log(err));
    })
});

function insertRowInTable(row) {
    $('.data tbody').append()
}

function createTable(data) {
    if (data.length === 0) {
        $('.data tbody').empty()
            .append('<tr><td colspan="3">No data here</td></tr>');
    }
}