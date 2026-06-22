import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar, { MobileTopBar } from "../../components/admin/AdminSidebar";
import AdminOverview from "./AdminOverview";
import AdminDynasties from "./AdminDynasties";
import AdminRulers from "./AdminRulers";
import AdminHomePage from "./AdminHomePage";
import AdminAboutPage from "./AdminAboutPage";
import AdminBulkEdit from "./AdminBulkEdit";
import AdminExport from "./AdminExport";
import AdminEpics from "./AdminEpics";
import AdminInscriptions from "./AdminInscriptions";
import AdminCulture from "./AdminCulture";

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-stone-950">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 w-full min-w-0">
        <MobileTopBar onMenuClick={() => setMobileOpen(true)} />
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/devletler" element={<AdminDynasties />} />
          <Route path="/hukumdarlar" element={<AdminRulers />} />
          <Route path="/anasayfa" element={<AdminHomePage />} />
          <Route path="/hakkinda" element={<AdminAboutPage />} />
          <Route path="/toplu" element={<AdminBulkEdit />} />
          <Route path="/export" element={<AdminExport />} />
          <Route path="/destanlar" element={<AdminEpics />} />
          <Route path="/yazitlar" element={<AdminInscriptions />} />
          <Route path="/kultur" element={<AdminCulture />} />
        </Routes>
      </main>
    </div>
  );
}
