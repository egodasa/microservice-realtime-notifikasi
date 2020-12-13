# Microservice Websocket With NodeJS
Dengan microservice ini, aplikasi Anda bisa mendapatkan fitur realtie notification.
Caranya adalah aplikasi utama Anda hanya perlu mengakses API microservice ini dan otomatis aplikasi Anda akan menerima notifikasi websocket

Cara pakai :
1. Clone repo ini
1. Buka file index.js dan baca bagian konfigurasi (baris 1 - 10) (OPTIONAL)
1. Install dependency `npm install`
1. Jalankan aplikasi ini `node index.js`
1. Panggil API aplikasi ini dengan URL `/emit` metode `POST` dengan parameter : <br> channel: Nama channel yang ingin dibroadcast <br> message: pesan yang ingin dikirim lewat websocket <br> token: token JWT yang digenerate sesuai konfigurasi di `index.js` dan dikirim melalui header `Authorization`
1. Contoh pemakaian pada klien dapat dilihat di file `index.html`
1. Microservice ini menggunakan library `socket.io` untuk menggunakan fitur websocket. Baik sisi server maupun klien.
1. Microservice ini dapat dikombinasikan dengan berbagai macam perangkat lunak tergantung ketersediaan `socket.io` terhadap sebuah bahasa pemrograman