---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
lang: en
---

<link rel="stylesheet" href="{{ '/assets/css/academic-profile.css' | relative_url }}">

<p><a href="{{ site.author.googlescholar | escape }}">Google Scholar · Full publication list</a></p>

{% include recent-publications.html archive=true %}

<section class="publication-index" aria-labelledby="more-publications-title">
  <h2 id="more-publications-title">More recent publications</h2>
  {% assign publication_years = site.data.recent_publications | group_by: 'year' %}
  {% for year in publication_years %}
    <h3>{{ year.name }}</h3>
    <ul>
      {% for paper in year.items %}
        {% unless paper.feature %}
          <li>
            <a href="https://doi.org/{{ paper.doi | escape }}">{{ paper.title | escape }}</a>
            <p>{{ paper.authors | escape | replace: 'Zhang, R.', '<strong>Zhang, R.</strong>' }}</p>
            <p><em>{{ paper.venue | escape }}</em>{% if paper.details %} · {{ paper.details | escape }}{% endif %}</p>
          </li>
        {% endunless %}
      {% endfor %}
    </ul>
  {% endfor %}
</section>
