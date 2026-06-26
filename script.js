let items = [
    {
        title: "Part-time Cashier",
        type: "job",
        description: "Local store hiring cashiers."
    },
    {
        title: "Tech Workshop",
        type: "event",
        description: "Free coding workshop this Friday."
    },
    {
        title: "Community Clinic",
        type: "service",
        description: "Free health checkup available."
    }
];

function displayItems(filteredItems) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    filteredItems.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <h3>${item.title}</h3>
                <p>${item.type}</p>
                <p>${item.description}</p>
            </div>
        `;
    });
}

function filterItems(type) {
    if (type === "all") {
        displayItems(items);
    } else {
        displayItems(items.filter(item => item.type === type));
    }
}

function addItem() {
    const title = document.getElementById("title").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;

    items.push({ title, type, description });
    displayItems(items);
}

document.getElementById("search").addEventListener("input", function() {
    const value = this.value.toLowerCase();
    const filtered = items.filter(item =>
        item.title.toLowerCase().includes(value)
    );
    displayItems(filtered);
});

displayItems(items);
