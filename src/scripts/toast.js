export function toast(text, color) {
    Toastify({
      text: text,
      duration: 3000,
      gravity: 'top',
      position: 'center',
      style: {
        background: color,
        width: "207px",
        height: "68px",
        "border-radius": "10px",
        "text-align": "center"
      }
    }).showToast()
  }