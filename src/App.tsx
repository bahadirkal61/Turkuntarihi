import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import { EditModeProvider } from "./context/EditModeContext";
import { Suspense, lazy, useEffect } from "react";
import Layout from "./components/Layout";

// Preload-enabled lazy imports
const Home = lazy(() => import("./pages/Home"));
const History = lazy(() => import("./pages/History"));
const Epics = lazy(() => import("./pages/Epics"));
const EpicDetail = lazy(() => import("./pages/EpicDetail"));
const Inscriptions = lazy(() => import("./pages/Inscriptions"));
const InscriptionDetail = lazy(() => import("./pages/InscriptionDetail"));
const Geography = lazy(() => import("./pages/Geography"));
const Culture = lazy(() => import("./pages/Culture"));
const Soy = lazy(() => import("./pages/Soy"));
const About = lazy(() => import("./pages/About"));
const Feedback = lazy(() => import("./pages/Feedback"));
const DynastyDetail = lazy(() => import("./pages/DynastyDetail"));
const RulerPage = lazy(() => import("./pages/RulerPage"));
const Biographies = lazy(() => import("./pages/Biographies"));
const Art = lazy(() => import("./pages/Art"));
const PaintingMiniature = lazy(() => import("./pages/PaintingMiniature"));
const MusicPage = lazy(() => import("./pages/MusicPage"));
const LoginPage = lazy(() => import("./pages/admin/LoginPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Prefetch map for route preloading on hover
const prefetchMap: Record<string, () => Promise<unknown>> = {
  "/tarih": () => import("./pages/History"),
  "/destanlar": () => import("./pages/Epics"),
  "/yazitlar": () => import("./pages/Inscriptions"),
  "/cografya": () => import("./pages/Geography"),
  "/kultur": () => import("./pages/Culture"),
  "/hakkimizda": () => import("./pages/About"),
  "/biyografiler": () => import("./pages/Biographies"),
  "/sanat": () => import("./pages/Art"),
  "/sanat/resim-minyatur": () => import("./pages/PaintingMiniature"),
  "/sanat/muzik": () => import("./pages/MusicPage"),
  "/geri-bildirim": () => import("./pages/Feedback"),
};

export function prefetchRoute(path: string) {
  const loader = prefetchMap[path];
  if (loader) loader();
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/yonetim/giris" replace />;
}

// Redirect if already logged in
function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/yonetim" replace /> : <>{children}</>;
}

function AppRoutes() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/yonetim");

  return (
    <>
      <ScrollToTop />
      {isAdminPage ? (
        <Suspense
          fallback={
            <div className="min-h-screen bg-stone-950 flex items-center justify-center">
              <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route
              path="/yonetim/giris"
              element={
                <AuthRedirect>
                  <LoginPage />
                </AuthRedirect>
              }
            />
            <Route
              path="/yonetim/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      ) : (
        <Layout>
          <Suspense
            fallback={
              <div className="min-h-screen bg-stone-950 flex items-center justify-center">
                <div className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tarih" element={<History />} />
              <Route path="/tarih/:dynastyId" element={<DynastyDetail />} />
              <Route path="/tarih/:dynastyId/:rulerId" element={<RulerPage />} />
              <Route path="/destanlar" element={<Epics />} />
              <Route path="/destanlar/:epicId" element={<EpicDetail />} />
              <Route path="/yazitlar" element={<Inscriptions />} />
              <Route path="/yazitlar/:inscriptionId" element={<InscriptionDetail />} />
              <Route path="/cografya" element={<Geography />} />
              <Route path="/kultur" element={<Culture />} />
              <Route path="/turk-soyu" element={<Soy />} />
              <Route path="/geri-bildirim" element={<Feedback />} />
              <Route path="/biyografiler" element={<Biographies />} />
              <Route path="/sanat" element={<Art />} />
              <Route path="/sanat/resim-minyatur" element={<PaintingMiniature />} />
              <Route path="/sanat/muzik" element={<MusicPage />} />
              <Route path="/hakkimizda" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EditModeProvider>
        <AppRoutes />
      </EditModeProvider>
    </AuthProvider>
  );
}
