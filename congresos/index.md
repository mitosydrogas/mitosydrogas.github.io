---
layout: page
title: Congresos
permalink: /congresos/
nav-menu: true
pagination:
  enabled: true
  collection: congresos
  per_page: 6
---

<!-- Intro -->
<section id="intro">
  <div class="inner">
    <p>Mitos y Drogas comparte sus investigaciones y materiales de reducción de daños en foros académicos, ferias de ciencias y simposios profesionales.  
    Cada ficha que encontrarás abajo incluye la fecha, sede y el material de apoyo (póster, diapositivas o resumen ejecutivo) presentado por algún colaborador.  
    El objetivo es <strong>poner en circulación evidencia reciente y abrir diálogo</strong> con especialistas en neurociencias, salud pública y políticas de drogas.</p>
  </div>
</section>

<!-- Tiles -->
<section id="one" class="tiles">
  {%- comment -%}
  • Si jekyll-paginate-v2 está activo usamos paginator.posts;
    de lo contrario usamos la colección entera ordenada.
  {%- endcomment -%}
  {% if paginator %}
    {% assign events = paginator.posts %}
  {% else %}
    {% assign events = site.congresos | sort: "date" | reverse %}
  {% endif %}

  {% for ev in events %}
    {%- assign cover = ev.logo | default: ev.poster | default: "/assets/images/pic01.jpg" -%}
    <article>
      <span class="image">
        <img src="{{ cover | relative_url }}" alt="" />
      </span>
      <header class="major">
        <h3><a href="{{ ev.url | relative_url }}" class="link">{{ ev.title }}</a></h3>
        <p>{{ ev.summary | default: ev.excerpt | strip_html | truncate: 120 }}</p>
      </header>
    </article>
  {% endfor %}
</section>
