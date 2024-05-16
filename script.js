const url = 'http://localhost:3000/dataa';

document.addEventListener('DOMContentLoaded', () => {
    fetchStuds();
});

async function fetchStuds() {
    try {
        const res = await axios.get(url);
        const stds = res.data;
        const stdList = document.getElementById('student-table-body');
        stdList.innerHTML = '';
        stds.forEach(addRow);
    } catch (err) {
        console.error('Error fetching students:', err);
    }
}

function addRow(std) {
    const stdList = document.getElementById('student-table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${std.roll}</td>
        <td>${std.name}</td>
        <td>${std.branch}</td>
        <td>${std.grade}</td>
        <td>
        <button onclick="editStd('${std.id}')"><i class="fas fa-pencil-alt"></i></button>
        <button onclick="delStd('${std.id}')"><i class="fas fa-trash-alt"></i></button>
        </td>
    `;
    stdList.appendChild(row);
}

async function addStd() {
    const roll = document.getElementById('r').value;
    const name = document.getElementById('n').value;
    const branch = document.getElementById('b').value;
    const grade = document.getElementById('g').value;

    if (roll && name && branch && grade) {
        try {
            const res = await axios.post(url, { roll, name, branch, grade });
            addRow(res.data);
            clearInputs();
        } catch (err) {
            console.error('Error adding student:', err);
        }
    } else {
        alert('Please fill in all fields.');
    }
}

async function editStd(id) {
    const nr=prompt('Enter new roll num')
    const nn = prompt('Enter new name:');
    const nb = prompt('Enter new branch:');
    const ng=prompt('Enter new grade ')
    
    if (nn || nb) {
        try {
            const data = {};
            if (nn) data.name = nn;
            if (nb) data.branch = nb;
            if (nr) data.roll=nr;
            if(ng) data.grade=ng;

            const res = await axios.patch(`${url}/${id}`, data);
            fetchStuds();
        } catch (err) {
            console.error('Error updating student:', err);
        }
    }
}

async function delStd(id) {
    try {
        await axios.delete(`${url}/${id}`);
        fetchStuds();
    } catch (err) {
        console.error('Error deleting student:', err);
    }
}

function clearInputs() {
    document.getElementById('r').value = '';
    document.getElementById('n').value = '';
    document.getElementById('b').value = '';
    document.getElementById('g').value = '';
}
