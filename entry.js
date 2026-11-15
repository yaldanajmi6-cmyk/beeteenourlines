const params = new URLSearchParams(window.location.search);
const entryId = Number(params.get("id"));

const entry = entries.find(item => item.id === entryId);
const container = document.getElementById("entry-content");
const backLink = document.getElementById("back-to-night");

// Compact photographs, paired Night 12 gallery, centered video, and custom audio.
const mediaStyles = document.createElement("style");
mediaStyles.textContent = `
#entry-content { width: 100%; }

.entry-image {
    display: block;
    width: auto;
    max-width: min(100%, 760px);
    max-height: 68vh;
    height: auto;
    object-fit: contain;
    margin: 22px auto 0;
    border: 1px solid #182b49;
    padding: 2px;
    background: #182b49;
    box-shadow: 0 5px 16px rgba(24,43,73,.08);
}
.entry-photo-gallery {
    width: min(100%, 980px);
    margin: 28px auto 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 13px;
    align-items: center;
}
.entry-photo-gallery .entry-image {
    width: 100%;
    max-width: 100%;
    max-height: 58vh;
    height: auto;
    margin: 0;
    padding: 0;
    border: 1px solid #182b49;
    background: transparent;
    box-sizing: border-box;
    box-shadow: 0 3px 10px rgba(24,43,73,.07);
}
/* The first Night 12 photo has a wide navy strip baked into its image.
   Crop only those side strips so its frame matches the second photograph. */
.entry-photo-gallery .entry-image:first-child {
    width: min(100%, 245px);
    height: min(58vh, 380px);
    max-width: 245px;
    object-fit: cover;
    object-position: center;
    justify-self: center;
}
.entry-video-frame {
    width: min(100%, 780px);
    margin: 26px auto 0;
    padding: 10px;
    box-sizing: border-box;
    background: linear-gradient(145deg, #182b49, #283650);
    border: 1px solid rgba(158,38,56,.65);
    box-shadow: 0 12px 30px rgba(24,43,73,.16);
    position: relative;
}
.entry-video-frame::before {
    content: "IN MOTION";
    display: block;
    padding: 2px 3px 9px;
    color: #e8e4df;
    font: 9px/1.4 Arial, sans-serif;
    letter-spacing: 2.2px;
    text-align: center;
}
.entry-video {
    display: block;
    width: 100%;
    max-height: 68vh;
    height: auto;
    margin: 0 auto;
    background: #080d17;
    object-fit: contain;
}
.entry-audio-card {
    width: min(100%, 620px);
    margin: 30px auto;
    padding: 22px 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 18px;
    direction: ltr;
    background: linear-gradient(135deg, #f8f7f4, #eeedf0);
    border: 1px solid #d9dce3;
    border-left: 3px solid #9e2638;
    border-radius: 3px;
    box-shadow: 0 8px 24px rgba(24, 43, 73, 0.07);
}
.entry-audio-play {
    flex: 0 0 48px;
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 50%;
    background: #182b49;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: background .2s ease, transform .2s ease;
}
.entry-audio-play:hover { background: #9e2638; transform: scale(1.04); }
.entry-audio-details { flex: 1; min-width: 0; }
.entry-audio-heading {
    margin: 0 0 12px;
    color: #182b49;
    font: 11px/1.4 Georgia, serif;
    letter-spacing: 2px;
}
.entry-audio-track {
    width: 100%; height: 4px; appearance: none; -webkit-appearance: none;
    display: block; border-radius: 10px; outline: none; cursor: pointer;
    background: linear-gradient(to right, #9e2638 0%, #9e2638 0%, #d5d7dc 0%, #d5d7dc 100%);
}
.entry-audio-track::-webkit-slider-thumb {
    appearance: none; -webkit-appearance: none; width: 11px; height: 11px;
    border-radius: 50%; background: #9e2638; border: 2px solid #fff;
    box-shadow: 0 0 0 1px #9e2638;
}
.entry-audio-track::-moz-range-thumb {
    width: 9px; height: 9px; border-radius: 50%; background: #9e2638;
    border: 2px solid #fff; box-shadow: 0 0 0 1px #9e2638;
}
.entry-audio-times {
    display: flex; justify-content: space-between; margin-top: 8px;
    color: #777f8c; font: 11px/1.4 Georgia, serif; font-variant-numeric: tabular-nums;
}
.entry-audio-native { display: none; }

@media (max-width: 600px) {
    .entry-image { max-height: 62vh; padding: 4px; }
    .entry-photo-gallery {
        gap: 8px;
        margin-top: 20px;
    }
    .entry-photo-gallery .entry-image {
        max-height: 48vh;
        padding: 0;
    }
    .entry-photo-gallery .entry-image:first-child {
        width: 100%;
        max-width: 245px;
        height: min(48vh, 320px);
    }
    .entry-video-frame { padding: 7px; margin-top: 20px; }
    .entry-video { max-height: 60vh; }
    .entry-audio-card { padding: 17px 15px; gap: 13px; }
    .entry-audio-play { width: 43px; height: 43px; flex-basis: 43px; }
}
@media (max-width: 360px) {
    .entry-photo-gallery { gap: 5px; }
    .entry-photo-gallery .entry-image { padding: 0; }
}
`;
document.head.appendChild(mediaStyles);

function formatAudioTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
}

function addImage(src, parent) {
    const image = document.createElement("img");
    image.className = "entry-image";
    image.src = src;
    image.alt = "Archive photograph";
    image.loading = "lazy";
    parent.appendChild(image);
}

if (!container) {
    console.error("Entry content container was not found.");
} else if (!entry) {
    container.textContent = "Entry not found.";
} else {
    if (backLink) backLink.href = `night.html?night=${entry.night}`;

    const metadata = document.createElement("div");
    metadata.className = "entry-metadata";

    const type = document.createElement("p");
    type.className = "entry-type";
    const labels = {
        poem: "VERSE", prose: "REVERIE", conversation: "BETWEEN US",
        fragment: "A THOUGHT", note: "A NOTE", audio: "A VOICE",
        image: "A MOMENT", video: "IN MOTION"
    };
    type.textContent = labels[entry.type] || (entry.type || "entry").toUpperCase();
    metadata.appendChild(type);

    const night = document.createElement("p");
    night.className = "entry-night";
    night.textContent = `NIGHT ${String(entry.night).padStart(2, "0")}`;
    metadata.appendChild(night);

    if (entry.received && entry.received.trim() !== "") {
        const date = document.createElement("p");
        date.className = "entry-date";
        date.textContent = entry.received;
        metadata.appendChild(date);
    }
    container.appendChild(metadata);

    if (entry.content && entry.content.trim() !== "") {
        const content = document.createElement("div");
        content.className = "entry-text";
        content.textContent = entry.content;
        content.dir = "rtl";
        container.appendChild(content);
    }

    if (entry.media && entry.media.trim() !== "") {
        if (entry.mediaType === "image") {
            if (Number(entry.night) === 12) {
                const gallery = document.createElement("div");
                gallery.className = "entry-photo-gallery";
                addImage(entry.media, gallery);
                (entry.extraImages || []).forEach(function (src) {
                    addImage(src, gallery);
                });
                container.appendChild(gallery);
            } else {
                addImage(entry.media, container);
            }
        } else if (entry.mediaType === "audio") {
            const audio = document.createElement("audio");
            audio.className = "entry-audio-native";
            audio.preload = "metadata";
            audio.src = entry.media;

            const card = document.createElement("div");
            card.className = "entry-audio-card";

            const play = document.createElement("button");
            play.className = "entry-audio-play";
            play.type = "button";
            play.setAttribute("aria-label", "Play voice message");
            play.textContent = "▶";

            const details = document.createElement("div");
            details.className = "entry-audio-details";

            const heading = document.createElement("p");
            heading.className = "entry-audio-heading";
            heading.textContent = "VOICE MESSAGE";

            const track = document.createElement("input");
            track.className = "entry-audio-track";
            track.type = "range";
            track.min = "0";
            track.max = "1000";
            track.value = "0";
            track.setAttribute("aria-label", "Audio progress");

            const times = document.createElement("div");
            times.className = "entry-audio-times";
            const current = document.createElement("span");
            const total = document.createElement("span");
            current.textContent = "0:00";
            total.textContent = "0:00";
            times.appendChild(current);
            times.appendChild(total);

            details.appendChild(heading);
            details.appendChild(track);
            details.appendChild(times);
            card.appendChild(play);
            card.appendChild(details);
            container.appendChild(card);
            container.appendChild(audio);

            play.addEventListener("click", function () {
                if (audio.paused) {
                    const playPromise = audio.play();
                    if (playPromise && playPromise.catch) playPromise.catch(function () {});
                } else {
                    audio.pause();
                }
            });
            audio.addEventListener("play", function () {
                play.textContent = "Ⅱ";
                play.setAttribute("aria-label", "Pause voice message");
            });
            audio.addEventListener("pause", function () {
                play.textContent = "▶";
                play.setAttribute("aria-label", "Play voice message");
            });
            audio.addEventListener("loadedmetadata", function () {
                total.textContent = formatAudioTime(audio.duration);
            });
            audio.addEventListener("timeupdate", function () {
                current.textContent = formatAudioTime(audio.currentTime);
                const progress = audio.duration ? audio.currentTime / audio.duration * 100 : 0;
                track.value = String(progress * 10);
                track.style.background = `linear-gradient(to right, #9e2638 0%, #9e2638 ${progress}%, #d5d7dc ${progress}%, #d5d7dc 100%)`;
            });
            track.addEventListener("input", function () {
                if (audio.duration) audio.currentTime = Number(track.value) / 1000 * audio.duration;
            });
            audio.addEventListener("ended", function () {
                play.textContent = "▶";
                play.setAttribute("aria-label", "Play voice message");
            });
        } else if (entry.mediaType === "video") {
            const frame = document.createElement("div");
            frame.className = "entry-video-frame";
            const video = document.createElement("video");
            video.className = "entry-video";
            video.controls = true;
            video.playsInline = true;
            video.preload = "metadata";
            video.src = entry.media;
            frame.appendChild(video);
            container.appendChild(frame);
        }
    } else if (entry.image && entry.image.trim() !== "") {
        if (Number(entry.night) === 12) {
            const gallery = document.createElement("div");
            gallery.className = "entry-photo-gallery";
            addImage(entry.image, gallery);
            (entry.extraImages || []).forEach(function (src) {
                addImage(src, gallery);
            });
            container.appendChild(gallery);
        } else {
            addImage(entry.image, container);
        }
    }

    if (entry.note && entry.note.trim() !== "") {
        const note = document.createElement("p");
        note.className = "entry-note";
        note.textContent = entry.note;
        note.dir = "rtl";
        container.appendChild(note);
    }
}