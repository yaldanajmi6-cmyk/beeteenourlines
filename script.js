const entriesList = document.getElementById("entries-list");

if (entriesList && Array.isArray(entries)) {
    for (let night = 1; night <= 20; night++) {
        const nightEntries = entries.filter(entry => Number(entry.night) === night);

        const nightLink = document.createElement("a");
        nightLink.className = "night-card";
        nightLink.href = `night.html?night=${night}`;

        const nightTitle = document.createElement("span");
        nightTitle.className = "night-card-title";
        nightTitle.textContent = `NIGHT ${String(night).padStart(2, "0")}`;

        const nightCount = document.createElement("span");
        nightCount.className = "night-card-count";
        nightCount.textContent = `${nightEntries.length} ${
            nightEntries.length === 1 ? "ENTRY" : "ENTRIES"
        }`;

        nightLink.appendChild(nightTitle);
        nightLink.appendChild(nightCount);
        entriesList.appendChild(nightLink);
    }
} else if (entriesList) {
    entriesList.textContent = "The collection could not be loaded.";
}