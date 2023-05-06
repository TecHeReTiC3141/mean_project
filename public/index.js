$(document).ready(() => {
    fetch('http://localhost:3000/getAll')
        .then(res => res.json())
        .then(data => createTable(data.data));

    $('.add-btn').on('click', function() {
        const name = $('#name-input').val();
        $('#name-input').val('');
        console.log(name);
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
    console.log(row);
    $('.data tbody').append(`<tr>
                                <td>${ row.ID }</td> 
                                <td>${ row.Date }</td> 
                                <td>${ row.Name }</td> 
                                <td><button>Delete</button></td> 
                                <td><button>Edit</button></td> 
                            </tr>`);
}

function createTable(data) {
    if (data.length === 0) {
        $('.data tbody').empty()
            .append('<tr><td colspan="5">No data here</td></tr>');
    } else {
        data.forEach(insertRowInTable);
    }
}