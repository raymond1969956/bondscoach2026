# Bondscoach2026 🇳🇱⚽

Starter-project voor een WK 2026 voorspelsite met:
- Next.js
- Tailwind CSS
- Supabase
- Tikkie-flow
- Adminpanel
- Voorspellingen
- Klassement
- Spelregels

## Installeren

```bash
npm install
npm run dev
```

Maak een `.env.local` bestand op basis van `.env.example`.

## Supabase

Open Supabase → SQL Editor → plak `supabase/schema.sql` → Run.

## Flow

1. Deelnemer meldt zich aan.
2. Deelnemer betaalt €5 via Tikkie.
3. Organisator zet deelnemer handmatig op betaald in adminpanel.
4. Deelnemer kan voorspellingen invullen.
5. Uitslagen worden ingevoerd door admin.
6. Punten en klassement worden bijgewerkt.
