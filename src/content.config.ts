import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * PROJETS — un dossier par projet : src/content/projects/<slug>/
 *   index.fr.md        présentation (obligatoire) ; index.en.md optionnel
 *   01-xxx.fr.md …     chapitres du compte rendu (ordre = nom de fichier)
 * Un fichier sans suffixe de langue (ex. index.md) est considéré comme français.
 * Un nom commençant par « _ » est ignoré.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    status: z.enum(['done', 'live', 'planned']).default('done'),
    context: z.string().optional(), // ex. « PPE · BTS SIO 2 »
    tags: z.array(z.string()).default([]),
    order: z.number().default(100), // ordre d'affichage des projets (petit = en premier)
    date: z.coerce.date().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    files: z.array(z.object({ label: z.string(), path: z.string() })).default([]), // ex. /files/lab-wazuh/rapport.pdf
    draft: z.boolean().default(false),
  }),
});

/**
 * WRITEUPS CTF — un fichier par writeup : src/content/writeups/<evenement>-<defi>.md
 * Les fichiers commençant par « _ » sont ignorés (modèle : _template.md).
 */
const writeups = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/writeups' }),
  schema: z.object({
    title: z.string(),
    ctf: z.string(), // nom de la compétition
    category: z.enum(['web', 'crypto', 'pwn', 'rev', 'forensics', 'osint', 'stego', 'network', 'system', 'misc']),
    difficulty: z.enum(['easy', 'medium', 'hard', 'insane']).optional(),
    points: z.number().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    lang: z.enum(['fr', 'en']).default('fr'), // langue dans laquelle le writeup est rédigé
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writeups };
