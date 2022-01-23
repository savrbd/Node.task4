document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "update") {
    const id = event.target.dataset.id;
    const defaultText =
      event.target.parentNode.previousSibling.textContent.trim();

    result = prompt("Введите новое название", [defaultText]);
    if (result) {
      const obj = { "title": result, "id": id };
      update(id, obj).then(()=>{
        event.target.parentNode.previousSibling.textContent = `${result}`
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
async function update(id, obj) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(obj),
  });
}
