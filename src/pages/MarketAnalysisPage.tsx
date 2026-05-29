import {
Download,
Laptop,
Gamepad2,
Palette,
Film,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Line } from "../components/Charts";
import Header from "../components/Header";
import ChatBot from "../components/ChatBot";
import Footer from "../components/Footer";

import {
getSummary,
getFundingTrend,
getSectors,
getTopProjects
} from "../services/analyticsService";

interface MarketAnalysisPageProps {
onNavigate: (page: string) => void;
isLoggedIn?: boolean;
userName?: string;
onLogout?: () => void;
userRole?: "investor" | "entrepreneur" | "admin" | null;
}

export default function MarketAnalysisPage({
onNavigate,
isLoggedIn,
userName,
onLogout,
userRole,
}: MarketAnalysisPageProps) {

const [summary,setSummary] = useState<any>(null);
const [trend,setTrend] = useState<any[]>([]);
const [sectors,setSectors] = useState<any[]>([]);
const [projects,setProjects] = useState<any[]>([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

async function loadData(){
try{

const s = await getSummary();
setSummary(s);

const t = await getFundingTrend();
setTrend(t || []);

const sec = await getSectors();
setSectors(sec || []);

const proj = await getTopProjects();
setProjects(proj || []);

}catch(err){
console.log("Analytics error",err);
}
finally{
setLoading(false);
}
}

loadData();

},[]);


const chartData = {
labels: trend.map((d)=> d.month),
datasets:[
{
label:"Funding",
data: trend.map((d)=> d.pledged),   // ⭐ FIXED
borderColor:"rgb(34,211,238)",
backgroundColor:"rgba(34,211,238,0.15)",
fill:true,
tension:0.4
}
]
};

return (

<div className="min-h-screen bg-gradient-to-br from-[#0A0E1A] via-[#0F172A] to-[#020617]">

<Header
  onNavigate={onNavigate}
  isLoggedIn={isLoggedIn}
  userName={userName}
  onLogout={onLogout}
  showMarketAnalysis={false}
  userRole={userRole}
/>

<main className="max-w-7xl mx-auto px-6 py-10">

{/* TITLE */}

<div className="flex justify-between items-center mb-12">

<div>
<h1 className="text-4xl font-bold text-white mb-2">
Market Overview
</h1>
<p className="text-gray-400">
Crowdfunding market analysis and insights
</p>
</div>

<button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white shadow-lg hover:scale-105 transition">
<Download className="w-4 h-4"/>
Download Report
</button>

</div>

{/* CHART + KPIs */}

<div className="grid grid-cols-2 gap-6 mb-14">

<div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">
<h3 className="text-white font-semibold mb-4">Funding Trends</h3>

<div className="h-56">
{loading ? (
<p className="text-gray-400">Loading chart...</p>
) : (
<Line data={chartData} options={{responsive:true,plugins:{legend:{display:false}}}} />
)}
</div>

</div>

<div className="grid grid-cols-2 gap-4">

{summary && [

{label:"Total Funding",value:`$${summary.totalFunding?.toLocaleString()}`},
{label:"Total Projects",value:summary.totalProjects?.toLocaleString()},
{label:"Success Rate",value:`${summary.successRate}%`},
{label:"Avg Pledge",value:`$${summary.avgPledge?.toFixed(2)}`}

].map((kpi,i)=>(

<div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
<div className="text-3xl font-bold text-white mb-1">{kpi.value}</div>
<div className="text-gray-400 text-sm">{kpi.label}</div>
</div>

))}

</div>

</div>

{/* SECTORS */}

<h2 className="text-2xl text-white font-bold mb-6">Sector Analytics</h2>

<div className="grid grid-cols-4 gap-6 mb-14">

{sectors.map((sector,i)=>(

<div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">

<div className="flex items-center gap-3 mb-4">

{sector.category==="Technology" && <Laptop className="text-cyan-400"/>}
{sector.category==="Games" && <Gamepad2 className="text-purple-400"/>}
{sector.category==="Design" && <Palette className="text-pink-400"/>}
{sector.category==="Film" && <Film className="text-yellow-400"/>}

<div className="text-white font-semibold">{sector.category}</div>

</div>

<div className="text-2xl text-white font-bold mb-2">
${Math.round(sector.totalRaised/1e6)}M
</div>

<div className="w-full bg-white/10 h-2 rounded-full">
<div style={{width:`${sector.successRate}%`}} className="bg-green-400 h-2 rounded-full"/>
</div>

<div className="text-green-400 text-sm mt-2">
{sector.successRate?.toFixed(1)}% success
</div>

</div>

))}

</div>

{/* ⭐⭐⭐ TABLE WITH LABELS RESTORED */}

<h2 className="text-2xl text-white font-bold mb-6">Top Performing Projects</h2>

<div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

<table className="w-full">

<thead className="bg-white/5">
<tr className="text-gray-400 text-sm">
<th className="p-4 text-left">Project</th>
<th className="p-4 text-left">Category</th>
<th className="p-4 text-left">Total Raised</th>
<th className="p-4 text-left">Backers</th>
<th className="p-4 text-left">Funding %</th>
</tr>
</thead>

<tbody>

{projects.map((p,i)=>(

<tr key={i} className="border-b border-white/10 hover:bg-white/5 transition">
<td className="p-4 text-white">{p.project}</td>
<td className="p-4 text-gray-300">{p.category}</td>
<td className="p-4 text-white">${p.raised?.toLocaleString()}</td>
<td className="p-4 text-white">{p.backers}</td>
<td className="p-4 text-green-400 font-semibold">{p.fundingPercent}%</td>
</tr>

))}

</tbody>

</table>

</div>

</main>

<ChatBot />
<Footer />

</div>

);
}