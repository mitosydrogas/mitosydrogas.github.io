---
layout: congreso               # usa el nuevo layout
title:  "RIIPN–AMIPRONAT 2025"
date:   2025-05-28
place:  "Mérida Yucatán, México"
autores:
  - Gerardo Ortega Alcocer
summary: "Participación de receptores 5-HT₁A y 5-HT₂A en el efecto ansiolítico del hongo completo *Psilocybe cubensis* en ratones"
logo: "/assets/images/20riipn_logo.jpg"
poster: "/assets/pdf/MecanismoPcubensisGerardoOrtegaAlcocerAMIPRONAT2025.pdf"
tags: [reducción de daños, neurofarmacología]
---

## Contenido
- [Contenido](#contenido)
- [Introducción](#introducción)
- [Mapa interactivo](#mapa-interactivo)
  - [Kepler.gl](#keplergl)
  - [Capas de datos](#capas-de-datos)
- [Póster](#póster)

---

## Introducción

Se estima que para 2050 más de 87 millones de personas padecerán trastornos de ansiedad, lo que impulsa la búsqueda de nuevas alternativas terapéuticas. Los hongos del género *Psilocybe*, venerados desde épocas prehispánicas, contienen psilocibina, alcaloide con efectos ansiolíticos mediados por los receptores serotoninérgicos 5‑HT₁A y 5‑HT₂A. Sin embargo, la evidencia se ha concentrado en la psilocibina aislada, dejando pendiente el estudio del hongo completo. Este trabajo evalúa, en un modelo murino, la participación de dichos receptores en el efecto ansiolítico del extracto acuoso de *Psilocybe cubensis*.

---

## Mapa interactivo

Explora la diversidad del género *Psilocybe* en México:

<a href="/assets/html/DiversidadPsilocybe.html" class="button" target="_blank">
  Abrir visor interactivo en una nueva pestaña
</a>

<iframe
  src="/assets/html/DiversidadPsilocybe.html"
  style="width:100%; height:650px; border:none;">
</iframe>

### Kepler.gl

[Kepler.gl](https://kepler.gl) es una plataforma **open‑source** para crear visualizaciones geoespaciales interactivas en el navegador. Puedes explorar los datos de *Psilocybe* en México y sus correlaciones con variables ambientales como precipitación y temperatura. Prueba los controles de la parte inferior derecha para cambiar entre capas, ajustar la opacidad y el color, y activar o desactivar las etiquetas. También puedes hacer clic en los puntos para ver información adicional.
> **Tip:** Para disfrutar de todos los controles avanzados (panel de capas, vista 3D, filtros, etc.) abre el visor en una nueva pestaña con el botón «Abrir visor interactivo». La versión mostrada más arriba puede no funcionar correctamente por razones de seguridad en el navegador.

### Capas de datos

| Capa (nombre en Kepler)                                      | Formato · Tipo geométrico | Fuente                                                                                       |
| ------------------------------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------- |
| **Observaciones17May25.csv**<br>Observaciones de *Psilocybe* | CSV · Puntos              | [Naturalista México](https://www.naturalista.mx/)                                            |
| **GeoJSON – Precipitación media anual.json**                 | GeoJSON · Polígonos       | [IDEA-UNAM – Descarga de Información Geográfica](https://www.gits.igg.unam.mx/idea/descarga) |
| **GeoJSON – Régimen térmico.json**                           | GeoJSON · Polígonos       | [IDEA-UNAM – Descarga de Información Geográfica](https://www.gits.igg.unam.mx/idea/descarga) |
| **GeoJSON – Sitios arqueológicos del INAH.json**             | GeoJSON · Puntos          | [IDEA-UNAM – Descarga de Información Geográfica](https://www.gits.igg.unam.mx/idea/descarga) |

> **Nota de procedencia:** salvo la capa de observaciones de Naturalista, todas las demás fueron descargadas del portal IDEA‑UNAM el 17 de mayo de 2025. Consulta sus metadatos en el portal para detalles de escala, proyección y licencia de uso.

---

## Póster

<object data="{{ page.poster | relative_url }}#page=1" type="application/pdf" width="100%" height="600">
  <p>Tu navegador no puede mostrar el PDF. <a href="{{ page.poster | relative_url }}">Descargar póster</a>.</p>
</object>