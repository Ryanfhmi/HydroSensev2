const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Store the latest sensor data
let latestSensorData = {
  nilai: 0,
  status: 'normal',
  timestamp: new Date().toISOString(),
};

/**
 * POST /api/lapor
 * Receive data from ESP32 sensor
 * Expected payload: { "nilai": int, "status": string }
 */
app.post('/api/lapor', (req, res) => {
  try {
    const { nilai, status } = req.body;

    if (typeof nilai !== 'number' || typeof status !== 'string') {
      return res.status(400).json({
        error: 'Invalid payload. Expected { nilai: number, status: string }',
      });
    }

    // Save the latest data
    latestSensorData = {
      nilai,
      status,
      timestamp: new Date().toISOString(),
    };

    console.log(`[${new Date().toLocaleTimeString()}] Data received from ESP32:`, latestSensorData);

    res.json({
      success: true,
      message: 'Data received successfully',
      data: latestSensorData,
    });
  } catch (error) {
    console.error('Error in /api/lapor:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * GET /api/status-sekarang
 * Send the latest sensor data to frontend
 * Returns: { "nilai": int, "status": string, "timestamp": string }
 */
app.get('/api/status-sekarang', (req, res) => {
  try {
    console.log(`[${new Date().toLocaleTimeString()}] Status request from frontend`);
    res.json(latestSensorData);
  } catch (error) {
    console.error('Error in /api/status-sekarang:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * GET /health
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} does not exist`,
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🌊 HydSense IoT Backend Server`);
  console.log(`✅ Server listening on http://0.0.0.0:${PORT}`);
  console.log(`📡 POST /api/lapor - Receive data from ESP32`);
  console.log(`📊 GET /api/status-sekarang - Get latest sensor data`);
  console.log(`💓 GET /health - Health check\n`);
});
