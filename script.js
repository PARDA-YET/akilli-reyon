document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const urunId = params.get("id");

  if (!urunId) {
    document.body.innerHTML = "<div class='text-center p-6'>Ürün ID'si bulunamadı.</div>";
    return;
  }

  try {
    const response = await fetch("veri/urunler.json");
    const data = await response.json();
    const urun = data[urunId];

    if (!urun) {
      document.body.innerHTML = "<div class='text-center p-6'>Ürün bulunamadı.</div>";
      return;
    }

    document.getElementById("urun-baslik").textContent = urun.ad;
    document.getElementById("urun-aciklama").textContent = urun.aciklama;
    document.getElementById("urun-gorsel").src = urun.gorsel;
    document.getElementById("urun-video").src = urun.video;
    document.getElementById("urun-pdf").href = urun.pdf;
    document.getElementById("urun-uygulama").textContent = urun.uygulama;

    const teknikListe = document.getElementById("teknik-ozellikler");
    urun.teknik.forEach(ozellik => {
      const li = document.createElement("li");
      li.textContent = ozellik;
      teknikListe.appendChild(li);
    });
  } catch (error) {
    console.error("Veri alınamadı:", error);
    document.body.innerHTML = "<div class='text-center p-6'>Veri yüklenirken hata oluştu.</div>";
  }
});