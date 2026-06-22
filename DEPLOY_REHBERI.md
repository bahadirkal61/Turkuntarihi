# Turk Tarihi Atlasi - Sunucu Deploy Rehberi

## Bu Rehberdeki Adimlar

1. Sunucuda mevcut projeyi guncelle
2. `npm install` sorununu coz (alternatif yontemler)
3. Backend kodlarindaki KRITIK hatalari duzelt
4. Veritabanini olustur ve seed et
5. Build al ve baslat
6. Nginx'i guncelle
7. PM2 ile surec yonetimi

---

## Adim 1: Projeyi Guncelle

Sunucuda terminal ac ve su komutlari calistir:

```bash
cd /root/Turkuntarihi
git fetch origin
git reset --hard origin/main
```

Eger `git reset` calismazsa:
```bash
cd /root
rm -rf Turkuntarihi
git clone https://github.com/bahadirkal61/Turkuntarihi.git
```

---

## Adim 2: npm install Sorununu Coz

`npm install` genellikle "Exit handler never called!" hatasi veriyor. 
Asagidaki yontemleri SIRASIYLA dene, birisi mutlaka calisacaktir:

### Yontem A: npm cache temizleme (En basit)
```bash
cd /root/Turkuntarihi
npm cache clean --force
npm install --legacy-peer-deps --maxsockets 1 --no-audit --no-fund
```

### Yontem B: Memory limit arttirma
```bash
cd /root/Turkuntarihi
NODE_OPTIONS="--max-old-space-size=512" npm install --legacy-peer-deps
```

### Yontem C: pnpm kullanma (En guvenilir)
```bash
npm install -g pnpm
cd /root/Turkuntarihi
pnpm install
```

### Yontem D: Tek tek kurma (better-sqlite3 sona birak)
```bash
cd /root/Turkuntarihi
npm install --ignore-scripts --no-audit --no-fund
npm install better-sqlite3 --build-from-source=false --fallback-to-build=false
npm rebuild bcrypt --build-from-source=false
```

### Yontem E: yarn kullanma
```bash
npm install -g yarn
cd /root/Turkuntarihi
yarn install
```

**Mutlaka birisi calismalidir. Calisan yontemi not al.**

---

## Adim 3: KRITIK Hatalari Duzelt

Eger yukaridaki yontemlerden biri calisti ve `node_modules` olustu, 
ASAGIDAKI scripti BUTUN HALINDE kopyala-yapistir calistir:

```bash
cd /root/Turkuntarihi

# === DUZELTME 1: local-auth-router.ts - const db = db; hatalari ===
sed -i 's/const db = db;/const db = getDb();/g' api/local-auth-router.ts

# === DUZELTME 2: feedback-router.ts - const db = db; hatalari ===
sed -i 's/const db = db;/const db = getDb();/g' api/feedback-router.ts

# === DUZELTME 3: audit-router.ts - const db = db; hatalari ===
sed -i 's/const db = db;/const db = getDb();/g' api/audit-router.ts

# === DUZELTME 4: admin-router.ts - const db = db; hatalari ===
sed -i 's/const db = db;/const db = getDb();/g' api/admin-router.ts

# === DUZELTME 5: isActive boolean karşilaştirmasi ===
sed -i 's/user\[0\].isActive !== "true"/!user[0].isActive/g' api/local-auth-router.ts

# === DUZELTME 6: Date | null tip hatalari (admin-router) ===
sed -i 's/new Date(l.createdAt).getTime()/new Date(l.createdAt ?? 0).getTime()/g' api/admin-router.ts
sed -i 's/new Date(b.createdAt).getTime()/new Date(b.createdAt ?? 0).getTime()/g' api/admin-router.ts
sed -i 's/new Date(a.createdAt).getTime()/new Date(a.createdAt ?? 0).getTime()/g' api/admin-router.ts

# === DUZELTME 7: Date | null tip hatalari (audit-router) ===
sed -i 's/new Date(l.createdAt).getTime()/new Date(l.createdAt ?? 0).getTime()/g' api/audit-router.ts

echo "Tum duzeltmeler uygulandi!"
```

---

## Adim 4: AuthContext'i Guncelle

`src/context/AuthContext.tsx` dosyasini SIL bastan yeniden yaz.
Asagidaki komutu BUTUN HALINDE calistir:

```bash
cat > /root/Turkuntarihi/src/context/AuthContext.tsx << 'AUTHCONTEXT_EOF'
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { trpc } from "@/providers/trpc";

interface AuthUser {
  id: number;
  username: string;
  name: string;
  email: string | null;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: false,
  error: null,
});

const AUTH_TOKEN_KEY = "turk_tarihi_admin_token";
const AUTH_USER_KEY = "turk_tarihi_admin_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  });
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem(AUTH_USER_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return null;
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const verifyQuery = trpc.localAuth.verify.useQuery(
    { token: token || "" },
    { enabled: !!token, retry: false, refetchInterval: 5 * 60 * 1000 }
  );

  useEffect(() => {
    if (verifyQuery.data?.valid && verifyQuery.data.user) {
      setUser(verifyQuery.data.user as AuthUser);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(verifyQuery.data.user));
    } else if (verifyQuery.isError) {
      setToken(null);
      setUser(null);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [verifyQuery.data, verifyQuery.isError]);

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user as AuthUser);
      setError(null);
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
    },
    onError: (err) => { setError(err.message || "Giris basarisiz."); },
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync({ username, password, ipAddress: "", userAgent: navigator.userAgent });
      return true;
    } catch { return false; } finally { setIsLoading(false); }
  }, [loginMutation]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setError(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    window.location.href = "/yonetim/giris";
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token && !!user, user, login, logout, isLoading: isLoading || verifyQuery.isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
AUTHCONTEXT_EOF
```

---

## Adim 5: LoginPage'i Guncelle

```bash
cat > /root/Turkuntarihi/src/pages/admin/LoginPage.tsx << 'LOGINPAGE_EOF'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Shield, Eye, EyeOff, ArrowRight, Lock, User } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, error: authError, isLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Kullanici adi ve sifre gereklidir.");
      return;
    }
    const success = await login(username, password);
    if (success) navigate("/yonetim");
  };

  const displayError = error || authError;

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
            <Shield className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Yonetim Paneli</h1>
          <p className="text-stone-500 text-sm mt-1">Turk Tarihi - Admin Girisi</p>
        </motion.div>

        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onSubmit={handleSubmit} className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-5">
          {displayError && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {displayError}
            </motion.div>
          )}
          <div>
            <label className="block text-stone-400 text-sm font-medium mb-2">Kullanici Adi</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                placeholder="Kullanici adinizi girin" autoComplete="username" disabled={isLoading} />
            </div>
          </div>
          <div>
            <label className="block text-stone-400 text-sm font-medium mb-2">Sifre</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-10 pr-10 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                placeholder="Sifrenizi girin" autoComplete="current-password" disabled={isLoading} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-400 transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-stone-700 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <>Giris Yap <ArrowRight className="w-4 h-4" /></>}
          </button>
        </motion.form>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center mt-6">
          <button onClick={() => navigate("/")} className="text-stone-600 hover:text-stone-400 text-sm transition-colors">
            Ana Sayfaya Don
          </button>
        </motion.div>
      </div>
    </div>
  );
}
LOGINPAGE_EOF
```

---

## Adim 6: tRPC Provider'i Guncelle

```bash
cat > /root/Turkuntarihi/src/providers/trpc.tsx << 'TRPC_EOF'
import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import superjson from "superjson";
import type { AppRouter } from "../../api/router";
import type { ReactNode } from "react";

export const trpc = createTRPCReact<AppRouter>();

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      headers() {
        const token = localStorage.getItem("turk_tarihi_admin_token");
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
      fetch(input, init) {
        return globalThis.fetch(input, { ...(init ?? {}), credentials: "include" });
      },
    }),
  ],
});

export function TRPCProvider({ children }: { children: ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
TRPC_EOF
```

---

## Adim 7: .env Dosyasini Guncelle

```bash
cd /root/Turkuntarihi
echo 'DB_PATH=./data/turkuntarihi.db' >> .env
echo 'JWT_SECRET=turk-tarihi-guvenli-anahtar-2024-degistir' >> .env
```

---

## Adim 8: Build Al ve Veritabani Olustur

```bash
cd /root/Turkuntarihi
mkdir -p data

# Veritabanini olustur (SQLite)
npx drizzle-kit push

# Default admin kullanicisi olustur
npx tsx db/seed.ts

# Production build al
npm run build
```

**NOT:** `npx drizzle-kit push` calismazsa:
```bash
npx tsx -e "
const Database = require('better-sqlite3');
const db = new Database('./data/turkuntarihi.db');
db.exec(\`
  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, unionId TEXT NOT NULL UNIQUE, name TEXT, email TEXT, avatar TEXT, role TEXT DEFAULT 'user' NOT NULL, createdAt INTEGER, updatedAt INTEGER, lastSignInAt INTEGER);
  CREATE TABLE IF NOT EXISTS admin_users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, name TEXT NOT NULL, email TEXT, role TEXT DEFAULT 'editor' NOT NULL, is_active INTEGER DEFAULT 1, last_login_at INTEGER, login_attempts INTEGER DEFAULT 0, locked_until INTEGER, created_at INTEGER, updated_at INTEGER);
  CREATE TABLE IF NOT EXISTS feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, subject TEXT NOT NULL, message TEXT NOT NULL, category TEXT DEFAULT 'other' NOT NULL, status TEXT DEFAULT 'new' NOT NULL, ip_address TEXT, user_agent TEXT, created_at INTEGER);
  CREATE TABLE IF NOT EXISTS audit_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, action TEXT NOT NULL, entity TEXT NOT NULL, entity_id TEXT, user_id TEXT, username TEXT, old_value TEXT, new_value TEXT, ip_address TEXT NOT NULL, user_agent TEXT, status TEXT DEFAULT 'success' NOT NULL, details TEXT, created_at INTEGER);
  CREATE TABLE IF NOT EXISTS blocked_ips (id INTEGER PRIMARY KEY AUTOINCREMENT, ip_address TEXT NOT NULL UNIQUE, reason TEXT, blocked_by TEXT, expires_at INTEGER, created_at INTEGER);
\`);
console.log('Veritabani olusturuldu!');
"
```

**Admin kullanicisi olustur** (e seed calismazsa):
```bash
npx tsx -e "
const bcrypt = require('bcrypt');
const Database = require('better-sqlite3');
const db = new Database('./data/turkuntarihi.db');
const hash = bcrypt.hashSync('Admin123!', 12);
db.prepare('INSERT OR IGNORE INTO admin_users (username, password_hash, name, email, role) VALUES (?, ?, ?, ?, ?)').run('admin', hash, 'Sistem Yoneticisi', 'admin@turkuntarihi.com', 'superadmin');
console.log('Admin olusturuldu: admin / Admin123!');
"
```

---

## Adim 9: PM2 ile Baslat

```bash
# PM2 kur (eger kurulu degilse)
npm install -g pm2

# Uygulamayi baslat
cd /root/Turkuntarihi
pm2 start dist/boot.js --name "turk-tarihi" --env NODE_ENV=production --env PORT=3000

# PM2'yi sistem baslangicina ekle
pm2 save
pm2 startup systemd
# Yukaridaki komut bir cikti verecek, o ciktiyi calistir
```

---

## Adim 10: Nginx'i Guncelle

```bash
cat > /tmp/nginx-turkuntarihi << 'NGINX_EOF'
server {
    listen 80;
    server_name turkuntarihi.com www.turkuntarihi.com;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name turkuntarihi.com www.turkuntarihi.com;

    ssl_certificate /etc/letsencrypt/live/turkuntarihi.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/turkuntarihi.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 1d;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 30s;
    }
}
NGINX_EOF

sudo cp /tmp/nginx-turkuntarihi /etc/nginx/sites-available/turkuntarihi
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/turkuntarihi /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## Test Et

1. `https://turkuntarihi.com` - Ana sayfa acilmali
2. `https://turkuntarihi.com/geri-bildirim` - Feedback formu calismali
3. `https://turkuntarihi.com/yonetim/giris` - Admin girisi calismali
   - Kullanici: `admin`
   - Sifre: `Admin123!`

---

## Sorun Cozumu

### PM2 loglari kontrol et:
```bash
pm2 logs turk-tarihi
pm2 status
```

### Port 3000'in bos oldugunu kontrol et:
```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null
pm2 restart turk-tarihi
```

### Nginx hatalari:
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### Veritabani sifirla (eger gerekirse):
```bash
cd /root/Turkuntarihi
rm -f data/turkuntarihi.db
npx drizzle-kit push
npx tsx db/seed.ts
```
