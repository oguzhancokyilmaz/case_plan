
# Baykar Web Yazılım Test Uzmanı Case Planı

Verilen çalışmaların açıklamalarını burada bulabilirsiniz.

## 1. Manuel Testler:
Verilen çalışma için kariyer.baykar sitesine manuel test case'leri oluşturdum. /manuel_test_senaryolar klasörünün içinde .pdf formatında hazırladığım senaryoları görebilirsiniz. 
 

Test ID/ Test Senaryosu / Test Adımları / Beklenen Sonuç / Result tabloları kullandım. Daha detaylı bir tablo kurulabilir; gerçekleşen sonuç için açıklama, hata ekran görüntüsü için vb. alanlar eklenebilir. Ayrıca senaryolarımda pozitif case'ler kullandım. Örneğin yanlış email yada password girilip hata alındığını kontrol et gibi adımları eklemedim. Test yaklaşımımın anlaşılabileceğini düşündüğüm 12 test senaryosu ekledim tabloya.
## 2. Otomasyon Projesi
Otomasyon çalışmasını şuan aktif kullandığım ve sistemimde proje geliştirmeye zaten hazır olan Webdriver IO test otomasyon framework'ü ile tamamladım. Java ve Python yazılım dillerinde de yetkinliğim var, sadece daha hızlı ve kolay tamamlayacağıma inandığım için Javascript + Wdio + Cucumber + Javascript ile tamamladım projemi. Ayrıca github profilimde python/django ile geliştirdiğim rent car website projesini ve java + selenium + appium ile geliştirdiğim THY sipariş mobil otomasyon projesini görebilirsiniz. 


/src/features altında baykar.feature dosyasının içinde yazdığım senaryoları görebilirsiniz. 

Senaryoları tag'ler ile çalıştırabiliyoruz, her senaryonun kendine ait bir tag'i var. Eğer üç senaryoyu  da çalıştırmak istersek package.json içinde test:tag scriptine "@e2e" tag'ini verebiliriz. Eğer tek bir senaryoyu çalıştırmak istersek o senaryonun tag'ini package'deki test:tag scriptini senaryonun tag'ini ekleyerek sadece o senaryoyu koşabiliriz.
## Testler

Testleri çalıştırmak için aşağıdaki komutları sırayla çalıştırın

```bash
  yarn install
  yarn test:tag
```
*Testleri koşabilmek için bilgisayarınızda -node.js ve -google chrome yüklü olması gerekmektedir.
  
### Test Senaryosu - A
Bu senaryoda baykartech sitesine giderek, dropdown'a sahip ve dropdown olmayan menü sayılarını tespit edip tek tek dropdown içindeki menüler dahil tüm menüleri gezerek sayfalara gidebildiğimizi doğruluyoruz.
## 

!!! Kategorileri tek tek gezerken NELER YAPIYORUZ -> FAYDALI YÜK SİSTEMLERİ kategorilerinden https://baykartech.com/tr/faydali-yuk-sistemleri/ sayfasına gittiğimizde tekrar diğer kategoriye geçmek için NELER YAPIYORUZ kategorisine tıklarsak, kategori açılıp kapanıyor. Bir sonraki kategoriye geçebilmek için tekrar NELER YAPIYORUZ kategorisine basmamız gerekiyor. İkinci kez tıklandığında bu sefer menü kapanmıyor. Bu durum yüzünden otomasyon A case'i fail alıyordu fakat, eğer kategoriyi göremiyorsan bir üstteki kategoriye tekrar tıkla gibi bir mantıkla bir if yazarak düzelltim. 

  
### Test Senaryosu - B
Burada /libraries/language.json file içine ingilizce ve türkçe diller için 3 menünün türkçe ve ingilizce karşılıklarını girdim. Senaryoda Given change language "EN" adımı yazılırsa EN parametresini alıyoruz siteyi ingilizce diline çeviriyoruz, ilk 3 kategori dilini cucumber senaryosundan gelen parametreye göre json dosyasının içindeki ilk 3 kelimeyi karşılaştırıyor. Assertion sonucunda dilin değişip değişmediğine karar verebiliyoruz.
### Test Senaryosu - C
Bu case için tamamen cucumber koduyla yönetilebilir bir mantık kurdum. Action with table adında bir tablo adımı ekledim projeye. Bir tablo ile tamamen BDD yaklaşımı ile yönetebileceğimiz bir senaryo oluştu. Sadece bu tabloyla type/click/assertion/scroll gibi işlemleri kolayca yapabiliyoruz. Locator sütununa işlem yapmak istediğimiz locator'ı giriyoruz. Fakat bu locator'ı /Objects/BasePageObject.js dosyasının içine tanımlıyoruz. Tablodaki locator kolonuna da burada tanımlı olan locator ismini giriyoruz. Action sütunu yapmak istediğimiz işlemi seçiyoruz. Value sütununda ise gerekli parametreleri giriyoruz. Böylece sadece ön yüzden yönetilebilir bir search/filtre test senaryosu oluşturmuş oldum.
## 
https://prnt.sc/XRdu85bthrAi
https://prnt.sc/EmEAcSkt8FBN

## 3. Jmeter Yük/Performans Testleri
Jmeter projemi /jmeter_senaryolar/kariyer_baykar altında bulabilirsiniz. Testleri .bat dosyası ile koşup testin sonunda bir jmeter dashboard'da sonuç alabileceğimiz /log/index.html oluşturdum. Burada aldığım sonuçları resim olarak paylaşacağım.
## 
Burada 3 senaryo kurguladım ; Homepage, Random Category ve Random Search.
burada ilk senaryomuz ile sadece homepage'e belirli kullanıcıları belirli bir zaman aralığında anasayfada yük oluşturabiliyoruz.
## 
Random Category senaryomuzda jmeterda page variables içinde 9 farklı kategori girdim. Senaryo başlangıcında BeanShell ile bu 9 kategoriden random bir kategori seçiyor ve varnish vs cache var ise sitede bunu geçmek için url sonuna yine random bir sayı ekleyerek url bozarak o kategoriye istek atıyoruz. Burada 500 kişilik bir test koşacak olursak tüm yükleri aynı kategori yada sayfaya değil rastgele 9 kategoriye bölmüş oluyoruz biraz daha gerçekçi bir test olmasını istedim. Ayrıca işlemler arasında ufak random timerlar kullanarak gerçek kullanıcı simülasyonunu oluşturmaya çalıştım.
## 
Random search senaryomuzda da yine page variables içine 5 farklı search term girdim. Açık pozisyonlar sayfasındaki search için bir yük isteği oluşturdum. Burada da bir önceki senaryoda olduğu gibi kaç yük gönderirsek rastgele 5 farklı search term ile simüle etmiş oluyoruz.
## 
Homepage - https://prnt.sc/O7XUjaS0Pj8b
Homepage -> Random Category - https://prnt.sc/XzUt5KtplEZi
Homepage -> Random Position Search - https://prnt.sc/dMdfS9XDZUtX
