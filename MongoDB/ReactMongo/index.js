/// https://www.w3schools.com/nodejs/nodejs_mongodb_createcollection.asp 

const express = require("express");

const app = express();

const port = 3000;

app.listen(port, ()=>console.log("Çalıştı"));


app.get("/",(req,res)=>res.send("OK"));

let mongoSonuc = null;

app.get("/mongo", (req, res) => res.send(mongoSonuc));

const MongoMusteri = require("mongodb").MongoClient;

const mongoDbServer = "mongodb://localhost:27017";

const dbName = "Hello";


const veriGirisi = function(db,callback){

    const tablo = db.collection("calisanlar");
    tablo.insertMany (
    [
      { id: 1, adi: "Ahmet", soyadi: "Çınar", yas: 25 },
      { id: 2, adi: "Caner", soyadi: "Sarı", yas: 30 },
      { id: 3, adi: "Gülçin", soyadi: "Yılmaz", yas: 22 },
    ],
    function (err, docs){
        if (err) throw err;
            
        console.log("3 veri girildi");
        mongoSonuc = docs;
        callback(docs);
    });
};


const findDocuments = function (db, callback) {
   
    db.collection("calisanlar").find({}).toArray(function (err, docs) {
        if (err) throw err;
  
        console.log("Şu kayıtlar bulunmuştur;");
  
        console.log(docs);
        mongoSonuc = docs;
        callback(docs);
      });
  };

  const updateDocument = function (db, callback) {
    
    const collection = db.collection("calisanlar");
  
    
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
  
  
  const deleteDocument = function (db, callback) {
    
    const collection = db.collection("calisanlar");

    collection.deleteOne({ id: 2 }, function (err, result) {
      if (err) throw err;
  
      console.log("Id'si 2 olan kayıt silinmiştir.");
  
      callback(result);
    });
  };

MongoMusteri.connect(mongoDbServer, function(err,client)
{ 

    if (err) throw err;

    const db = client.db(dbName);
        
    veriGirisi(db,function(){
        updateDocument(db,function(){
           deleteDocument(db, function(){
               findDocument(db, function(){
                   client.close();
               });
           }); 
        });
    });
});





