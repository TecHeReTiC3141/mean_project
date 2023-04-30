$(document).ready(() => {
    createTable([]);
});

function createTable(data) {
    if (data.length === 0) {
        $('.data tbody').empty()
            .append('<tr><td colspan="3">No data here</td></tr>');
    }
}