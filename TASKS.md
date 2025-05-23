# Stato del Progetto

Questo documento tiene traccia delle attività completate e da completare per risolvere i problemi di compatibilità nel progetto Next.js.

## Problemi Risolti

### 1. Problema CommunityProvider ✅
- ✅ Risolto il conflitto tra file duplicati del context
- ✅ Aggiornati tutti i percorsi di import per puntare a `@/src/contexts/CommunityContext`
- ✅ Rimosso il file duplicato in `contexts/CommunityContext.tsx`

### 2. Problema Tailwind CSS ✅
- ✅ Aggiornata la configurazione Tailwind per includere tutti i percorsi necessari
- ✅ Corretti i colori impostando valori esadecimali diretti invece di variabili HSL
- ✅ Aggiunto `background-color: white !important` per forzare lo sfondo bianco opaco

### 3. Consolidamento File CSS ✅
- ✅ Consolidato `app/globals.css` incorporando gli stili da `src/index.css`
- ✅ Rimosso il file CSS duplicato `src/index.css`
- ✅ Aggiornato `components.json` per utilizzare la corretta configurazione Tailwind

### 4. Configurazione Next.js e PostCSS ✅
- ✅ Rimosso `next.config.js` mantenendo solo `next.config.mjs`
- ✅ Rimosso `postcss.config.js` mantenendo solo `postcss.config.mjs`

### 5. Importazione Font e Classe Font-Handwriting ✅
- ✅ Importato il font Gloria Hallelujah in `app/layout.tsx`
- ✅ Aggiunta la classe `font-handwriting` in `app/globals.css`

### 6. Redesign CommunityCard ✅
- ✅ Creata variante "neobrutalist" con stile handwriting e bordi marcati
- ✅ Creata variante "minimal" con design moderno e pulito
- ✅ Ottimizzato il layout per i loghi delle community
- ✅ Aggiunto supporto per switch tra varianti tramite prop

### 7. Compatibilità Node.js e Dipendenze
- [ ] Aggiornare Node.js alla versione >=18.18.0 (attualmente 18.17.1)
- [x] Aggiunto campo "engines" in package.json per specificare la versione richiesta
- [x] Corretto la versione di Next.js da 15.2.4 a 14.1.0
- [x] Aggiornato React e React DOM alla versione 18.2.0
- [x] Rimosso dipendenze con versione "latest"
- [x] Aggiornato i tipi TypeScript e altre dipendenze
- [x] Migrato da pnpm a npm (package manager standard)
- [x] Verificare la build dopo l'aggiornamento delle dipendenze

### 8. Risoluzione Errori di Build (App Router vs Pages Router) ✅
- [x] Modificato `app/admin/page.tsx` per utilizzare correttamente `AdminClient.tsx` per la logica di autenticazione.
- [x] Identificata e rimossa la directory `src/pages` che causava conflitti con l'App Router.
- [x] Riattivata la funzione `generateStaticParams` in `app/submit/page.tsx`.
- [x] Riattivata la funzione `generateStaticParams` in `app/page.tsx` (Home).
- [x] Assicurato che `app/page.tsx` e `app/submit/page.tsx` utilizzino i rispettivi componenti client (`HomeClient` e `SubmitClient`).
- [x] Corretto il percorso di importazione per `AuthProvider` in `app/providers.tsx`.
- [x] Rimosso `generateStaticParams` da `app/admin/page.tsx` per trattarla come pagina dinamica e risolvere l'errore `useAuth` durante il build.
- [x] Rimosso commenti di diagnosi da `generateStaticParams` in `app/page.tsx` e `app/submit/page.tsx`.

## Problemi Rimanenti da Risolvere

### 1. Duplicazione Componenti
- [ ] Valutare se consolidare i componenti duplicati in `components/` e `src/components/`
- [ ] Stabilire una convenzione per le importazioni (usare sempre `@/` come prefisso)

## Piano di Implementazione

1. Standardizzare la struttura del progetto:
   - Decidere se usare `components/` o `src/components/` e consolidare
   - Aggiornare i path di import in modo coerente
   - Utilizzare sempre il prefisso `@/` per le importazioni

## File Rilevanti

- `tailwind.config.js` - Configurazione Tailwind corretta ✅
- `app/globals.css` - File CSS principale consolidato ✅
- `next.config.mjs` - Configurazione Next.js unificata ✅
- `postcss.config.mjs` - Configurazione PostCSS unificata ✅
- `components.json` - Configurazione dei componenti aggiornata ✅
- `app/layout.tsx` - Importazione del font Gloria Hallelujah ✅
- `src/components/home/CommunityCard.tsx` - Component card ridisegnato con due varianti ✅