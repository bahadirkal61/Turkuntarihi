// @ts-nocheck

export interface Ruler {
  id: string;
  order: number;
  name: string;
  title: string;
  period: string;
  dynasty: string;
  dynastyId: string;
  era?: string;
  image: string;
  description?: string;
  fullBio: string;
  quote?: { text: string; source: string };
  achievements: string[];
  keyEvents: { year: string; title: string; description: string }[];
  relatedPeople?: { name: string; role: string; description: string }[];
  battles?: { name: string; year: string; result: string; description?: string }[];
  culture?: string;
  military?: string;
  legacy: string;
  predecessor?: string;
  successor?: string;
}

// Cache per dynasty
const cache: Record<string, Ruler[]> = {};
const loading: Record<string, Promise<Ruler[]>> = {};

export async function loadDynastyRulers(dynastyId: string): Promise<Ruler[]> {
  if (cache[dynastyId]) return cache[dynastyId];
  if (loading[dynastyId]) return loading[dynastyId];

  loading[dynastyId] = fetch(`/data/dynasties/${dynastyId}.json`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data: Ruler[]) => {
      cache[dynastyId] = data;
      return data;
    })
    .catch(err => {
      delete loading[dynastyId];
      console.error(`[rulers] Failed to load ${dynastyId}:`, err);
      throw err;
    });

  return loading[dynastyId];
}

export function getCachedDynastyRulers(dynastyId: string): Ruler[] | null {
  return cache[dynastyId] || null;
}

// Legacy: load all rulers (only needed for History page counts if any)
let allCache: Ruler[] | null = null;
let allLoading: Promise<Ruler[]> | null = null;

export async function loadAllRulers(): Promise<Ruler[]> {
  if (allCache) return allCache;
  if (allLoading) return allLoading;

  allLoading = fetch('/data/rulers.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data: Ruler[]) => {
      allCache = data;
      return data;
    });

  return allLoading;
}

export function getCachedAllRulers(): Ruler[] | null {
  return allCache;
}
