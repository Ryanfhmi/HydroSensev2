/**
 * Format temperature value with unit
 */
export function formatTemperature(temp: number, decimals = 1): string {
  return `${temp.toFixed(decimals)}°C`;
}

/**
 * Format water flow rate
 */
export function formatFlowRate(flow: number, decimals = 2): string {
  return `${flow.toFixed(decimals)} L/h`;
}

/**
 * Format signal strength percentage
 */
export function formatSignalStrength(signal: number): string {
  return `${Math.round(signal)}%`;
}

/**
 * Format pressure value
 */
export function formatPressure(pressure: number, decimals = 2): string {
  return `${pressure.toFixed(decimals)} bar`;
}

/**
 * Get status color based on device condition
 */
export function getStatusColor(status: 'online' | 'offline' | 'warning'): {
  bg: string;
  text: string;
  label: string;
} {
  switch (status) {
    case 'online':
      return { bg: '#D1FAE5', text: '#047857', label: 'Online' };
    case 'offline':
      return { bg: '#FEE2E2', text: '#B91C1C', label: 'Offline' };
    case 'warning':
      return { bg: '#FEF3C7', text: '#92400E', label: 'Warning' };
    default:
      return { bg: '#E5E7EB', text: '#374151', label: 'Unknown' };
  }
}

/**
 * Determine leak status based on flow rate
 * Assumes normal flow rate is between 0 and 2 L/h
 */
export function checkLeakStatus(flowRate: number, threshold = 3): boolean {
  return flowRate > threshold;
}

/**
 * Format timestamp to readable string
 */
export function formatTimestamp(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Calculate average of numbers
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

/**
 * Calculate trend direction
 */
export function calculateTrend(
  current: number,
  previous: number
): 'up' | 'down' | 'stable' {
  const threshold = 0.05; // 5% threshold
  const change = (current - previous) / previous;

  if (change > threshold) return 'up';
  if (change < -threshold) return 'down';
  return 'stable';
}

/**
 * Validate email address
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Convert Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert Fahrenheit to Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}
