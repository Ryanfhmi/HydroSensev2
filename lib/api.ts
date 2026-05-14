import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.30.200:5000';

/**
 * API client configuration for water monitoring data
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access to API');
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch water data for a specific device
 */
export async function fetchWaterData(deviceId: string) {
  try {
    const response = await apiClient.get(`/api/water-data/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching water data for device ${deviceId}:`, error);
    throw error;
  }
}

/**
 * Fetch all connected devices
 */
export async function fetchDevices() {
  try {
    const response = await apiClient.get('/api/devices');
    return response.data;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
}

/**
 * Fetch device status
 */
export async function fetchDeviceStatus(deviceId: string) {
  try {
    const response = await apiClient.get(`/api/devices/${deviceId}/status`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching status for device ${deviceId}:`, error);
    throw error;
  }
}

/**
 * Fetch alert history
 */
export async function fetchAlerts(limit: number = 20) {
  try {
    const response = await apiClient.get('/api/alerts', { params: { limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
}

/**
 * Connect to WebSocket for real-time data
 */
export function connectWebSocket(deviceId: string, onMessage: (data: any) => void) {
  const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001';
  const ws = new WebSocket(`${wsUrl}/ws/${deviceId}`);

  ws.onopen = () => {
    console.log(`WebSocket connected to device ${deviceId}`);
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log(`WebSocket disconnected from device ${deviceId}`);
  };

  return ws;
}

export default apiClient;
