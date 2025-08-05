const apiUrl = "https://script.google.com/macros/s/AKfycbw3roza_AO3hlBLnYOJtGGzczZerZ9QzzL61IYnoXr_LK-6qSvP2mdYOiqZVgktQISH/exec";

// Ambil data dari server
function fetchData() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("data-body");
      tbody.innerHTML = "";
      data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.nama}</td>
          <td>${item.kelas}</td>
          <td>
            <button onclick="editData(${item.id}, '${item.nama}', '${item.kelas}')">Edit</button>
            <button onclick="deleteData(${item.id})">Hapus</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
}

// Tambah atau update data
document.getElementById("form-data").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const nama = document.getElementById("nama").value;
  const kelas = document.getElementById("kelas").value;

  const formData = new FormData();
  formData.append("id", id);
  formData.append("nama", nama);
  formData.append("kelas", kelas);
  formData.append("action", id ? "update" : "create");

  fetch(apiUrl, {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(() => {
      fetchData();
      document.getElementById("form-data").reset();
    });
});

function editData(id, nama, kelas) {
  document.getElementById("id").value = id;
  document.getElementById("nama").value = nama;
  document.getElementById("kelas").value = kelas;
}

function deleteData(id) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("action", "delete");

  fetch(apiUrl, {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(() => {
      fetchData();
    });
}

// Load data saat halaman dibuka
window.onload = fetchData;
