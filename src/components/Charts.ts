import {
  Line as LineChart,
  Bar as BarChart,
  Doughnut as DoughnutChart,
  Pie as PieChart
} from "react-chartjs-2"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
)

export const Line = LineChart
export const Bar = BarChart
export const Doughnut = DoughnutChart
export const Pie = PieChart