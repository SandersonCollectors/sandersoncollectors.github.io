# Donate to the Sanderson Collectors Guild

## Money

All donations are tax-deductible and 100% of all funds are used for our [ongoing projects](/projects).

<ul>
{% for link in site.data.links %}
  {% if link[1].categories contains "donate" %}
  <li><a href="{{ link[1].url }}" alt="{{ link[1].description }}">{{ link[1].description }}</a></li>
  {% endif %}
{% endfor %}
</ul>

## Books

Do you have Cosmere books you don't want anymore? We'll have a "Brandon Bargain Bin" at our booth at Dragonsteel Nexus 2025, so attendees can fill out their collections (or get new reading copies) for cheap. We've got a bunch already, but we're looking for more! If you'd like to donate, please [fill out this Google form and we'll be in touch](https://forms.gle/dCTyyZBybsMnJWz96)!
