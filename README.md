# Kiosco El Rápido – Frontend (Parte 2)

SPA hecha con Vite + React + TypeScript y react-router-dom que consume la API de `kiosco-backend`.

## Instalación y ejecución

Primero levantar el backend (ver su README). Después:

```bash
npm install
npm run dev
```

Abrir http://localhost:5173

## Apuntar a la API

La URL de la API está en `src/services/api.ts`:

```ts
const API_URL = "http://localhost:8000/api";
```

Si el backend corre en otra dirección o puerto, cambiar ese valor.
