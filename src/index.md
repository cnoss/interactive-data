---
title: HOME
layout: default.11ty.js
---

<div class="section herotext">
<h1 class="semi-brutal">Mindmaps</h1>

<p>helfen, denn sie verbinden das Beste aus beiden Welten: Die linke Gehirnhälfte liebt Logik, Struktur und Ordnung – perfekt, um Inhalte klar zu sortieren. Die rechte Gehirnhälfte hingegen blüht bei Farben, Bildern und kreativen Verknüpfungen auf. Eine Mindmap spricht beide Seiten an und sorgt so für ein echtes Power-Upgrade für die Denk- und Merkleistung.</p></div>


<div class="section">
<ul>
  {% for mindmap in collections.mindmap %}
  <li><a href="{{ mindmap.url | url }}">{{ mindmap.data.title }}</a></li>
  {% endfor %}
</ul>
</div>
