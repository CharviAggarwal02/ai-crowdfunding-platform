import { ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import API from "../services/api"

interface Props {
  onNavigate: (page: string) => void
  campaignId?: number
}

export default function ProjectUpdatesPage({ onNavigate, campaignId }: Props) {

  const [updates, setUpdates] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState("")

  // ⭐ FETCH UPDATES
  useEffect(() => {
    if (!campaignId) return
    fetchUpdates()
  }, [campaignId])

  const fetchUpdates = async () => {
    try {
      setLoading(true)
      const res = await API.get(`/updates/${campaignId}`)
      setUpdates(res.data || [])
    } catch (err) {
      console.log(err)
      setError("Failed to load updates")
    } finally {
      setLoading(false)
    }
  }

  // ⭐ POST UPDATE
  const postUpdate = async () => {

    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields")
      return
    }

    try {
      setPosting(true)

      await API.post("/updates/", {
        campaign_id: campaignId,
        title,
        content
      })

      setTitle("")
      setContent("")

      await fetchUpdates()

      alert("✅ Update posted successfully")

    } catch (err) {
      console.log(err)
      alert("Failed to post update")
    } finally {
      setPosting(false)
    }
  }

  // ⭐ DELETE UPDATE
  const deleteUpdate = async (id: number) => {

    if (!window.confirm("Delete this update?")) return

    try {
      await API.delete(`/updates/${id}`)
      fetchUpdates()
    } catch {
      alert("Delete failed")
    }
  }

  // ⭐ NO CAMPAIGN SELECTED UI
  if (!campaignId) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3">No Campaign Selected</h2>
          <button
            onClick={() => onNavigate("entrepreneur-dashboard")}
            className="px-5 py-2 bg-blue-600 rounded-lg">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E1A] via-[#0F172A] to-black text-white">

      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#0A0E1A]/70 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
          <button onClick={() => onNavigate("entrepreneur-dashboard")}>
            <ArrowLeft />
          </button>
          <h1 className="font-semibold text-lg">Project Updates</h1>
          <div />
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">

        {/* POST UPDATE CARD */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-semibold">Post New Update</h2>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Update title"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your update..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 min-h-[120px] outline-none focus:border-cyan-400"
          />

          <button
            onClick={postUpdate}
            disabled={posting}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center gap-2 hover:scale-105 transition">

            {posting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
            {posting ? "Posting..." : "Post Update"}

          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-red-400 text-center">{error}</div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="text-center text-gray-400 py-10">
            Loading updates...
          </div>
        )}

        {/* EMPTY */}
        {!loading && updates.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No updates yet 🚀
          </div>
        )}

        {/* UPDATE LIST */}
        {!loading && updates.map((u) => (
          <div
            key={u.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition">

            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{u.title}</h3>

              <button
                onClick={() => deleteUpdate(u.id)}
                className="text-red-400 hover:text-red-500">
                <Trash2 size={18} />
              </button>
            </div>

            <p className="text-gray-300 mt-3 leading-relaxed">
              {u.content}
            </p>

            <div className="text-xs text-gray-500 mt-4">
              {new Date(u.created_at).toLocaleString()}
            </div>

          </div>
        ))}

      </main>
    </div>
  )
}