class SOTIETKIEM {
    constructor(maSo, loaiTietKiem, hoTen, cmnd, ngayMoSo, soTienGui) {
        this.maSo = maSo.length <= 5 ? maSo : maSo.substring(0, 5);
        this.loaiTietKiem = loaiTietKiem.length <= 10 ? loaiTietKiem : loaiTietKiem.substring(0, 10);
        this.hoTen = hoTen.length <= 30 ? hoTen : hoTen.substring(0, 30);
        this.cmnd = parseInt(cmnd);
        this.ngayMoSo = ngayMoSo;
        this.soTienGui = parseFloat(soTienGui) >= 0 ? parseFloat(soTienGui) : 0;
    }

    getMaSo() { return this.maSo; }
    getLoaiTietKiem() { return this.loaiTietKiem; }
    getHoTen() { return this.hoTen; }
    getCMND() { return this.cmnd; }
    getNgayMoSo() { return this.ngayMoSo; }
    getSoTienGui() { return this.soTienGui; }
}

let danhSachSo = [];

function kiemTraDinhDangNgay(ngay) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(ngay)) return false;

    const [day, month, year] = ngay.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() + 1 === month && date.getFullYear() === year;
}

function kiemTraMaSoTonTai(maSo) {
    return danhSachSo.some(so => so.getMaSo() === maSo);
}

function themSoTietKiem() {
    const maSo = document.getElementById('maSo').value.trim();
    const loaiTietKiem = document.getElementById('loaiTietKiem').value.trim();
    const hoTen = document.getElementById('hoTen').value.trim();
    const cmnd = document.getElementById('cmnd').value;
    const ngayMoSo = document.getElementById('ngayMoSo').value.trim();
    const soTienGui = document.getElementById('soTienGui').value;
    const errorDiv = document.getElementById('error');

    if (!maSo || !loaiTietKiem || !hoTen || !cmnd || !ngayMoSo || !soTienGui) {
        errorDiv.textContent = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }

    if (!kiemTraDinhDangNgay(ngayMoSo)) {
        errorDiv.textContent = "Ngày mở sổ không đúng định dạng (dd/mm/yyyy) hoặc không hợp lệ!";
        return;
    }

    const soTietKiem = new SOTIETKIEM(maSo, loaiTietKiem, hoTen, cmnd, ngayMoSo, soTienGui);

    const index = danhSachSo.findIndex(so => so.getMaSo() === maSo);
    if (index !== -1) {
        danhSachSo[index] = soTietKiem;
        errorDiv.textContent = "Đã cập nhật sổ tiết kiệm với mã: " + maSo;
    } else {
        danhSachSo.push(soTietKiem);
        errorDiv.textContent = "Đã thêm sổ tiết kiệm với mã: " + maSo;
    }

    capNhatDanhSach();
}

function xoaSoTietKiem(maSo) {
    danhSachSo = danhSachSo.filter(so => so.getMaSo() !== maSo);
    capNhatDanhSach();
    document.getElementById('error').textContent = "Đã xóa sổ tiết kiệm với mã: " + maSo;
}

function kiemTraMaSo() {
    const maSo = document.getElementById('maSo').value.trim();
    const errorDiv = document.getElementById('error');

    if (!maSo) {
        errorDiv.textContent = "Vui lòng nhập mã sổ để kiểm tra!";
        return;
    }

    if (kiemTraMaSoTonTai(maSo)) {
        errorDiv.textContent = "Mã sổ " + maSo + " đã tồn tại trong danh sách!";
    } else {
        errorDiv.textContent = "Mã sổ " + maSo + " chưa tồn tại trong danh sách!";
    }
}

function capNhatDanhSach() {
    const tbody = document.getElementById('danhSachSoBody');
    tbody.innerHTML = '';

    danhSachSo.forEach(so => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${so.getMaSo()}</td>
            <td>${so.getLoaiTietKiem()}</td>
            <td>${so.getHoTen()}</td>
            <td>${so.getCMND()}</td>
            <td>${so.getNgayMoSo()}</td>
            <td>${so.getSoTienGui()}</td>
            <td><button onclick="xoaSoTietKiem('${so.getMaSo()}')">Xóa</button></td>
        `;
        tbody.appendChild(row);
    });

    // Xóa form sau khi thêm
    document.getElementById('maSo').value = '';
    document.getElementById('loaiTietKiem').value = '';
    document.getElementById('hoTen').value = '';
    document.getElementById('cmnd').value = '';
    document.getElementById('ngayMoSo').value = '';
    document.getElementById('soTienGui').value = '';
}