function addToCart(productName, productPrice, qtyInputId, isKg = false) {
    var qty = document.getElementById(qtyInputId).value;

    // if (qty && qty > 0) {
        // var totalPrice = productPrice * qty;

    if (qty && (qty ==="1" || qty === "0.5" || qty == "0.25" || qty == "0.75")) {
        var weight = parseFloat(qty);
        var totalPrice = productPrice * weight;

        // add rows to the table
        var table = document.getElementById('aryatable');
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = productName;
        cell2.innerHTML = qty + (isKg ? " kg" : " Qty");
        cell3.innerHTML = "Rs. " + totalPrice.toFixed(2);

        updateTotal();
        
    } else {
        alert("Please enter a valid quantity (1, 0.5 or 0.25 kg).");
    }
}

function addToFavourite() {
    var aryatable = document.getElementById('aryatable');
    var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
    for (var i = 1; i < aryatable.rows.length; i++) {
        var row = aryatable.rows[i];
        var product = {
            name: row.cells[0].innerText,
            quantity: row.cells[1].innerText,
            price: row.cells[2].innerText
        };

        if (!favourites.some(fav => fav.name === product.name && fav.quantity === product.quantity)) {
            favourites.push(product);
        }
    }
    
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert("Items added to favourites!");
}

function applyToFavourite() {
    var aryatable = document.getElementById('aryatable');
    var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
    aryatable.innerHTML = "<tr><th>Name</th><th>Qty/Kg</th><th>Price</th></tr>";
    
    favourites.forEach(function(product) {
        var row = aryatable.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = product.name;
        cell2.innerHTML = product.quantity;
        cell3.innerHTML = product.price;
    });

    localStorage.removeItem('favourites');
    alert("Favourites applied to cart!");

    updateTotal();
}

function buyNow() {
    var aryatable = document.getElementById('aryatable');
    var items = [];
    
    for (var i = 1; i < aryatable.rows.length; i++) {
        var row = aryatable.rows[i];
        var item = {
            name: row.cells[0].innerText,
            quantity: row.cells[1].innerText,
            price: row.cells[2].innerText
        };
        items.push(item);
    }

    if (items.length === 0) {
        alert("Your cart is empty. Please add items to buy.");
        return;
    }

    localStorage.setItem('cart', JSON.stringify(items));
    alert("Proceeding to checkout!");
    window.location.href = 'buynow.html';
}


function displayCart() {
    var table = document.getElementById('aryatable');
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    table.innerHTML = "<tr><th>Name</th><th>Qty/Kg</th><th>Price</th></tr>";

    cart.forEach(function(product) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = product.name;
        cell2.innerHTML = product.quantity;
        cell3.innerHTML = product.price;
    });

    updateTotal();
}

function updateTotal() {
    var table = document.getElementById('aryatable');
    var total = 0;

    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var priceText = row.cells[2].innerText.replace("Rs. ", "");
        var price = parseFloat(priceText);

        total += price;
    }

    document.getElementById('totalPrice').innerText = "Total: Rs. " + total.toFixed(2);
}

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Calculate the delivery date (3 days from now)
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    var deliveryDate = currentDate.toDateString();

    // Display the thank-you message
    var thankYouMessage = document.getElementById('thank-you-message');
    thankYouMessage.classList.remove('hidden'); // Remove the hidden class to show the message
    document.getElementById('delivery-date').innerText = "Your expected delivery date is: " + deliveryDate;
    event.target.reset();
});

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Calculate the delivery date (3 days from now)
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    var deliveryDate = currentDate.toDateString();

    // Show an alert with the thank-you message and delivery date
    alert("Thank You! Your order has been placed successfully.\n" +
          "Your expected delivery date is: " + deliveryDate);

    // Optionally, clear the form
    event.target.reset();
});


displayCart();