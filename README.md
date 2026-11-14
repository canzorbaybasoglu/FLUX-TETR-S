# FLUX // OVERDRIVE

## Oynanış ve zorluk

- 8×8 tahtaya üçlü tepsiden blok yerleştir. Tam satır ve sütunlar aynı anda temizlenir.
- Başlangıçta 5 parazit blok ve 20 enerji vardır.
- Temizleme olmayan her hamlede baskı: `20 + min(15, (seviye−1) × 3)`.
- %100 baskıda 3–7 yeni parazit blok eklenir, baskı sıfırlanır.
- Her temizlenen çizgi baskıyı 35 düşürür ve 15 enerji verir.
- Her 5 çizgide seviye yükselir. Seviye 2’de büyük parçalar, seviye 4’te 3×3 dev blok dahil daha zorlu havuz açılır.
- Aynı hamlede çoklu çizgi ve art arda temizleme, puan çarpanını artırır.
- Darbe 75 enerji harcar; seçilen karenin çevresindeki 3×3 alanı açar.
- Döndürme ücretsizdir. Son hamle bir kez geri alınabilir.
- Süre sınırı yoktur. Hiçbir parça hiçbir dönüşte sığmıyorsa ve Darbe enerjin yoksa oyun biter.

## Kontroller

| İşlem | PC | Mobil |
|---|---|---|
| Blok seç | Fare / 1, 2, 3 | Bloğa dokun |
| Yerleştir | Tahtaya tıkla / oklar + Enter | Tahtaya dokun |
| Döndür | R / Döndür | Döndür |
| Geri al | Z / Geri al | Geri al |
| Darbe | Darbe, sonra kare seç | Darbe, sonra kareye dokun |
| Darbe iptal | Esc / Darbe | Darbe’ye tekrar dokun |

Yerleştirme noktası bloğun sol üst köşesidir. Sağ üstteki **♪** ses efektlerini açar. **◉** animasyonları ve CRT efektini azaltır; sistemin azaltılmış hareket tercihine de uyulur.


Kaynaklarda değişiklik yaptıktan sonra ikinci komutu çalıştırarak kökteki tek dosyalık oyunu güncelle. `index.html` GitHub Pages'in giriş dosyasıdır. Kaynak sürümünü yerel sunucuda açmak istersen `python3 -m http.server 8000 --directory dist` komutunu kullan.

Kontrol edilen kurallar: yerleşim sınırları, çakışma, dört dönüş, eşzamanlı satır/sütun temizleme, oyun sonu, Darbe kenarları, baskı artışı ve soğutma, parazit ekleme, büyük parça dönüşleri. Gerçek mobil cihaz çeşitlerinin tamamında test yapılmadı.
