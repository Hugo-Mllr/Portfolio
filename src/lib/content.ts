import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

/** Les brouillons ne sont visibles qu'en dev (ou avec SHOW_DRAFTS=1 au build). */
export const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === '1';

type PEntry = CollectionEntry<'projects'>;

const PATH_RE = /projects\/([^/]+)\/([^/]+?)(?:\.(fr|en))?\.(?:md|mdx)$/;

function parse(e: PEntry) {
  const m = (e.filePath ?? '').replace(/\\/g, '/').match(PATH_RE);
  return m ? { slug: m[1], name: m[2], lang: (m[3] ?? 'fr') as Lang } : null;
}

export interface Chapter { name: string; entry: PEntry; fallback: boolean }
export interface ProjectView { slug: string; entry: PEntry; fallback: boolean; chapters: Chapter[] }

function pick(versions: Partial<Record<Lang, PEntry>>, lang: Lang) {
  const exact = versions[lang];
  if (exact) return { entry: exact, fallback: false };
  const other = versions[lang === 'fr' ? 'en' : 'fr'];
  return other ? { entry: other, fallback: true } : null;
}

export async function getProjects(lang: Lang): Promise<ProjectView[]> {
  const all = (await getCollection('projects')).filter((e) => showDrafts || !e.data.draft);
  const bySlug = new Map<string, Map<string, Partial<Record<Lang, PEntry>>>>();
  for (const e of all) {
    const p = parse(e);
    if (!p) continue;
    const names = bySlug.get(p.slug) ?? new Map();
    const versions = names.get(p.name) ?? {};
    versions[p.lang] = e;
    names.set(p.name, versions);
    bySlug.set(p.slug, names);
  }
  const out: ProjectView[] = [];
  for (const [slug, names] of bySlug) {
    const idx = names.get('index') && pick(names.get('index')!, lang);
    if (!idx) continue;
    const chapters = [...names.entries()]
      .filter(([n]) => n !== 'index')
      .sort(([a], [b]) => a.localeCompare(b, 'en', { numeric: true }))
      .flatMap(([name, v]) => {
        const c = pick(v, lang);
        return c ? [{ name, ...c }] : [];
      });
    out.push({ slug, ...idx, chapters });
  }
  return out.sort((a, b) => a.entry.data.order - b.entry.data.order || a.entry.data.title.localeCompare(b.entry.data.title));
}

export async function getProject(lang: Lang, slug: string) {
  return (await getProjects(lang)).find((p) => p.slug === slug);
}

export async function getWriteups() {
  const all = (await getCollection('writeups')).filter((e) => showDrafts || !e.data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Notation d'échecs décorative selon la position du projet : 1. e4, 2. Cf3, 3. Fc4… */
const OPENING: [string, string?][] = [['e4'], ['N', 'f3'], ['B', 'c4'], ['d4'], ['N', 'c3'], ['B', 'b5'], ['Q', 'h5'], ['O-O']];
const FR_PIECE: Record<string, string> = { N: 'C', B: 'F', R: 'T', Q: 'D', K: 'R' };
export function notation(i: number, lang: Lang) {
  const [a, b] = OPENING[i % OPENING.length];
  if (!b) return a;
  return (lang === 'fr' ? FR_PIECE[a] ?? a : a) + b;
}

export function fmtDate(d: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
}
