
const params = new URLSearchParams(window.location.search);
const nightNumber = Number(params.get("night"));

const nightTitle = document.getElementById("night-title");
const entriesList = document.getElementById("night-entries-list");

if (nightNumber >= 1 && nightNumber <= 20) {

    nightTitle.textContent = `NIGHT ${String(nightNumber).padStart(2, "0")}`;

    const nightEntries = entries
        .filter(entry => entry.night === nightNumber)
        .sort((a, b) => a.id - b.id);

    nightEntries.forEach(entry => {

        const item = document.createElement("article");
        item.className = "night-entry-item";

        const title = document.createElement("h2");
        title.textContent = entry.title;

        const date = document.createElement("p");
        date.textContent = entry.received;

        const link = document.createElement("a");
        link.href = `entry.html?id=${entry.id}`;
        link.textContent = "Read entry →";

        item.appendChild(title);
        item.appendChild(date);
        item.appendChild(link);

        entriesList.appendChild(item);

    });

    if (nightEntries.length === 0) {
        entriesList.textContent = "No entries for this night.";
    }

} else {

    nightTitle.textContent = "Night not found.";

}
