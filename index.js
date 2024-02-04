const mysql = require('mysql');
const qrcode = require('qrcode-terminal');
const validator = require('validator');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'session'
    }),
    puppeteer: {
		args: ['--no-sandbox'],
	}
});
client.initialize();

// Konfigurasi MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'lanihu'
};

// Membuat koneksi MySQL
const conn = mysql.createConnection(dbConfig);

// Membuka koneksi MySQL
conn.connect((err) => {
    if (err) {
        console.error('Koneksi ke database Gagal :', err.message);
        return;
    }

    console.log('Koneksi ke database berhasil')
});

client.on('qr', (qr) => {
    console.log('QR Code received, scan it to login');
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    console.log(`New message received from ${msg.from}: ${msg.body}`);

    let pesanHitung = validator.escape(msg.body.toLowerCase());

    const selectQuery = `SELECT * FROM saksis WHERE no_hp = '${getPhoneNumber(msg.from)}'`;

    conn.query(selectQuery, (error, rsaksi) => {
        if (rsaksi.length > 0) {
            
            if (pesanHitung.includes('a.')) {
                hitung = pesanHitung.split('.');
                
                if (hitung.length == 4) {
                    conn.query(`SELECT * FROM calegs WHERE partai_id = '${hitung[1]}' AND no_urut = '${hitung[2]}'`, (error, rcaleg) => {
                        if(rcaleg.length > 0) {

                            conn.query(`SELECT * FROM suaras WHERE saksi_id = '${rsaksi[0].id}' AND caleg_id = '${rcaleg[0].id}' `, (error, rsuara) => {

                                console.log(rsuara);

                                if (rsuara.length > 0) {

                                    conn.query(`UPDATE suaras SET jumlah = '${hitung[3]}' WHERE id = '${rsuara[0].id}'`, (error, rupdatesuara) => {
                                        if (error) {
                                            console.error('Error executing UPDATE query:', error.message);
                                        } else {
                                            client.sendMessage(msg.from, `No. ${rcaleg[0].no_urut} an. ${rcaleg[0].name} berhasil di update dengan jumlah suara = ${hitung[3]}.`);
                                        }
                                    });

                                } else {
                                    console.log(rcaleg[0].name);
        
                                    conn.query(`INSERT INTO suaras  (id, saksi_id, caleg_id, tps_id, partai_id, jumlah) VALUES (NULL, ${rsaksi[0].id}, ${rcaleg[0].id}, ${rsaksi[0].tps_id}, ${rcaleg[0].partai_id}, ${hitung[3]});
                                    `, (error, rsuara) => {
                                        if (error) {
                                            console.error('Error executing INSERT query:', error.message);
                                        } else {
                                            client.sendMessage(msg.from, `No. ${rcaleg[0].no_urut} an. ${rcaleg[0].name} berhasil di tambah dengan jumlah suara = ${hitung[3]}.`);
                                        }
        
                                    });
                                }

                            })

                        } else {
                            client.sendMessage(msg.from, 'Caleg tidak ditemukan.');
                        }
                    });

                } else {
                    client.sendMessage(msg.from, 'Format yang anda ketik salah! masukan format dengan benar contoh: in.1.3.76');
                }
            } else if (pesanHitung.includes('ls')) {
                
                conn.query(`SELECT * FROM suaras WHERE saksi_id = '${rsaksi[0].id}'`, (error, rsuara) => {
                    rsuara.forEach((item, index) => {
                        conn.query(`SELECT * FROM calegs WHERE id = '${item.caleg_id}'`, (error, rquerycaleg) => {
                            client.sendMessage(msg.from, `No. ${rquerycaleg[0].no_urut} an. ${rquerycaleg[0].name} dengan jumlah suara = ${item.jumlah}.`);
                        });
                    });
                });
        
            } else if (pesanHitung.includes('p.')) {
            
                hitung = pesanHitung.split('.');
                
                if (hitung.length == 2) {

                    conn.query(`SELECT * FROM suaras WHERE saksi_id = '${rsaksi[0].id}'`, (error, rsuara) => {

                        conn.query(`SELECT * FROM partai WHERE no_partai = '${hitung[1]}'`, (error, rpartai) =>
                        {
                            
                            if (rpartai.length > 0) {
                                client.sendMessage(msg.from, rpartai[0].nama_partai);
                                
                                rsuara.forEach((item, index) => {
                                    conn.query(`SELECT * FROM calegs WHERE id = '${item.caleg_id}' AND partai_id = '${hitung[1]}'`, (error, rquerycaleg) => {
                                        if (rquerycaleg.length > 0) {
                                            client.sendMessage(msg.from, `No. ${rquerycaleg[0].no_urut} an. ${rquerycaleg[0].name} dengan jumlah suara = ${item.jumlah}.`);
                                        } 
                                    });
                                });
                            } else {
                                client.sendMessage(msg.from, `Partai dengan nomor urut =  ${hitung[1]} tidak ditemukan!`);
                            }

                        });

                    });


                } else {
                    client.sendMessage(msg.from, 'Format yang anda ketik salah! masukan format dengan benar contoh: partai.3');
                }
        
            } else if (pesanHitung.includes('i.')) {
                hitung = pesanHitung.split('.');
                
                if (hitung.length == 2) {

                    hitungCaleg = pesanHitung.split('#');

                    console.log(hitungCaleg);
                    

                    if (hitungCaleg.length == 2) {

                        hitungCalegArray = hitungCaleg[1].split(',');
                        console.log(hitungCalegArray);
                        let a = 1;
                        for (let i = 0; i < hitungCalegArray.length; i++) {
                            const jmlSuaraCaleg = hitungCalegArray[i];
                            console.log(jmlSuaraCaleg);
                            
                            conn.query(`SELECT * FROM calegs WHERE partai_id = '${hitung[1]}' AND no_urut = '${a++}'`, (error, rcaleg) => {
                                if(rcaleg.length > 0) {
    
                                    conn.query(`SELECT * FROM suaras WHERE saksi_id = '${rsaksi[0].id}' AND caleg_id = '${rcaleg[0].id}' `, (error, rsuara) => {
    
                                        console.log(rsuara);
        
                                        if (rsuara.length > 0) {
        
                                            conn.query(`UPDATE suaras SET jumlah = '${jmlSuaraCaleg}' WHERE id = '${rsuara[0].id}'`, (error, rupdatesuara) => {
                                                if (error) {
                                                    console.error('Error executing UPDATE query:', error.message);
                                                } else {
                                                    client.sendMessage(msg.from, `No. ${rcaleg[0].no_urut} an. ${rcaleg[0].name} berhasil di update dengan jumlah suara = ${jmlSuaraCaleg}.`);
                                                }
                                            });
        
                                        } else {
                                            console.log(rcaleg[0].name);
                
                                            conn.query(`INSERT INTO suaras  (id, saksi_id, caleg_id, tps_id,partai_id, jumlah) VALUES (NULL, ${rsaksi[0].id}, ${rcaleg[0].id}, ${rsaksi[0].tps_id}, ${rcaleg[0].partai_id}, ${jmlSuaraCaleg});
                                            `, (error, rsuara) => {
                                                if (error) {
                                                    console.error('Error executing INSERT query:', error.message);
                                                } else {
                                                    client.sendMessage(msg.from, `No. ${rcaleg[0].no_urut} an. ${rcaleg[0].name} berhasil di tambah dengan jumlah suara = ${jmlSuaraCaleg}.`);
                                                }
                
                                            });
                                        }
        
                                    })
        
                                } else {
                                    client.sendMessage(msg.from, `Caleg tidak ditemukan.`);
                                }
                            });

                        }
                        
                    } else {
                        client.sendMessage(msg.from, 'Format yang anda ketik salah! masukan format dengan benar contoh: id.1#12,13,56,23');
                    }

                } else {
                    client.sendMessage(msg.from, 'Format yang anda ketik salah! masukan format dengan benar contoh: id.1#12,13,56,23');
                }
        
            } else if (message.hasMedia) {
                    // Unduh lampiran
                const media = message.downloadMedia();

                // Lakukan sesuatu dengan media, seperti menyimpan ke file
                // Di sini, kita hanya menampilkan tipe media untuk tujuan demonstrasi
                console.log(`Received ${media.type} from ${message.from}`);
            } else {
            client.sendMessage(msg.from, 'Selamat datang di layanan kami. \n 1. input data berdasarkan partai \n ketik i.[nomor urut partai]#[Jumlah Suara Nomor Urut 1],[Jumlah Suara Nomor Urut 2],[Jumlah Suara Nomor Urut 3],[Jumlah Suara Nomor Urut 4],[Jumlah Suara Nomor Urut ...] \n *contoh: i.4#12,22,33,21,25,67* \n 2. melihat hasil suara ketik p.[nomor urut partai] contoh: p.1 \n 3. menginput jumlah suara perorangan, a.[nomor urut partai].[nomor urut caleg].[jumlah suara] \n *contoh: a.4.1* %0 \n 4. melihat semua suara ketik LS');
            }
        } else {
            client.sendMessage(msg.from, 'Anda belum terdaftar, *silahkan menghubungi admin* untuk mulai menginput *perhitungan suara*!');
        }
    });

});

function getPhoneNumber(from) {
    // Menggunakan regex untuk memisahkan nomor telepon dari format nomor@c.us
    const match = from.match(/(\d+)@c\.us/);

    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}





