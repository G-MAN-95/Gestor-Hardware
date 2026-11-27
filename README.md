# Gestor de Hardware

Proyecto de la **Tarea 3 – Uso de Git y Git Flow** (Programación III).

Aplicación web para llevar el inventario de equipos de hardware (computadoras, monitores, impresoras, equipos de red, etc.). Permite **registrar, ver, editar y eliminar** equipos. Está hecha con Node.js y Express.

## Requisitos

- Node.js 18 o superior

## Cómo ejecutarlo

```bash
npm install
npm start
```

Luego abre http://localhost:3000 en el navegador.

## Flujo de trabajo (Git Flow)

| Rama | Uso |
| --- | --- |
| `main` | Versión estable (producción) |
| `qa` | Pruebas y control de calidad |
| `dev` | Integración del desarrollo |
| `feature/*` | Nuevas funcionalidades |
| `hotfix/*` | Correcciones urgentes |

Cada rama de trabajo se integra mediante Pull Requests en este orden: `feature/*` → `dev` → `qa` → `main`.
