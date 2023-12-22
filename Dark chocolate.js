document.addEventListener("DOMContentLoaded", function() {
    const chocolates = [{
            id: 1,
            name: "Dark Chocolate",
            price: 2.5
        },
        {
            id: 2,
            name: "Milk Chocolate",
            price: 2.0
        },
        // Add more chocolate options as needed
    ];

    const app = document.getElementById("app");
    const totalDisplay = document.createElement("p");
    const chocolateContainer = document.createElement("div");
    chocolateContainer.classList.add("container");

    let selectedChocolates = [];

    function updateTotal() {
        const totalItems = selectedChocolates.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = selectedChocolates.reduce((total, item) => total + item.quantity * item.price, 0);

        if (totalItems <= 8) {
            totalDisplay.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        } else {
            totalDisplay.textContent = "Exceeds maximum items (8)";
        }
    }

    function createChocolateItem(chocolate) {
        const item = document.createElement("div");
        item.classList.add("chocolate-item");

        const name = document.createElement("span");
        name.textContent = chocolate.name;

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = 0;
        quantityInput.max = 8;
        quantityInput.value = 0;

        quantityInput.addEventListener("input", function() {
            const quantity = parseInt(quantityInput.value);
            const existingItemIndex = selectedChocolates.findIndex(item => item.id === chocolate.id);

            if (existingItemIndex !== -1) {
                selectedChocolates[existingItemIndex].quantity = quantity;
            } else {
                selectedChocolates.push({
                    id: chocolate.id,
                    quantity,
                    price: chocolate.price
                });
            }

            updateTotal();
        });

        item.appendChild(name);
        item.appendChild(quantityInput);

        return item;
    }

    chocolates.forEach(chocolate => {
        chocolateContainer.appendChild(createChocolateItem(chocolate));
    });

    app.appendChild(chocolateContainer);
    chocolateContainer.appendChild(totalDisplay);
});