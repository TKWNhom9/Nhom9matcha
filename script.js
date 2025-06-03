// Khi trang load xong
document.addEventListener("DOMContentLoaded", function() {
    // Lấy các ô input số lượng
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    
    quantityInputs.forEach(function(input) {
        input.addEventListener('input', updateCart); // khi người dùng thay đổi số lượng
    });

    // Hàm cập nhật giỏ hàng
    function updateCart() {
        let total = 0;

        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(function(row) {
            const priceText = row.querySelector('td:nth-child(2)').innerText;
            const price = parseInt(priceText.replace(/\D/g, '')); // bỏ dấu . và đ
            const qty = parseInt(row.querySelector('input[type="number"]').value);
            const lineTotal = price * qty;

            // Cập nhật cột "Thành tiền"
            row.querySelector('td:nth-child(4)').innerText = formatCurrency(lineTotal);

            // Cộng vào tổng
            total += lineTotal;
        });

        // Cập nhật "Tổng cộng"
        document.querySelector('.cart-total').innerText = "Tổng cộng: " + formatCurrency(total);
    }

    // Hàm định dạng số thành tiền (VD: 50000 → 50.000đ)
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN') + "đ";
    }

    // Gọi cập nhật lần đầu khi load trang
    updateCart();

    // Xử lý nút THANH TOÁN → chuyển sang thanhtoan.html
    const payButton = document.querySelector('.pay-btn');
    if (payButton) {
        payButton.addEventListener('click', function() {
            window.location.href = "thanhtoan.html";
        });
    }
});


    // Render giỏ hàng trong thanhtoan.html
document.addEventListener('DOMContentLoaded', function() {
    const checkoutItems = document.getElementById('checkout-cart-items');
    const checkoutTotal = document.getElementById('checkout-cart-total');

    if (!checkoutItems) return; // Nếu không phải trang thanh toán thì bỏ qua

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        checkoutItems.innerHTML = '<p>Giỏ hàng trống.</p>';
        checkoutTotal.innerHTML = '<strong>Tổng thành tiền:</strong> 0đ';
    } else {
        let total = 0;
        checkoutItems.innerHTML = '';

        cart.forEach(item => {
            const itemHtml = `
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    <div>
                        <strong>${item.name}</strong><br>
                        ${item.price.toLocaleString()}đ x ${item.quantity}
                    </div>
                </div>
            `;
            checkoutItems.innerHTML += itemHtml;
            total += item.price * item.quantity;
        });

        checkoutTotal.innerHTML = `<strong>Tổng thành tiền:</strong> ${total.toLocaleString()}đ`;
    }
});

//code cho sanpham.html//
//danh muc//
function navigateToCategory(category, event) {
    event.preventDefault(); // Ngăn trình duyệt tải lại trang
    localStorage.setItem('selectedCategory', category); // Lưu danh mục vào localStorage
    window.location.href = 'sanpham.html'; // Điều hướng đến trang sản phẩm
}
    //Nút thử ngay
    function goToProducts() {
    window.location.href = 'sanpham.html'; // Thay đổi 'sanpham.html' nếu cần
}
   // Slider
   let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
  const slider = document.querySelector('.slider');
  slider.style.transform = `translateX(-${index * 100}%)`;
}

function changeSlide() {
  currentSlide = (currentSlide + 1) % totalSlides; // Vòng lặp về slide đầu tiên khi đạt slide cuối cùng
  showSlide(currentSlide);
}

// Tự động chuyển slide mỗi 5 giây
setInterval(changeSlide, 5000);

// Hiển thị slide đầu tiên khi tải trang
showSlide(currentSlide);

// Hiển thị popup sau khi tải trang
    window.addEventListener('load', function() {
        document.getElementById('popup').style.display = 'flex';
    });
    
    // Hàm đóng popup
    function closePopup() {
        document.getElementById('popup').style.display = 'none';
    }
    //REVIEWS
    let currentReview = 0; // Đánh giá hiện tại
const reviews = document.querySelectorAll('.review-item'); // Lấy tất cả đánh giá

function showNextReview() {
    reviews[currentReview].classList.remove('active'); // Ẩn đánh giá hiện tại
    currentReview = (currentReview + 1) % reviews.length; // Chuyển đến đánh giá tiếp theo
    reviews[currentReview].classList.add('active'); // Hiển thị đánh giá tiếp theo
}

// Hiển thị đánh giá đầu tiên
reviews[currentReview].classList.add('active');

// Chuyển đổi giữa các đánh giá mỗi 5 giây
setInterval(showNextReview, 5000);

//slider cho danh mục//
function showProducts(category, event) {
    event.preventDefault(); // Ngăn trình duyệt tải lại trang
    localStorage.setItem('selectedCategory', category); // Lưu danh mục vào localStorage
    window.location.href = 'sanpham.html'; // Điều hướng đến trang sản phẩm
}
//Nút tìm kiếm//
function toggleSearch() {
    const input = document.querySelector('.input');
    input.classList.toggle('active'); // Thêm hoặc xóa lớp active
    if (input.classList.contains('active')) {
        input.focus(); // Tự động focus vào ô nhập
    }
}

// Thêm sự kiện để gửi form khi nhấn Enter
document.querySelector('.input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        this.form.submit(); // Gửi form khi nhấn Enter
    }
});

//Lên đầu trang:  
// // Hiển thị nút khi cuộn xuống 100px
  window.onscroll = function() {
    let btn = document.getElementById("btnTop");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  // Hàm cuộn lên đầu
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

// Hàm thêm sản phẩm vào localStorage, thêm sản phẩm từ trangchu or sanpham vao giỏ hàng
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Đã thêm vào giỏ hàng!');
}

// Render giỏ hàng trong trang thanhtoan.html
window.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.querySelector('.cart-total');
    let total = 0;

    cart.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td style="padding: 10px; border: 1px solid #ccc; display: flex; align-items: center;">
                <img src="${product.image}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 10px;">
                ${product.name}
            </td>
            <td style="padding: 10px; border: 1px solid #ccc;">${product.price.toLocaleString()}đ</td>
            <td style="padding: 10px; border: 1px solid #ccc;"><input type="number" value="${product.quantity}" min="1" style="width: 50px;"></td>
            <td style="padding: 10px; border: 1px solid #ccc;">${(product.price * product.quantity).toLocaleString()}đ</td>
            <td style="padding: 10px; border: 1px solid #ccc;"><button style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer;" onclick="removeFromCart(${index})">X</button></td>
        `;

        cartItemsContainer.appendChild(row);

        total += product.price * product.quantity;
    });

    cartTotal.textContent = `Tổng cộng: ${total.toLocaleString()}đ`;
});

// Hàm xóa sản phẩm
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}


