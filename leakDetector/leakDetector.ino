#include <WiFi.h>
#include <HTTPClient.h>

// ================= 1. KONFIGURASI WIFI & SERVER =================
const char* ssid = "Thursina Learning"; 
const char* password = "";              
// GANTI "192.168.x.x" dengan IP Laptop kamu (cek di CMD: ipconfig)
const char* serverUrl = "http://192.168.30.140:5000/api/lapor"; 

// ================= 2. DEKLARASI PIN ESP32-S3 =================
const int piezoPin = 4;    // Sensor Piezo
const int ledBocor  = 15;  // MERAH  (Status: LEAK)
const int ledKosong = 16;  // KUNING (Status: KOSONG)
const int ledNormal = 17;  // HIJAU  (Status: NORMAL)

// ================= 3. AMBANG BATAS (THRESHOLD) =================
// Silakan ubah angka ini sesuai hasil percobaan di pipa asli
int thresholdNormal = 500; // Getaran minimal dianggap ada air mengalir
int thresholdBocor  = 1500; // Getaran sangat kuat dianggap bocor

// ================= 4. VARIABEL TIMING & DATA =================
unsigned long lastTelemetryTime = 0;
const long telemetryInterval = 3000; // Kirim data ke web tiap 3 detik
int nilaiTertinggi = 0;

void setup() {
  Serial.begin(115200);
  delay(2000); // Tunggu Serial Monitor siap
  
  pinMode(ledBocor, OUTPUT);
  pinMode(ledKosong, OUTPUT);
  pinMode(ledNormal, OUTPUT);
  
  analogReadResolution(12); // ESP32-S3 pakai 12-bit (0-4095)

  // Test Lampu saat Booting (Biar tahu LED tidak putus)
  Serial.println("Self-test LED...");
  digitalWrite(ledBocor, HIGH); delay(500);
  digitalWrite(ledKosong, HIGH); delay(500);
  digitalWrite(ledNormal, HIGH); delay(500);
  matikanSemuaLED();

  // KONEKSI WIFI
  Serial.println("Menghubungkan ke: " + String(ssid));
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  
  Serial.println("\nWiFi Terhubung!");
  Serial.print("IP Alat: "); Serial.println(WiFi.localIP());
}

void loop() {
  int piezoValue = analogRead(piezoPin);
  String statusSekarang = "";

  // Pantau nilai tertinggi selama jeda interval pengiriman
  if (piezoValue > nilaiTertinggi) {
    nilaiTertinggi = piezoValue;
  }

  // ================= LOGIKA KATEGORI & LED =================
  
  if (piezoValue >= thresholdBocor) {
    // KONDISI BOCOR (MERAH)
    statusSekarang = "LEAK";
    nyalakanSatuLED(ledBocor);
  } 
  else if (piezoValue >= thresholdNormal) {
    // KONDISI NORMAL (HIJAU)
    statusSekarang = "NORMAL";
    nyalakanSatuLED(ledNormal);
  } 
  else {
    // KONDISI KOSONG (KUNING)
    statusSekarang = "KOSONG";
    nyalakanSatuLED(ledKosong);
  }

  // Debug ke Serial Monitor
  if (piezoValue > 50) { // Tampilkan hanya jika ada getaran biar tidak spam
    Serial.println("Getaran: " + String(piezoValue) + " | Status: " + statusSekarang);
  }

  // ================= PENGIRIMAN DATA KE WEB =================
  if (millis() - lastTelemetryTime > telemetryInterval) {
    
    // Kirim status berdasarkan nilai tertinggi yang tertangkap
    String statusKirim = "";
    if (nilaiTertinggi >= thresholdBocor) statusKirim = "LEAK";
    else if (nilaiTertinggi >= thresholdNormal) statusKirim = "NORMAL";
    else statusKirim = "KOSONG";

    kirimDataWeb(nilaiTertinggi, statusKirim);
    
    // Reset nilai tertinggi untuk putaran berikutnya
    nilaiTertinggi = 0;
    lastTelemetryTime = millis();
  }

  delay(50); // Jeda sampling stabil
}

// ================= FUNGSI-FUNGSI PEMBANTU =================

void nyalakanSatuLED(int pinAktif) {
  digitalWrite(ledBocor,  (pinAktif == ledBocor)  ? HIGH : LOW);
  digitalWrite(ledKosong, (pinAktif == ledKosong) ? HIGH : LOW);
  digitalWrite(ledNormal, (pinAktif == ledNormal) ? HIGH : LOW);
}

void matikanSemuaLED() {
  digitalWrite(ledBocor, LOW);
  digitalWrite(ledKosong, LOW);
  digitalWrite(ledNormal, LOW);
}

void kirimDataWeb(int nilai, String status) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Format JSON: {"nilai": 500, "status": "NORMAL"}
    String payload = "{\"nilai\":" + String(nilai) + ", \"status\":\"" + status + "\"}";
    
    int httpCode = http.POST(payload);

    if (httpCode > 0) {
      Serial.println("[Web] Berhasil kirim: " + status + " (" + String(nilai) + ")");
    } else {
      Serial.println("[Web] Error: " + String(httpCode));
    }
    http.end();
  } else {
    Serial.println("[WiFi] Putus! Gagal kirim data.");
  }
}