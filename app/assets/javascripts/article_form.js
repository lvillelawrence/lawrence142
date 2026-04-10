(() => {
  document.querySelectorAll("#pseudoInput").forEach((el) => {
    el.addEventListener("keyup", (e) => {
      const trs = document.querySelectorAll("#pseudoTable tr:not(.header)")
      const val = e.target.value;
      const regex = new RegExp(val, "i");
      const inTable = td => regex.test(td.innerHTML);
      const isFound = cArr => cArr.some(inTable);
      const setDisplay = ({ style, children }) => {
        style.display = isFound([
          ...children
        ]) ? "" : "none"
      }
      trs.forEach(setDisplay);
    });
  });

  document.querySelectorAll(".pseudo-select").forEach((el) => {
    el.addEventListener("change", (e) => {
      const sel = document.querySelector(`#authors option[value="${e.target.dataset.id}"]`);
      if (e.target.checked) {
        sel.setAttribute("selected", "selected");
      } else {
        sel.removeAttribute("selected");
      }
    })
  });
})();