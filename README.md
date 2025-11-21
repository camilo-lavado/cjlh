# 🏈 Liga Jamón — Landing Oficial (v1.0 Prototype)

**“Sangre, Sudor y Embutidos”**

Landing page oficial de la **Liga Jamón**, una liga de Blood Bowl con estética irreverente, brutal y altamente estilizada.  
Actualmente en **fase de prototipo funcional**, implementada como SPA con React + Vite.

---

## 📋 Estado del Proyecto

SPA totalmente responsiva con enfoque **“Broadcast Style UX”**, simulando una transmisión deportiva oscura, caótica y de alto impacto visual.

---

## 🧩 Stack Tecnológico

- **React 18 + Vite**
- **Tailwind CSS v3.4**
- **Lucide React** (iconos)
- **React Hooks (useState / useEffect)**
- **localStorage** (persistencia de tema Dark/Light)

---

## 🚀 Funcionalidades Implementadas

### 1. Interfaz de Usuario (UI)

#### **Diseño Temático**
- **Modo Oscuro (default):** estilo “underground/morgue”, fibra de carbono, neón eléctrico.  
- **Modo Claro:** “pizarra táctica” con gradientes azul hielo.

#### **Animaciones**
- Ticker de noticias estilo *marquee*.
- Textos con efecto **glitch**.
- Bordes pulsantes (“alta tensión”).
- Brillos mágicos.
- Modales con transiciones suaves.

---

### 2. Secciones Principales

#### **Header Dinámico**
- Navegación con scroll suave.
- **Billetera Virtual** en Monedas de Oro (MO).
- **Resultados Quincena** en ticker horizontal.

#### **Hero**
- Portada de impacto con CTA.

#### **Ticker de Noticias**
- Barra urgente estilo TV deportiva.

#### **Acción en Vivo**
- **Fixture quincenal** con clima, estadio y horarios.  
- Indicadores de **bounty** en partidos especiales.  
- **Tabla de Clasificación** con estadísticas completas:
  - PJ, G, E, P, CAS, PTS  
  - Zona de playoffs destacada

#### **Prensa y Rumores**
- **Diario de la Morgue:** crónica del día en estilo periódico antiguo.
- **El Oráculo:** predicciones con modal interactivo para apuestas.

#### **Salón de la Fama**
- Campeón / Subcampeón / Tercer lugar.

#### **Staff Técnico**
- Tarjetas por entrenador con:
  - Oros / Platas / Bronces  
  - Premios especiales  
  - Raza favorita  
  - Citas célebres

#### **Logros**
- Grid de insignias estilo Steam, con tooltips.

---

### 3. Lógica de Negocio (Simulada)

#### **Sistema de Apuestas**
- Billetera inicial: **50.000 MO**
- Validación de saldo
- Feedback visual (toasts)
- Apuestas:
  - “Seguir al Oráculo”
  - “Ir a la Contra”

#### **Modal Polimórfico**
Un único componente capaz de renderizar:
- Crónica (estética papel)
- Predicción (estética mística)

---

## 📂 Estructura Actual del Proyecto

El prototipo es monolítico — todo vive dentro de `App.jsx`.

```
/
├── public/
├── src/
│   ├── App.jsx            # ⚠️ Todo el código central
│   ├── index.css          # Tailwind base
│   └── main.jsx           # Entry point
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🛠️ Datos Simulados (Mocks)

Definidos directamente dentro de `App.jsx`:

- `CURRENT_STANDINGS` → Tabla de posiciones  
- `CURRENT_FIXTURE` → Partidos, cuotas y bounty  
- `CHRONICLES` → Narrativa y oráculo  
- `COACHES` → Datos de entrenadores  
- `AWARDS` → Logros e insignias  

Preparado para futura integración con API o CMS.

---

## 🔮 Plan de Refactorización

### **Objetivo general:** Migrar hacia una arquitectura modular **basada en Astro**.

#### **1. Desacoplar componentes**
Mover lógica de `App.jsx` a componentes:

```
src/components/
├── Fixture.jsx
├── Standings.jsx
├── OracleModal.jsx
└── CoachCard.jsx
```

#### **2. Gestión de Contenido con Content Collections**
- Mover datos a `src/content/` en JSON/Markdown.
- Mejorar mantenibilidad y escalabilidad.

#### **3. Rutas**
- Evaluar router real si se agregan más páginas.

#### **4. Estado Global**
- Uso de **Nano Stores** para la billetera virtual.

---

## 💻 Instalación y Ejecución

```bash
git clone <url-del-repo>
cd liga-jamon
npm install
npm run dev
```

Para producción:

```bash
npm run build
```

Requiere:

```bash
npm i lucide-react
```

---

## ❤️ Créditos

Proyecto creado con pasión, humor oscuro y una saludable cantidad de **código espagueti** (por ahora).
