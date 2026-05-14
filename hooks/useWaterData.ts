import { useState, useEffect, useCallback } from 'react';

interface SensorData {
  nilai: number;
  status: string;
  timestamp: string;
}

interface ChartDataPoint {
  time: string;
  vibration: number;
  gForce: number;
  flow: number;
}

interface WaterData {
  deviceId: string;
  temperature: number;
  pressure: number;
  flowRate: number;
  signalStrength: number;
  leakDetected: boolean;
  timestamp: string;
}

interface UseWaterDataReturn {
  data: WaterData | null;
  sensorData: SensorData | null;
  historicalData: ChartDataPoint[];
  currentVibration: number;
  currentFlow: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch water monitoring data from ESP32 via backend
 * Maintains historical data for charts and calculates vibration/flow metrics
 * @param deviceId - Optional specific device ID to monitor
 * @returns Water data, sensor data, historical data, and metrics
 */
export function useWaterData(deviceId?: string): UseWaterDataReturn {
  const [data, setData] = useState<WaterData | null>(null);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [historicalData, setHistoricalData] = useState<ChartDataPoint[]>([]);
  const [currentVibration, setCurrentVibration] = useState(0);
  const [currentFlow, setCurrentFlow] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Calculate vibration in G-force: nilai / 100
   * @param nilai - Raw sensor value
   * @returns Vibration in G-force
   */
  const calculateVibration = (nilai: number): number => {
    return nilai / 100;
  };

  /**
   * Calculate water flow: nilai < 100 ? 0 : (nilai - 100) * 0.02
   * @param nilai - Raw sensor value
   * @returns Water flow in L/h
   */
  const calculateFlow = (nilai: number): number => {
    if (nilai < 100) return 0;
    return (nilai - 100) * 0.02;
  };

  const fetchData = useCallback(async () => {
    try {
      setError(null);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.30.200:5000';
      const url = `${apiUrl}/api/status-sekarang`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const rawData: SensorData = await response.json();
      setSensorData(rawData);

      // Calculate vibration and flow
      const vibration = calculateVibration(rawData.nilai);
      const flow = calculateFlow(rawData.nilai);

      // Update current values
      setCurrentVibration(vibration);
      setCurrentFlow(flow);

      // Map sensor data to WaterData format for compatibility
      const mappedData: WaterData = {
        deviceId: deviceId || 'ESP32-Main',
        temperature: 0,
        pressure: 0,
        flowRate: flow,
        signalStrength: 85,
        leakDetected: rawData.status === 'LEAK',
        timestamp: rawData.timestamp,
      };

      setData(mappedData);

      // Add to historical data (keep last 20 readings)
      setHistoricalData((prevData) => {
        const timeString = new Date().toLocaleTimeString();
        const newDataPoint: ChartDataPoint = {
          time: timeString,
          vibration: vibration,
          gForce: vibration, // For chart compatibility
          flow: flow,
        };

        const updatedData = [...prevData, newDataPoint];
        // Keep only the last 20 readings
        return updatedData.slice(-20);
      });

      setIsLoading(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch water data';
      setError(message);
      console.error('Water data fetch error:', message);
      setIsLoading(false);
    }
  }, [deviceId]);

  // Fetch data on mount and set up polling every 3 seconds
  useEffect(() => {
    fetchData();

    // Poll for new data every 3 seconds from ESP32
    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    sensorData,
    historicalData,
    currentVibration,
    currentFlow,
    isLoading,
    error,
    refetch: fetchData,
  };
}
