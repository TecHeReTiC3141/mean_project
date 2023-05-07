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
    });

    $('.edit-submit').on('click', function() {
        $(this).parent().fadeOut(500);
        let newVal = $('#edit-name').val();
        $('#edit-name').val('');
        fetch('http://localhost:3000/update/', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: $(this).data('editId'),
                newVal
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    ajaxUpdate();
                }
            })

    });

    $('.edit-cancel').on('click', function() {
        $(this).parent().fadeOut(500);
        $('#edit-name').val('');
    });

    $('.search-btn').on('click', function() {
        let patt = $('#search-input').val();
        fetch(`http://localhost:3000/search/${patt}`)
            .then(response => response.json())
            .then( data => createTable(data.data))
            .catch(err => console.log(err));
    });
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
            handleEdit(editId);
        });
}

function handleEdit(editId) {
    $('.edit').fadeIn(500);
    $('.edit-submit').data('editId', editId);
}

function ajaxUpdate() {
    $.get('http://localhost:3000/getAll', (data, status) => {
        createTable(data.data);
    });
}

function deleteRowById(id) {
    fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                ajaxUpdate();
            };
        })
        .catch(err => console.log(err.message))
}

function createTable(data) {
    $('.data tbody').empty();
    if (data.length === 0) {
        $('.data tbody').append('<tr><td colspan="5" class="no-data">No data here</td></tr>');
    } else {
        data.forEach(insertRowInTable);
    }
}