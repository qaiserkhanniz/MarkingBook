const studentsContainer = document.getElementById('studentsContainer');
const addStudentBtn = document.getElementById('addStudent');
const studentName = document.getElementById('name');
const studentMark = document.getElementById('mark');
const dataForm = document.getElementById('data-form');
const studentData = [];

studentName.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    studentMark.focus();
  }
});

studentMark.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addStudentBtn.click();
  }
});

addStudentBtn.addEventListener('click', function() {
  /* add student data to array */
  studentData.push({ name: studentName.value, mark: studentMark.value });
  /* clear input fields */
  studentName.value = '';
  studentMark.value = '';
  /* update students list */
  updateStudentsList();
  /* move focus back to name input field */
  studentName.focus();
});

function updateStudentsList() {
  /* clear existing students */
  studentsContainer.innerHTML = '';

  /* clear existing table rows */
  const tableRows = document.querySelectorAll('#studentsTable tbody tr');
  tableRows.forEach(row => row.remove());

  /* add new students */
  studentData.forEach(function(student, index) {
    const studentDiv = document.createElement('div');
    studentDiv.innerHTML = `${index+1}. ${student.name} - ${student.mark}`;
    studentsContainer.appendChild(studentDiv);

    // create new row in the table for the student
    const newRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    const markCell = document.createElement('td');
    nameCell.textContent = student.name;
    markCell.textContent = student.mark;
    newRow.appendChild(nameCell);
    newRow.appendChild(markCell);
    document.querySelector('#studentsTable tbody').appendChild(newRow);
  });
}


dataForm.addEventListener('submit', function(event) {
  /* sort student data */
  studentData.sort(function(a, b) {
    return b.mark - a.mark;
  });
  /* update students list */
  updateStudentsList();
  /* prevent form submission */
  event.preventDefault();
});

const downloadPDFBtn = document.getElementById('downloadPDF');
downloadPDFBtn.addEventListener('click', function() {
  const doc = new jsPDF();
  const table = document.getElementById('studentsTable');
  
  // check if table element exists
  if (!table) {
    console.error('Table element not found!');
    return;
  }
  
  const rows = table.querySelectorAll('tr');
  const headers = table.querySelectorAll('th');
  const data = [];

  // Add headers to data array
  const headersRow = [];
  for (let i = 0; i < headers.length; i++) {
    headersRow.push(headers[i].textContent);
  }
  data.push(headersRow);

  // Add data rows to data array
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowData = [];
    const cells = row.querySelectorAll('td');
    for (let j = 0; j < cells.length; j++) {
      rowData.push(cells[j].textContent);
    }
    data.push(rowData);
  }

  // Convert data array to PDF table
  doc.autoTable({
    head: [data[0]],
    body: data.slice(1)
  });
});

downloadPDFBtn.addEventListener('click', function() {
  const fileName = window.prompt("Enter file name:", "students.pdf");

  if (fileName) {
    const doc = new jsPDF();
    const table = document.getElementById('studentsTable');
    const rows = table.querySelectorAll('tr');
    const headers = table.querySelectorAll('th');
    const data = [];

    // Add headers to data array
const headersRow = [];
for (let i = 0; i < headers.length; i++) {
  const textContent = headers[i].textContent.trim().replace(/\s+/g, ' ');
  headersRow.push(textContent);
}
data.push(headersRow);

// Add data rows to data array
for (let i = 0; i < rows.length; i++) {
  const row = rows[i];
  const rowData = [];
  const cells = row.querySelectorAll('td');
  for (let j = 0; j < cells.length; j++) {
    const textContent = cells[j].textContent.trim().replace(/\s+/g, ' ');
    rowData.push(textContent);
  }
  data.push(rowData);
}


    // Convert data array to PDF table
    doc.autoTable({
      head: [data[0]],
      body: data.slice(1)
    });

    // Save PDF file with the specified name and path
    doc.save(`${fileName}`);
  }
});
