# 🥗 Control de gastos

Aplicación en **React + Vite + TypeScript** determinar un máximo de presupuesto para llevar un control de gastos
El proyecto **Context API**, **reducers** y un hook personalizado llamado useBudget que controla la lógica de la app.

---

## 🚀 Tecnologías utilizadas
- [React](https://react.dev/) → Librería principal para la UI
- [Vite](https://vitejs.dev/) → Bundler rápido para desarrollo y build
- [TypeScript](https://www.typescriptlang.org/) → Tipado estático y robustez en el código
- **Reducer + Context API** → Manejo de estado global sin necesidad de librerías externas

---

## 📂 Estructura del proyecto
 - src/ components/       # Componentes reutilizables (formularios, listas, etc.) 
 - context/          # Context API para estado global 
 - reducers/         # Reducers para lógica de actualización de estado 
 - hooks/            # Custom hooks si aplica 
 - App.tsx           # Componente principal main.tsx          # Punto de entrada

---

## ⚙️ Instalación y uso
1. Clonar el repositorio:
  ```bash
  git clone
  cd contador-calorias

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```
4. Generar el build de producción:
```bash
npm run build
```
5. Previsualizar build
```bash
npm run preview
```

## 🧪 Scripts disponibles
- npm run dev → entorno local con hot reload
- npm run build → build optimizado para producción
- npm run preview → servidor de preview del build
- npm run lint → verificación de estilo con ESLint
- npm run type-check → validación de tipos con TypeScript
- npm run test → pruebas unitarias (si se agregan con Vitest)

## 🎯 Funcionalidades principales
- Agregar un monto inicial de presupuesto
- Mediante un boton y una ventana modal, agregar gastos
- Modal con nombre de gasto, cantidad, categoría y fecha
- Categorización y filtro de los datos
- Al sobrepasar el límite, se restringe agregar más gastos

## 📦 CI/CD
Este proyecto puede desplegarse fácilmente en plataformas como:
- Vercel (integración directa con GitLab/GitHub)
- Netlify
- GitLab Pages
El pipeline recomendado incluye:
- Lint (npm run lint)
- Type-check (npm run type-check)
- Tests (npm run test)
- Build (npm run build)
- Deploy automático

