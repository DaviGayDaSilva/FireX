async function build() {
  const html = document.getElementById("code").value;

  const res = await fetch("http://localhost:3000/build", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html })
  });

  const blob = await res.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "firex.apk";
  a.click();
}