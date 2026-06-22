import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEditMode } from "../../context/EditModeContext";
import {
  Crown,
  Users,
  Home,
  Info,
  LogOut,
  ChevronRight,
  Settings,
  Pencil,
  Eye,
  Table2,
  Download,
  Menu,
  BookOpen,
  Scroll,
} from "lucide-react";
import { useEffect } from "react";

const MENU_ITEMS = [
  { id: "dashboard", label: "Genel Bakış", icon: Settings, path: "/yonetim" },
  { id: "devletler", label: "Devletler", icon: Crown, path: "/yonetim/devletler" },
  { id: "hukumdarlar", label: "Hükümdarlar", icon: Users, path: "/yonetim/hukumdarlar" },
  { id: "destanlar", label: "Destanlar", icon: BookOpen, path: "/yonetim/destanlar" },
  { id: "yazitlar", label: "Yazıtlar", icon: Scroll, path: "/yonetim/yazitlar" },
  { id: "kultur", label: "Kut Töresi", icon: Crown, path: "/yonetim/kultur" },
  { id: "anasayfa", label: "Ana Sayfa", icon: Home, path: "/yonetim/anasayfa" },
  { id: "hakkinda", label: "Hakkında", icon: Info, path: "/yonetim/hakkinda" },
  { id: "bulk", label: "Toplu Düzenle", icon: Table2, path: "/yonetim/toplu" },
  { id: "export", label: "Dışa Aktar", icon: Download, path: "/yonetim/export" },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({ mobileOpen, onMobileClose }: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { isEditMode, toggleEditMode } = useEditMode();

  const currentPath = location.pathname;

  // Close on route change (mobile)
  useEffect(() => {
    onMobileClose();
  }, [currentPath]);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-stone-900 border-r border-stone-800 flex flex-col h-screen fixed top-0 z-[60] transition-transform duration-300 ease-in-out
          w-64 left-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-800">
          <button
            onClick={() => navigate("/yonetim")}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
              <Crown className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm">Türk Tarihi</h1>
              <p className="text-stone-500 text-[10px] uppercase tracking-wider">
                Yönetim Paneli
              </p>
            </div>
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {isActive && <ChevronRight className="w-3 h-3" />}
              </button>
            );
          })}


        </nav>

        {/* Edit Mode Toggle */}
        <div className="p-3 border-t border-stone-800">
          <button
            onClick={toggleEditMode}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isEditMode
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50 border border-transparent"
            }`}
          >
            {isEditMode ? <Eye className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
            <span className="flex-1 text-left">
              {isEditMode ? "Düzenlemeyi Bitir" : "Siteyi Düzenle"}
            </span>
            {isEditMode && (
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-800">
          <button
            onClick={() => {
              logout();
              navigate("/yonetim/giris");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>
    </>
  );
}

/* Mobile Top Bar - Hamburger button */
export function MobileTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="lg:hidden sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-4 py-3 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
        <span className="text-sm font-medium">Menü</span>
      </button>
      <div className="flex items-center gap-2">
        <Crown className="w-4 h-4 text-amber-500" />
        <span className="text-white text-sm font-bold">Yönetim</span>
      </div>
    </div>
  );
}
