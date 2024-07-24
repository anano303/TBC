document
  .getElementById("language-switch")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var defaultLanguage = document.querySelector(".default-language");
    var additionalLanguage = document.getElementById("language-switch");
    var temp = defaultLanguage.textContent;
    defaultLanguage.textContent = additionalLanguage.textContent;
    additionalLanguage.textContent = temp;
  });

function setupScrollableSection(
  containerSelector,
  lineSelector,
  prevButtonSelector,
  nextButtonSelector,
  movePercentage
) {
  const container = document.querySelector(containerSelector);
  const line = document.querySelector(lineSelector);
  const prevButton = document.querySelector(prevButtonSelector);
  const nextButton = document.querySelector(nextButtonSelector);

  if (!container || !line || !prevButton || !nextButton) return; // Early exit if any element is missing

  const containerWidth = container.clientWidth;
  const maxScrollLeft = container.scrollWidth - containerWidth;
  const maxLinePosition = containerWidth - line.clientWidth;

  let isDragging = false;
  let startX, startScrollLeft, startTransform;

  function updateLine() {
    const scrollRatio = container.scrollLeft / maxScrollLeft;
    line.style.transform = `translateX(${scrollRatio * maxLinePosition}px)`;
  }

  function handleScroll(percentage) {
    const scrollAmount = maxScrollLeft * (percentage / 100);
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    updateLine();
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    const newTransform = Math.min(
      Math.max(startTransform + dx, 0),
      maxLinePosition
    );
    line.style.transform = `translateX(${newTransform}px)`;
    container.scrollLeft = (newTransform / maxLinePosition) * maxScrollLeft;
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  line.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    startTransform =
      parseFloat(
        line.style.transform.replace("translateX(", "").replace("px)", "")
      ) || 0;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  prevButton.addEventListener("click", () => handleScroll(-movePercentage));
  nextButton.addEventListener("click", () => handleScroll(movePercentage));

  container.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      isDragging = true;
      startX = e.pageX;
      startScrollLeft = container.scrollLeft;
      function onMouseMove(e) {
        if (!isDragging) return;
        container.scrollLeft = startScrollLeft - (e.pageX - startX);
        updateLine();
      }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", () => {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupScrollableSection(".boxes2", ".blue-line", ".prev", ".next", 35);
  setupScrollableSection(".section5", ".blue-line2", ".prev2", ".next2", 100);
});
