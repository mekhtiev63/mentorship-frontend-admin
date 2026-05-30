# Mentorship Frontend Admin

SPA для роли **admin**. Vite-проект **в корне репозитория**.

**Backend:** [mentorship-backend](../mentorship-backend).  
**Раскладка:** [MENTORSHIP.md](../MENTORSHIP.md)

---

## Локальный запуск

```bash
npm install
npm run dev    # http://localhost:5174
```

```bash
cd ../mentorship-backend && make run
```

---

## Docker

Compose из **`../mentorship-backend`** (`context: ../mentorship-frontend-admin`).

---

## Mock vs API

Docker: `VITE_USE_MOCK=false`. Локально см. `src/shared/config/api-mode.ts`.

---

## Тестовые аккаунты

`admin@example.com`, пароль **`changeme`** (сиды в `mentorship-backend/seeds/`).
