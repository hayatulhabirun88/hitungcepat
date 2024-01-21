const mysql = require('mysql');
const qrcode = require('qrcode-terminal');
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
  database: 'hitungcepat'
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
    if (msg.body === '!ping') {
		client.sendMessage(msg.from, 'pong');
        console.log(msg.from);
	}

    let pesanHitung = msg.body.toLowerCase();

    if (pesanHitung.includes('in.')) {
        // Mengambil nomor handphone dari database
        const selectQuery = `SELECT * FROM saksi WHERE no_hp = '${getPhoneNumber(msg.from)}'`;
    
        conn.query(selectQuery, (error, rsaksi) => {
  
            if (rsaksi.length > 0) {
                hitung = pesanHitung.split('.');
                
                if (hitung.length == 4) {
                    conn.query(`SELECT * FROM caleg WHERE partai_id = '${hitung[1]}' AND no_urut = '${hitung[2]}'`, (error, rcaleg) => {
                        if(rcaleg.length > 0) {

                            conn.query(`SELECT * FROM suara WHERE saksi_id = '${rsaksi[0].id}' AND caleg_id = '${rcaleg[0].id}' `, (error, rsuara) => {

                                console.log(rsuara);

                                if (rsuara.length > 0) {

                                    conn.query(`UPDATE suara SET jumlah = '${hitung[3]}' WHERE id = '${rsuara[0].id}'`, (error, rupdatesuara) => {
                                        if (error) {
                                            console.error('Error executing UPDATE query:', error.message);
                                        } else {
                                            client.sendMessage(msg.from, `No. ${rcaleg[0].no_urut} an. ${rcaleg[0].nama_caleg} berhasil di update dengan jumlah suara = ${hitung[3]}.`);
                                        }
                                    });

                                } else {
                                    console.log(rcaleg[0].nama_caleg);
        
                                    conn.query(`INSERT INTO suara (id, saksi_id, caleg_id, tps_id, jumlah) VALUES (NULL, ${rsaksi[0].id}, ${rcaleg[0].id}, ${rsaksi[0].tps_id}, ${hitung[3]});
                                    `, (error, rsuara) => {
                                        if (error) {
                                            console.error('Error executing INSERT query:', error.message);
                                        } else {
                                            client.sendMessage(msg.from, `No. ${rcaleg[0].no_urut} an. ${rcaleg[0].nama_caleg} berhasil di tambah dengan jumlah suara = ${hitung[3]}.`);
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

            } else {
                client.sendMessage(msg.from, 'Anda belum terdaftar');
            }
        });
	}

    if (pesanHitung.includes('list')) {
            // Mengambil nomor handphone dari database
            const selectQuery = `SELECT * FROM saksi WHERE no_hp = '${getPhoneNumber(msg.from)}'`;

            conn.query(selectQuery, (error, rsaksi) => {
        
                if (rsaksi.length > 0) {
                    
                    conn.query(`SELECT * FROM suara WHERE saksi_id = '${rsaksi[0].id}'`, (error, rsuara) => {
                        rsuara.forEach((item, index) => {
                            conn.query(`SELECT * FROM caleg WHERE id = '${item.caleg_id}'`, (error, rquerycaleg) => {
                                
                            });
                        });
                    });

                } else {
                    client.sendMessage(msg.from, 'Anda belum terdaftar');
                }
            });
    }
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





