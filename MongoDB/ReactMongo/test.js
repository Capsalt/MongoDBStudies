// npm install express --save
// npm install -g express
//KONSOLA ÜSTTEKİ İKİ SORGUYU ENTER EDEREK EXPRESS KÜTÜPHANESİNİ PROJEMİZE EKLİYORUZ, ALTTA DA EXPRESS KULLANARAK BAĞLANACAĞIMIZ PORT U BELİRTİYORUZ
const express = require("express");
const app = express();
const port = 3000;
//bağlandığını görmek için
app.listen(port, () => console.log(port+ " port çalışıyor " ));
//browser a localhost:3000 yazınca alttaki çıksın
app.get("/", (req, res) => res.send("GAYET BASARILI"));
//BAĞLAMA OLAYINI ŞİMDİ YAP (CLİENT)

var calısıncaMongoSonuc = null; //burayı alttaki 4 metodla doldurup update delete yapıyoruz, hepsi görebilsin diye önce buraya atadık

// Bu kod satırı, collection un  verilerini tarayıcıda yazdıracak,
// tarayıcı url çubuğuna girdiğinizde: http://localhost:3000/mongo yazıp görebilirsiniz.(response=res=yanıt)
app.get("/mongo", (req, res) => res.send(calısıncaMongoSonuc));

//4 tane metod oluşturduk ve metodda oluşan sonuçları calısıncaMongoSonuc e atadık
// 1)Create / Insert
const insertDocuments = function (db, callback) {
  // Koleksiyon, db objesinden alınır
  const collection = db.collection("employees");

  // Koleksiyona çoklu ekleme işlemi
  collection.insertMany(
    [
      { id: 1, adi: "Ahmet", soyadi: "Çınar", yas: 25 },
      { id: 2, adi: "Caner", soyadi: "Sarı", yas: 30 },
      { id: 3, adi: "Gülçin", soyadi: "Yılmaz", yas: 22 },
    ],
    function (err, docs) {
      if (err) throw err;

      console.log("Koleksiyona 3 döküman eklenmiştir.");
      calısıncaMongoSonuc = docs;
      callback(docs);
    }
  );
};

// 2) Read / Search
const findDocuments = function (db, callback) {
  // Koleksiyon, db objesinden alınır
  //const collection = db.collection("employees");

  // Id'si 3 olan kayıtı arama işlemi için: collection.find({ id: 3})
  // Tüm kayıtları listelemek: collection.find({}) şeklinde kullanabilirsiniz.
  db.collection("employees").find({}).toArray(function (err, docs) {
      if (err) throw err;

      console.log("Şu kayıtlar bulunmuştur;");

      console.log(docs);
      calısıncaMongoSonuc = docs;
      callback(docs);
    });
};

// 3) Update
const updateDocument = function (db, callback) {
  // Koleksiyon, db objesinden alınır
  const collection = db.collection("employees");

  // İlk parametre ile güncellenecek kayıt bulunur, sonra istenilen field'ı güncellenir.
  collection.updateOne(
    { id: 1 },
    { $set: { yas: 26 } },
    function (err, result) {
      if (err) throw err;

      console.log("1 Id'li kaydın yaşı güncellenmiştir.");

      callback(result);
    }
  );
};

//4) Delete
const deleteDocument = function (db, callback) {
  // Koleksiyon, db objesinden alınır
  const collection = db.collection("employees");

  // Silme işlemi id alanı üzerinden yapılır
  collection.deleteOne({ id: 2 }, function (err, result) {
    if (err) throw err;

    console.log("Id'si 2 olan kayıt silinmiştir.");

    callback(result);
  });
};

/// https://www.w3schools.com/nodejs/nodejs_mongodb_createcollection.asp adresinde örnek
// MongoDB Client oluşturma
// MongoDB'de bir veritabanı oluşturmak için bir MongoClient nesnesi oluşturarak başlayın, ardından doğru ip adresi ve oluşturmak istediğiniz veritabanının adıyla bir bağlantı URL'si belirtin.

// MongoDB, mevcut değilse veritabanını oluşturacak ve onunla bağlantı kuracaktır.
//ALTTA YAPTIĞIMIZ BÜTÜN BAĞLANMA İŞLEMLERİNDE FİX YAZILACAK İŞLEMLERDİR, BAĞLANIP, TARAYICIDA GÖRMEK İSTEDİĞİM METODLARI YERLEŞTİRDİM. METODLARIN HEPSİ AÇIKKEN TARAYICIDA EN SON METODU GÖSTERİR. HEPSİNİ GÖRMEK İSTERSEK (İSTENMEYENLERİ) YORUMA ALIP ÇALIŞTIRMALIYIZ.BU ARADA CONSOL DA (TERMİNAL) AYNI ANDA BÜTÜN METODLARIN SONUCUNU GÖREBİLİRİZ
// MongoDB Client oluşturma
const MongoClient = require("mongodb").MongoClient;

// MongoDB sunucu adresi (bizim sürekli bağlandığımız)
const mongoDbServer = "mongodb://localhost:27017";

// Database adı
const dbName = "hellomongo";

// Sunucuya bağlanma
MongoClient.connect(mongoDbServer, function (err, client) {
   if (err) throw err;
  const db = client.db(dbName);

  console.log("Bağlantı başarıyla kuruldu");

  insertDocuments(db, function () {
   updateDocument(db, function () {
    deleteDocument(db, function () {
  findDocuments(db, function () {
           client.close();
         });
       });
  });
});
}); //YAZMA İŞLEMİ BİTİNCE TERMİNAL E EN ÜSTTEKİ EXPRESS İŞLEMLERİNİ  GİRDİKTEN SONRA NODE İNDEX.JS YAZARAK KODUMUZU ÇALIŞTIRIYORUZ