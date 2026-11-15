const params = new URLSearchParams(window.location.search);
const nightNumber = Number(params.get("night"));

const nightTitle = document.getElementById("night-title");
const entriesList = document.getElementById("night-entries-list");

const typeLabels = {
    poem: "VERSE",
    prose: "REVERIE",
    conversation: "BETWEEN US",
    fragment: "BETWEEN US",
    message: "A NOTE",
    text: "REVERIE",
    audio: "A VOICE",
    image: "A MOMENT",
    video: "IN MOTION",
	story: "STORY"
};

if (Number.isInteger(nightNumber) && nightNumber >= 1 && nightNumber <= 20) {
    nightTitle.textContent = `NIGHT ${String(nightNumber).padStart(2, "0")}`;

    const nightEntries = entries
        .filter(entry => Number(entry.night) === nightNumber)
        .sort((a, b) => a.id - b.id);

    if (nightEntries.length === 0) {
         if (nightNumber === 16) {
        entriesList.textContent =
            "A night spent passing by, unaware of each other\nJust as empty.";
        entriesList.style.whiteSpace = "pre-line";
    } else {
        entriesList.textContent = "No entries for this night yet.";
    }
    } else {
        nightEntries.forEach(entry => {
            const item = document.createElement("article");
            item.className = "night-entry-item";

            const type = document.createElement("h2");
            type.className = "night-entry-type";
            type.textContent = typeLabels[entry.type] || "ENTRY";

            const date = document.createElement("p");
            date.className = "night-entry-date";
            date.textContent = entry.received || "";

            const time = document.createElement("p");
            time.className = "night-entry-time";
            time.textContent = entry.time || "";

            const link = document.createElement("a");
            link.className = "night-entry-link";
            link.href = `entry.html?id=${encodeURIComponent(entry.id)}`;
            link.textContent = "Read entry →";

            item.appendChild(type);
            if (entry.received) item.appendChild(date);
            if (entry.time) item.appendChild(time);
            item.appendChild(link);
            entriesList.appendChild(item);
        });
    }
} else {
    nightTitle.textContent = "Night not found.";
    entriesList.textContent = "This night is not available.";
}