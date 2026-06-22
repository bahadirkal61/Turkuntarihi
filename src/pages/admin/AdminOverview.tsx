import { motion } from "framer-motion";
import { trpc } from "@/providers/trpc";
import {
  MessageSquare,
  Shield,
  AlertTriangle,
  Clock,
  TrendingUp,
} from "lucide-react";

const stats = [
  { label: "Toplam Geri Bildirim", icon: MessageSquare, color: "text-amber-400", bg: "bg-amber-900/20" },
  { label: "Yeni", icon: MessageSquare, color: "text-emerald-400", bg: "bg-emerald-900/20" },
  { label: "Okundu", icon: Clock, color: "text-blue-400", bg: "bg-blue-900/20" },
  { label: "Yanıtlandı", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-900/20" },
  { label: "Audit (24s)", icon: Shield, color: "text-cyan-400", bg: "bg-cyan-900/20" },
  { label: "Başarısız Giriş", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-900/20" },
];

export default function AdminOverview() {
  const { data: dashboard } = trpc.admin.dashboard.useQuery();
  const { data: feedbackCount } = trpc.feedback.count.useQuery();
  const { data: auditStats } = trpc.audit.stats.useQuery();

  const feedbackData = feedbackCount || { total: 0, new: 0, read: 0, replied: 0 };
  const auditData = auditStats || { total: 0, last24h: 0, success: 0, failure: 0, warning: 0 };

  const values = [
    feedbackData.total,
    feedbackData.new,
    feedbackData.read,
    feedbackData.replied,
    auditData.last24h,
    auditData.failure,
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-stone-500 text-sm">
          Turk Tarihi Atlası yönetim paneline hoş geldiniz.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-stone-900 border border-stone-800 rounded-xl p-4"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="text-2xl font-bold text-white">{values[i] ?? 0}</p>
            <p className="text-stone-500 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-stone-900 border border-stone-800 rounded-xl p-5"
        >
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-amber-400" />
            Son Geri Bildirimler
          </h2>
          {dashboard?.recentFeedback && dashboard.recentFeedback.length > 0 ? (
            <div className="space-y-3">
              {dashboard.recentFeedback.map((f: any) => (
                <div key={f.id} className="flex items-start gap-3 p-3 bg-stone-800/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-400 text-xs font-bold">{f.name?.charAt(0) || "?"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{f.subject}</p>
                    <p className="text-stone-500 text-xs truncate">{f.name} - {f.email}</p>
                    <p className="text-stone-600 text-xs mt-1">
                      {new Date(f.createdAt).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    f.status === "new" ? "bg-emerald-900/30 text-emerald-400" :
                    f.status === "read" ? "bg-blue-900/30 text-blue-400" :
                    "bg-stone-800 text-stone-500"
                  }`}>
                    {f.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-600 text-sm text-center py-8">Henüz geri bildirim yok.</p>
          )}
        </motion.div>

        {/* Recent Audit Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-stone-900 border border-stone-800 rounded-xl p-5"
        >
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            Son İşlemler
          </h2>
          {dashboard?.recentAudit && dashboard.recentAudit.length > 0 ? (
            <div className="space-y-3">
              {dashboard.recentAudit.map((log: any) => (
                <div key={log.id} className="flex items-start gap-3 p-3 bg-stone-800/50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    log.status === "success" ? "bg-emerald-500" :
                    log.status === "failure" ? "bg-red-500" : "bg-amber-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">{log.action}</p>
                    <p className="text-stone-500 text-xs">{log.entity} - {log.username || "Sistem"}</p>
                    <p className="text-stone-600 text-xs mt-1">
                      {new Date(log.createdAt).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-600 text-sm text-center py-8">Henüz işlem kaydı yok.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
