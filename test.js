// Get all elements
const cartItems = document.querySelectorAll(".cart-item");
const subtotalEl = document.querySelector(".summary-row span:last-child");
const totalEl = document.querySelector(".total-amount");

// Shipping cost
const SHIPPING = 5;

// Update totals
function updateCart() {
    let subtotal = 0;
    let totalItems = 0;

    document.querySelectorAll(".cart-item").forEach(item => {
        let price = Number(item.querySelector(".item-price").innerText.replace("$",""));
        let qty = Number(item.querySelector(".qty-number").innerText);

        let itemTotal = price * qty;
        item.querySelector(".item-total").innerText = "$" + itemTotal.toFixed(2);

        subtotal += itemTotal;
        totalItems += qty;
    });

    // Update UI
    document.querySelector(".summary-row span").innerText = `Subtotal (${totalItems} items)`;
    subtotalEl.innerText = "$" + subtotal.toFixed(2);
    totalEl.innerText = "$" + (subtotal + SHIPPING).toFixed(2);
}

// Quantity buttons
document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let item = btn.closest(".cart-item");
        let qtyEl = item.querySelector(".qty-number");
        let qty = Number(qtyEl.innerText);

        if (btn.innerHTML.includes("plus")) {
            qty++;
        } else {
            if (qty > 1) qty--;
        }

        qtyEl.innerText = qty;
        updateCart();
    });
});

// Remove item
document.querySelectorAll(".btn-remove").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".cart-item").remove();
        updateCart();
    });
});

// Initial calculation
updateCart();