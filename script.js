document.querySelectorAll(".language-selector").forEach((selector) => {
  const languageSwitch = selector.querySelector("#language-switch");
  const defaultLanguage = selector.querySelector(".default-language");

  languageSwitch.addEventListener("click", function (event) {
    event.preventDefault();
    var temp = defaultLanguage.textContent;
    defaultLanguage.textContent = languageSwitch.textContent;
    languageSwitch.textContent = temp;
  });
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

  function updateDimensions() {
    containerWidth = container.clientWidth;
    maxScrollLeft = container.scrollWidth - containerWidth;
    maxLinePosition = containerWidth - line.clientWidth;
  }

  let containerWidth, maxScrollLeft, maxLinePosition;
  updateDimensions();

  let isDragging = false;
  let startX, startScrollLeft, startTransform;

  function updateLine() {
    const scrollRatio = container.scrollLeft / maxScrollLeft;
    line.style.transform = `translateX(${scrollRatio * maxLinePosition}px)`;
  }

  function handleScroll(percentage) {
    const scrollAmount = containerWidth * (percentage / 100);
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    const dx = (e.pageX || e.touches[0].pageX) - startX;
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
    document.removeEventListener("touchmove", onMouseMove);
    document.removeEventListener("touchend", onMouseUp);
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

  line.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    startTransform =
      parseFloat(
        line.style.transform.replace("translateX(", "").replace("px)", "")
      ) || 0;
    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("touchend", onMouseUp);
  });

  prevButton.addEventListener("click", () => handleScroll(-movePercentage));
  nextButton.addEventListener("click", () => handleScroll(movePercentage));

  container.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      isDragging = true;
      startX = e.pageX;
      startScrollLeft = container.scrollLeft;

      document.addEventListener("mousemove", onMouseMoveContainer);
      document.addEventListener("mouseup", onMouseUpContainer);
    }
  });

  container.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    startScrollLeft = container.scrollLeft;

    document.addEventListener("touchmove", onMouseMoveContainer);
    document.addEventListener("touchend", onMouseUpContainer);
  });

  function onMouseMoveContainer(e) {
    if (!isDragging) return;
    const pageX = e.pageX || e.touches[0].pageX;
    container.scrollLeft = startScrollLeft - (pageX - startX);
    updateLine();
  }

  function onMouseUpContainer() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMoveContainer);
    document.removeEventListener("mouseup", onMouseUpContainer);
    document.removeEventListener("touchmove", onMouseMoveContainer);
    document.removeEventListener("touchend", onMouseUpContainer);
  }

  container.addEventListener("scroll", updateLine);
  window.addEventListener("resize", updateDimensions);
}

document.addEventListener("DOMContentLoaded", () => {
  setupScrollableSection(".boxes2", ".blue-line", ".prev", ".next", 35);
  setupScrollableSection(".section5", ".blue-line2", ".prev2", ".next2", 100);
});

document.addEventListener("DOMContentLoaded", () => {
  const names = document.querySelectorAll(".name");

  names.forEach((name) => {
    name.addEventListener("click", () => {
      const parent = name.parentNode;
      const arrow = name.querySelector(".logo");
      const option = parent.querySelector(".option");

      if (parent.classList.contains("active")) {
        // If the section is already active, close it
        parent.classList.remove("active");
        arrow.classList.remove("rotate");
        option.style.maxHeight = null;
      } else {
        // Close all other sections
        names.forEach((n) => {
          const otherParent = n.parentNode;
          const otherArrow = n.querySelector(".logo");
          const otherOption = otherParent.querySelector(".option");

          otherParent.classList.remove("active");
          otherArrow.classList.remove("rotate");
          otherOption.style.maxHeight = null;
        });

        // Open the clicked section
        parent.classList.add("active");
        arrow.classList.add("rotate");
        option.style.maxHeight = option.scrollHeight + "px";
      }
    });
  });
});

// navbar on mobile version

document.addEventListener("DOMContentLoaded", () => {
  const openImg = document.querySelector(".mobileBar .open");
  const closeImg = document.querySelector(".mobileBar .close");
  const mobileNavbar = document.querySelector(".mobileNavbar");

  openImg.addEventListener("click", () => {
    openImg.style.opacity = 0;
    openImg.style.pointerEvents = "none";
    closeImg.style.opacity = 1;
    closeImg.style.pointerEvents = "auto";
    mobileNavbar.style.display = "block";
    setTimeout(() => {
      mobileNavbar.style.opacity = 1;
    }, 10);
  });

  closeImg.addEventListener("click", () => {
    closeImg.style.opacity = 0;
    closeImg.style.pointerEvents = "none";
    openImg.style.opacity = 1;
    openImg.style.pointerEvents = "auto";
    mobileNavbar.style.opacity = 0;
    setTimeout(() => {
      mobileNavbar.style.display = "none";
    }, 300);
  });
});
