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
            .then(data => {
                console.log(data);
                insertRowInTable(data.data);
            })
            .catch(err => console.log(err));
    })
});

function insertRowInTable(row) {
    // console.log(row);
    if ($('.no-data').length) {
        $('.data tbody').empty();
    }
    $('.data tbody').append(`<tr>
                                <td>${ row.ID }</td> 
                                <td>${ new Date(row.Date).toLocaleString() }</td> 
                                <td>${ row.Name }</td> 
                                <td><button data-id="${ row.ID }" class="delete-btn">Delete</button></td> 
                                <td><button data-id="${ row.ID } " class="edit-btn">Edit</button></td> 
                            </tr>`);

    $('.data tbody tr:last-child .delete-btn').on('click',
        function() {
            let deleteId = $(this).data('id');
            console.log(deleteId);
            deleteRowById(deleteId);
        });
    $('.data tbody tr:last-child .edit-btn').on('click',
        function() {
            let editId = $(this).data('id');
            console.log(editId);
        });
}

function deleteRowById(id) {
    fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) location.reload();
        })
        .catch(err => console.log(err.message))
}

function createTable(data) {
    if (data.length === 0) {
        $('.data tbody').empty()
            .append('<tr><td colspan="5" class="no-data">No data here</td></tr>');
    } else {
        data.forEach(insertRowInTable);
    }
}