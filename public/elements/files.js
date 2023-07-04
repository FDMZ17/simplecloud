const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const fileTableBody = document.getElementById('fileTableBody');

searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value.toLowerCase();
  const fileRows = fileTableBody.getElementsByTagName('tr');

  Array.from(fileRows).forEach((row) => {
    const fileName = row.getElementsByTagName('a')[0].textContent.toLowerCase();
    const fileId = row.getElementsByTagName('p')[0].textContent.toLowerCase();

    if (fileName.includes(searchQuery) || fileId.includes(searchQuery)) {
      row.style.display = 'table-row';
    } else {
      row.style.display = 'none';
    }
  });
});