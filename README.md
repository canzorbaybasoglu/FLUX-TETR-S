# FLUX // OVERDRIVE

Mobil ve PC için retro arcade blok puzzle. Neon tahta, CRT tarama çizgileri, hareketli perspektif zemin, parçacık patlamaları, ekran sarsıntısı ve sinematik kombo / bölüm / saldırı geçişleri.

## Hemen oyna

ZIP’i çıkar ve **index.html** dosyasını Chrome, Edge, Firefox veya Safari ile aç. Kurulum, hesap ve internet gerekmez. Telefonda dosya önizleyicisi JavaScript çalıştırmayabilir; arkadaşlarınla paylaşmak için aşağıdaki GitHub Pages yöntemini kullan.

## GitHub üzerinden arkadaşlarına bağlantı gönder

1. GitHub'da yeni bir repository oluştur (örnek: `flux-overdrive`).
2. ZIP’i bilgisayarında çıkar. İçindeki dosyaları, özellikle **index.html** dosyasını repository'nin köküne yükle. ZIP dosyasını olduğu gibi yükleme.
3. Repository **Settings → Pages → Build and deployment** bölümüne git.
4. **Deploy from a branch**, branch **main**, klasör **/(root)** seç ve kaydet.
5. GitHub Pages’in bu ekranda gösterdiği bağlantıyı arkadaşlarına gönder.

Bu paket bir GitHub repository'sine yüklenmeye hazırdır; kendiliğinden bir GitHub hesabına yüklenmiş değildir. Oyun tek kişiliktir. Her oyuncunun ilerlemesi kendi tarayıcısında saklanır; ortak skor tablosu veya hesap sistemi yoktur. Tarayıcı depolamayı engelliyorsa oyun çalışır ama kayıt korunmayabilir.

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

## Geliştirme

`dist/` düzenlenebilir HTML, CSS ve JavaScript kaynaklarını içerir. Harici kütüphane veya bağımlılık yoktur.

```sh
node check.mjs
python3 scripts/build-standalone.py
```

Kaynaklarda değişiklik yaptıktan sonra ikinci komutu çalıştırarak kökteki tek dosyalık oyunu güncelle. `index.html` GitHub Pages'in giriş dosyasıdır. Kaynak sürümünü yerel sunucuda açmak istersen `python3 -m http.server 8000 --directory dist` komutunu kullan.

Kontrol edilen kurallar: yerleşim sınırları, çakışma, dört dönüş, eşzamanlı satır/sütun temizleme, oyun sonu, Darbe kenarları, baskı artışı ve soğutma, parazit ekleme, büyük parça dönüşleri. Gerçek mobil cihaz çeşitlerinin tamamında test yapılmadı.
