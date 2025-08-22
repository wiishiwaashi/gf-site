function zoomImage(original) {
    const overlay = document.querySelector(".overlay");

    // Clone the clicked .pic-cont
    const clone = original.cloneNode(true);
    const inner = clone.querySelector(".pic-inner");
    clone.classList.add("zoomed-clone");

    // Get original's position and size
    const rect = original.getBoundingClientRect();
    clone.style.position = "fixed";
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = 0;
    clone.style.transform = "none";

    document.body.appendChild(clone);

    // Store clone and original reference
    overlay.style.display = "block";
    overlay.zoomedClone = clone;
    overlay.zoomedOriginal = original;

    // Trigger zoom + flip
    requestAnimationFrame(() => {
        clone.style.top = "50%";
        clone.style.left = "50%";
        clone.style.transform = "translate(-50%, -50%)";
        inner.classList.add("flipped");
    });
}

function closeZoom() {
    const overlay = document.querySelector(".overlay");
    const clone = overlay.zoomedClone;
    const original = overlay.zoomedOriginal;

    if (!clone || !original) return;

    const inner = clone.querySelector(".pic-inner");

    // Flip back
    inner.classList.remove("flipped");

    // Get original position again (in case window scrolled/resized)
    const rect = original.getBoundingClientRect();
    clone.style.transform = "none";
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;

    // Remove after transition
    clone.addEventListener("transitionend", function handler(e) {
        if (e.propertyName === "top" || e.propertyName === "left") {
            clone.remove();
            overlay.style.display = "none";
            overlay.zoomedClone = null;
            overlay.zoomedOriginal = null;
            clone.removeEventListener("transitionend", handler);
        }
    });
}
