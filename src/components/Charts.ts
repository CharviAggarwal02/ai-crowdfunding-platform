import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  TimeScale
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register chart.js components once for the whole app
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

export { Line, Bar, Doughnut };
