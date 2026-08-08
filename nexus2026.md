---
title: Dragonsteel Nexus 2026 Directory
---

# Dragonsteel Nexus 2026 Directory

Browse featured guests, exhibitors, authors, artists, panelists, and other attendees for Dragonsteel Nexus 2026.

{% assign total_cards = 0 %}
{% for entry in site.data.nexus2026 %}
  {% if entry.categories %}
    {% assign entry_cats = entry.categories %}
  {% else %}
    {% assign entry_cats = entry.category | split: "," %}
  {% endif %}
  {% assign total_cards = total_cards | plus: entry_cats.size %}
{% endfor %}

<div class="nexus-directory" id="nexusDirectory" data-total="{{ total_cards }}">
  <div class="nexus-controls">
    <label class="nexus-search">
      <span class="visually-hidden">Search directory</span>
      <input type="search" id="nexusSearch" placeholder="Search by name, brand, or keyword…" autocomplete="off">
    </label>
    <div class="nexus-filters" id="nexusFilters" role="group" aria-label="Filter by category">
      <button type="button" class="nexus-filter-btn active" data-filter="all">All</button>
      <button type="button" class="nexus-filter-btn" data-filter="guests">Featured Guests</button>
      <button type="button" class="nexus-filter-btn" data-filter="exhibitors">Exhibitors</button>
      <button type="button" class="nexus-filter-btn" data-filter="authors">Authors</button>
      <button type="button" class="nexus-filter-btn" data-filter="artists">Artists</button>
      <button type="button" class="nexus-filter-btn" data-filter="panelists">Panelists</button>
      <button type="button" class="nexus-filter-btn" data-filter="other">Other Attendees</button>
      <button type="button" class="nexus-filter-btn" data-filter="not-attending">Not Attending</button>
    </div>
  </div>

  <p class="nexus-stats" id="nexusStats" aria-live="polite">Showing {{ total_cards }} of {{ total_cards }} entries</p>

  <div class="nexus-grid" id="nexusGrid">
    {% for entry in site.data.nexus2026 %}
      {% if entry.categories %}
        {% assign entry_cats = entry.categories %}
      {% else %}
        {% assign entry_cats = entry.category | split: "," %}
      {% endif %}
      {% for cat in entry_cats %}
        {% assign cat_key = cat | strip %}
        {% case cat_key %}
          {% when "guests" %}
            {% assign badge_label = "Featured Guest" %}
          {% when "exhibitors" %}
            {% assign badge_label = "Exhibitor" %}
          {% when "authors" %}
            {% assign badge_label = "Author" %}
          {% when "artists" %}
            {% assign badge_label = "Artist" %}
          {% when "panelists" %}
            {% assign badge_label = "Panelist" %}
          {% when "other" %}
            {% assign badge_label = "Attendee" %}
          {% when "not-attending" %}
            {% assign badge_label = "Not Attending" %}
          {% else %}
            {% assign badge_label = cat_key %}
        {% endcase %}
        <article
          class="nexus-card"
          data-category="{{ cat_key }}"
          data-name="{{ entry.name | downcase | escape }}"
        >
          <div class="nexus-card-top">
            <h3 class="nexus-card-title">{{ entry.name }}</h3>
            <span class="nexus-badge nexus-badge-{{ cat_key }}">{{ badge_label }}</span>
          </div>
          <div class="nexus-card-actions">
            {% if entry.url and entry.url != "" %}
              <a href="{{ entry.url }}" class="nexus-link">Visit website</a>
            {% else %}
              <span class="nexus-link-disabled">No link available</span>
            {% endif %}
          </div>
        </article>
      {% endfor %}
    {% endfor %}
  </div>

  <div class="nexus-no-results" id="nexusNoResults" hidden>
    <p><strong>No listings found.</strong></p>
    <p>Try a different keyword or category.</p>
  </div>
</div>

<script src="{{ "/assets/js/nexus2026.js" | relative_url }}"></script>
