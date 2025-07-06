# Donate to the Sanderson Collectors Guild

All donations are tax-deductible and 100% of all funds are used for our [ongoing projects](/projects).

<ul>
{% for link in site.links %}
  {% if link[1].categories contains "donate" %}
  <li><a href="{{ link[1].url }}" alt="{{ link[1].description }}">Donate via {{ link[1].service }}</a></li>
  {% endif %}
{% endfor %}
</ul>
