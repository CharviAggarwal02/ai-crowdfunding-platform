import { useEffect, useState } from "react"
import API from "../services/api"
import { Rocket, Trash2, BarChart3, Pencil } from "lucide-react"

interface Props {
  onNavigate: (page: string, data?: any) => void
}

export default function MyCampaignsPage({ onNavigate }: Props) {

  const [campaigns,setCampaigns] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    loadCampaigns()
  },[])

  const loadCampaigns = async()=>{
    try{
      const res = await API.get("/campaigns/")
      setCampaigns(res.data || [])
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  const deleteCampaign = async(id:number)=>{
    if(!confirm("Delete this campaign?")) return

    try{
      await API.delete(`/campaigns/${id}`)
      loadCampaigns()
    }catch(err){
      alert("Failed to delete")
    }
  }

  return(
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E1A] via-[#0F172A] to-black text-white">

      {/* HEADER */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">

          <div className="flex gap-2 items-center text-xl font-bold">
            <Rocket className="text-cyan-400"/>
            My Campaigns
          </div>

          <button
            onClick={()=>onNavigate("create-campaign")}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl"
          >
            + New Campaign
          </button>

        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {loading && (
          <p className="text-gray-400">Loading campaigns...</p>
        )}

        {!loading && campaigns.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <Rocket className="mx-auto mb-4"/>
            No campaigns yet. Start your first campaign 🚀
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {campaigns.map(c=>{

            const progress = Math.min(
              Math.round((c.pledged / c.goal) * 100),100
            )

            return(
              <div key={c.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 hover:scale-[1.02] transition">

                {/* TITLE */}
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">{c.name}</h2>

                  <span className={`text-xs px-3 py-1 rounded-full
                    ${c.state==="successful"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-blue-500/20 text-blue-400"}`}>
                    {c.state}
                  </span>
                </div>

                {/* CATEGORY */}
                <div className="text-gray-400 text-sm">
                  {c.category}
                </div>

                {/* PROGRESS */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>₹ {c.pledged}</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="w-full bg-white/10 h-3 rounded-full">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-400"
                      style={{width:`${progress}%`}}
                    />
                  </div>

                  <div className="text-xs text-gray-400 mt-1">
                    Goal: ₹ {c.goal}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-between pt-3 border-t border-white/10">

                  <button
                    onClick={()=>onNavigate("edit-campaign",c)}
                    className="flex gap-1 text-gray-300 hover:text-cyan-400">
                    <Pencil size={16}/> Edit
                  </button>

                  <button
                    onClick={()=>onNavigate("performance-analytics",c)}
                    className="flex gap-1 text-gray-300 hover:text-cyan-400">
                    <BarChart3 size={16}/> Analytics
                  </button>

                  <button
                    onClick={()=>deleteCampaign(c.id)}
                    className="flex gap-1 text-red-400 hover:text-red-300">
                    <Trash2 size={16}/> Delete
                  </button>

                </div>

              </div>
            )
          })}

        </div>

      </main>

    </div>
  )
}