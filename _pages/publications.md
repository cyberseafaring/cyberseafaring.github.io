---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
lang: en
---

<link rel="stylesheet" href="{{ '/assets/css/academic-profile.css' | relative_url }}">

<p><a href="{{ site.author.googlescholar | escape }}">Google Scholar</a></p>

{% include recent-publications.html archive=true %}

{% assign current_year = site.time | date: '%Y' | plus: 0 %}
{% assign first_year = current_year | minus: 4 %}
{% assign publication_years = site.data.recent_publications | group_by: 'year' | sort: 'name' | reverse %}
<section class="publication-index" aria-labelledby="publications-by-year-title">
  <h2 id="publications-by-year-title">Publications from the past five years ({{ first_year }}–{{ current_year }})</h2>
  {% for year in publication_years %}
    {% assign publication_year = year.name | plus: 0 %}
    {% if publication_year >= first_year and publication_year <= current_year %}
      <h3>{{ publication_year }}</h3>
      <ul>
        {% for paper in year.items %}
          <li>
            {% capture paper_title %}<span{% if paper.lang %} lang="{{ paper.lang | escape }}"{% endif %}>{{ paper.title | escape }}</span>{% endcapture %}
            {% if paper.url %}
              <a href="{{ paper.url | escape }}">{{ paper_title }}</a>
            {% elsif paper.doi %}
              <a href="https://doi.org/{{ paper.doi | escape }}">{{ paper_title }}</a>
            {% else %}
              <strong>{{ paper_title }}</strong>
            {% endif %}
            <p>{{ paper.authors | escape | replace: 'Zhang, R.', '<strong>Zhang, R.</strong>' }}</p>
            <p><em>{{ paper.venue | escape }}</em>{% if paper.details %} · {{ paper.details | escape }}{% endif %}</p>
          </li>
        {% endfor %}
      </ul>
    {% endif %}
  {% endfor %}
</section>
