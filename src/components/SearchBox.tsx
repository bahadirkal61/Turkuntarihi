import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Crown, Landmark, BookOpen, Scroll, Users, ArrowRight } from "lucide-react";
import { DYNASTIES } from "../data/dynasties";

interface Ruler {
  id: string;
  name: string;
  title: string;
  period: string;
  dynasty: string;
  dynastyId: string;
}

interface Figure {
  id: string;
  name: string;
  title: string;
  period: string;
  category: string;
  description: string;
}

interface Epic {
  id: string;
  title: string;
  period: string;
  origin: string;
}

interface Inscription {
  id: string;
  name: string;
  year: string;
  location: string;
}

interface SearchResult {
  id: string;
  name: string;
  subtitle: string;
  type: "ruler" | "dynasty" | "figure" | "epic" | "inscription";
  url: string;
  color?: string;
}

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [allRulers, setAllRulers] = useState<Ruler[]>([]);
  const [allFigures, setAllFigures] = useState<Figure[]>([]);
  const [allEpics, setAllEpics] = useState<Epic[]>([]);
  const [allInscriptions, setAllInscriptions] = useState<Inscription[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load all searchable data on mount
  useEffect(() => {
    fetch('/data/rulers.json')
      .then((res) => res.json())
      .then((data: Ruler[]) => setAllRulers(data))
      .catch(() => setAllRulers([]));

    fetch('/data/turkish-figures.json')
      .then((res) => res.json())
      .then((data: Figure[]) => setAllFigures(data))
      .catch(() => setAllFigures([]));

    fetch('/data/epics.json')
      .then((res) => res.json())
      .then((data: { epics?: Epic[] } | Epic[]) => {
        const list = Array.isArray(data) ? data : data.epics || [];
        setAllEpics(list);
      })
      .catch(() => setAllEpics([]));

    fetch('/data/inscriptions.json')
      .then((res) => res.json())
      .then((data: { inscriptions?: Inscription[] } | Inscription[]) => {
        const list = Array.isArray(data) ? data : data.inscriptions || [];
        setAllInscriptions(list);
      })
      .catch(() => setAllInscriptions([]));
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Fixed escapeRegex - properly escapes $ character
  const escapeRegex = useCallback((str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }, []);

  // Search function
  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      const q = searchQuery.toLowerCase().trim();
      const searchResults: SearchResult[] = [];

      // Search rulers
      allRulers.forEach((ruler) => {
        const nameMatch = ruler.name.toLowerCase().includes(q);
        const titleMatch = ruler.title?.toLowerCase().includes(q);
        const periodMatch = ruler.period?.toLowerCase().includes(q);
        const dynastyMatch = ruler.dynasty?.toLowerCase().includes(q);

        if (nameMatch || titleMatch || periodMatch || dynastyMatch) {
          const dynastyInfo = DYNASTIES[ruler.dynastyId];
          searchResults.push({
            id: ruler.id,
            name: ruler.name,
            subtitle: `${ruler.title} · ${ruler.period} · ${ruler.dynasty}`,
            type: "ruler",
            url: `/tarih/${ruler.dynastyId}/${ruler.id}`,
            color: dynastyInfo?.color,
          });
        }
      });

      // Search dynasties
      Object.entries(DYNASTIES).forEach(([dynId, dyn]) => {
        const nameMatch = dyn.name.toLowerCase().includes(q);
        const descMatch = dyn.description?.toLowerCase().includes(q);
        const periodMatch = dyn.period?.toLowerCase().includes(q);

        if (nameMatch || descMatch || periodMatch) {
          const alreadyAdded = searchResults.some(
            (r) => r.type === "dynasty" && r.id === dynId
          );
          if (!alreadyAdded) {
            searchResults.push({
              id: dynId,
              name: dyn.name,
              subtitle: `${dyn.period} · ${dyn.description?.slice(0, 60)}...`,
              type: "dynasty",
              url: `/tarih/${dynId}`,
              color: dyn.color,
            });
          }
        }
      });

      // Search figures (biographies)
      allFigures.forEach((figure) => {
        const nameMatch = figure.name.toLowerCase().includes(q);
        const titleMatch = figure.title?.toLowerCase().includes(q);
        const descMatch = figure.description?.toLowerCase().includes(q);
        const periodMatch = figure.period?.toLowerCase().includes(q);

        if (nameMatch || titleMatch || descMatch || periodMatch) {
          searchResults.push({
            id: figure.id,
            name: figure.name,
            subtitle: `${figure.title} · ${figure.period}`,
            type: "figure",
            url: `/biyografiler`,
            color: "#a855f7",
          });
        }
      });

      // Search epics
      allEpics.forEach((epic) => {
        const nameMatch = epic.title?.toLowerCase().includes(q);
        const periodMatch = epic.period?.toLowerCase().includes(q);
        const originMatch = epic.origin?.toLowerCase().includes(q);

        if (nameMatch || periodMatch || originMatch) {
          searchResults.push({
            id: epic.id,
            name: epic.title,
            subtitle: `${epic.period} · ${epic.origin}`,
            type: "epic",
            url: `/destanlar`,
            color: "#f59e0b",
          });
        }
      });

      // Search inscriptions
      allInscriptions.forEach((insc) => {
        const nameMatch = insc.name?.toLowerCase().includes(q);
        const yearMatch = insc.year?.toLowerCase().includes(q);
        const locMatch = insc.location?.toLowerCase().includes(q);

        if (nameMatch || yearMatch || locMatch) {
          searchResults.push({
            id: insc.id,
            name: insc.name,
            subtitle: `${insc.year} · ${insc.location}`,
            type: "inscription",
            url: `/yazitlar`,
            color: "#38bdf8",
          });
        }
      });

      // Sort: exact name matches first, then starts with, then includes
      searchResults.sort((a, b) => {
        const aExact = a.name.toLowerCase() === q;
        const bExact = b.name.toLowerCase() === q;
        if (aExact && !bExact) return -1;
        if (bExact && !aExact) return 1;

        const aStarts = a.name.toLowerCase().startsWith(q);
        const bStarts = b.name.toLowerCase().startsWith(q);
        if (aStarts && !bStarts) return -1;
        if (bStarts && !aStarts) return 1;

        // Rulers > dynasties > figures > epics > inscriptions
        const typeOrder = { ruler: 0, dynasty: 1, figure: 2, epic: 3, inscription: 4 };
        return typeOrder[a.type] - typeOrder[b.type];
      });

      setResults(searchResults.slice(0, 12)); // Max 12 results
      setIsOpen(searchResults.length > 0);
      setSelectedIndex(-1);
    },
    [allRulers, allFigures, allEpics, allInscriptions, escapeRegex]
  );

  // Debounced search
  const handleInputChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 150);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" && results.length > 0) {
        setIsOpen(true);
        setSelectedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          navigate(results[selectedIndex].url);
          setIsOpen(false);
          setQuery("");
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(result.url);
    setIsOpen(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const typeLabels: Record<string, string> = {
    ruler: "Hükümdar",
    dynasty: "Devlet",
    figure: "Biyografi",
    epic: "Destan",
    inscription: "Yazıt",
  };

  const typeIcons = {
    ruler: Crown,
    dynasty: Landmark,
    figure: Users,
    epic: BookOpen,
    inscription: Scroll,
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      {/* Search Input */}
      <div
        className={`relative flex items-center bg-stone-900/60 backdrop-blur-md border rounded-2xl transition-all duration-200 ${
          isOpen && results.length > 0
            ? "border-amber-500/50 shadow-lg shadow-amber-500/10"
            : "border-stone-700 hover:border-stone-600"
        }`}
      >
        <Search className="w-5 h-5 text-stone-500 ml-4 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim()) performSearch(query);
          }}
          placeholder="Hükümdar, devlet, biyografi, destan veya yazıt ara..."
          className="w-full bg-transparent text-white placeholder-stone-500 px-3 py-3.5 text-sm focus:outline-none"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="mr-3 p-1 rounded-full hover:bg-stone-700 transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-stone-500" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50 max-h-[440px] overflow-y-auto">
          {/* Results header */}
          <div className="px-4 py-2 text-xs text-stone-500 border-b border-stone-800 flex items-center justify-between">
            <span>{results.length} sonuç</span>
            <span className="text-stone-600">↑↓ seç · Enter git</span>
          </div>

          {/* Result items */}
          {results.map((result, index) => {
            const isSelected = index === selectedIndex;
            const Icon = typeIcons[result.type] || Crown;
            return (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleSelect(result)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-stone-800/50 last:border-b-0 ${
                  isSelected ? "bg-stone-800" : "hover:bg-stone-800/50"
                }`}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: result.color
                      ? `${result.color}20`
                      : "#44403c40",
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: result.color || "#a8a29e" }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {highlightMatch(result.name, query)}
                  </p>
                  <p className="text-stone-500 text-xs truncate">
                    {result.subtitle}
                  </p>
                </div>

                <span className="text-[10px] text-stone-600 bg-stone-800 px-1.5 py-0.5 rounded shrink-0">
                  {typeLabels[result.type] || result.type}
                </span>

                <ArrowRight
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isSelected ? "text-amber-400" : "text-stone-700"
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* No results */}
      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl shadow-black/50 p-6 text-center z-50">
          <Search className="w-8 h-8 text-stone-600 mx-auto mb-2" />
          <p className="text-stone-400 text-sm">
            &ldquo;{query}&rdquo; ile ilgili sonuç bulunamadı
          </p>
          <p className="text-stone-600 text-xs mt-1">
            Hükümdar adı, dönem, devlet adı, biyografi, destan veya yazıt deneyin
          </p>
        </div>
      )}
    </div>
  );
}

// Highlight matching text
function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;

  try {
    const parts = text.split(new RegExp(`(${escapeRegexLiteral(query)})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-amber-400 font-semibold">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  } catch {
    return text;
  }
}

function escapeRegexLiteral(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
