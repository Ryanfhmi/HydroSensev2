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
  laporData: any[];
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
  const [laporData, setLaporData] = useState<any[]>([]);
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

      const response = await fetch('/api/lapor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log('API /api/lapor result:', result);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      if (!Array.isArray(result)) {
        throw new Error('Expected array from /api/lapor');
      }

      setLaporData(result);

      const mappedData = result.map((item: any) => {
        const vibration = Number(item.vibration ?? item.nilai ?? 0);
        const time = item.created_at
          ? new Date(item.created_at).toLocaleTimeString('id-ID', {
              timeZone: 'Asia/Jakarta',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          : new Date().toLocaleTimeString('id-ID', {
              timeZone: 'Asia/Jakarta',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });

        return {
          time,
          vibration,
          gForce: vibration,
          flow: calculateFlow(vibration),
          status: item.status || 'KOSONG',
          timestamp: item.created_at || new Date().toISOString(),
        };
      });

      const latestItem = mappedData[0] || null;
      const historical = mappedData.slice().reverse();

      setCurrentVibration(latestItem?.gForce ?? 0);
      setCurrentFlow(latestItem?.flow ?? 0);
      setSensorData(
        latestItem
          ? {
              nilai: latestItem.vibration,
              status: latestItem.status,
              timestamp: latestItem.timestamp,
            }
          : null
      );
      setData(
        latestItem
          ? {
              deviceId: deviceId || 'ESP32-Main',
              temperature: 0,
              pressure: 0,
              flowRate: latestItem.flow,
              signalStrength: 85,
              leakDetected: latestItem.status === 'LEAK',
              timestamp: latestItem.timestamp,
            }
          : null
      );

      setHistoricalData(historical.slice(-20));

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
    laporData,
    historicalData,
    currentVibration,
    currentFlow,
    isLoading,
    error,
    refetch: fetchData,
  };
}
