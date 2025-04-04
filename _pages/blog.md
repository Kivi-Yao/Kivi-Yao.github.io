---
layout: page
title: Blog
permalink: /blog/
nav: Blog
---

<div class="container">
  <h2>Blog Posts</h2>

  <div class="tag-filter mb-4">
    <strong>Filter by tag:</strong>
    <span class="badge badge-info tag-button" data-tag="all" onclick="filterByTag('all')">All</span>
    {% assign tags = site.tags | sort %}
    {% for tag in tags %}
      <span class="badge badge-secondary tag-button" data-tag="{{ tag[0] }}" onclick="filterByTag('{{ tag[0] }}')">
        {{ tag[0] }}
      </span>
    {% endfor %}
  </div>

  <div id="blog-posts">
    {% for post in site.posts %}
      <div class="blog-entry mb-4" data-tags="{{ post.tags | join: ',' }}">
        <h4><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h4>
        <p class="text-muted">{{ post.date | date: "%B %-d, %Y" }}</p>
        <p>{{ post.excerpt | strip_html | truncate: 200 }}</p>
        <a href="{{ post.url | prepend: site.baseurl }}">Read more →</a>
      </div>
    {% endfor %}
  </div>
</div>

<style>
  .tag-button {
    cursor: pointer;
    margin: 0 5px 5px 0;
  }
  .tag-button:hover {
    background-color: #e84a27 !important;
    color: white;
  }
  .blog-entry {
    background-color: rgba(255,255,255,0.05);
    padding: 1rem;
    border-radius: 0.5rem;
    backdrop-filter: blur(4px);
  }
  .tag-button.active {
    background-color: #e84a27 !important;
    color: white !important;
    font-weight: bold;
    box-shadow: 0 0 6px rgba(232, 74, 39, 0.5);
  }
</style>

<script>
  function filterByTag(tag) {
    const entries = document.querySelectorAll('.blog-entry');
    entries.forEach(entry => {
      const tags = entry.dataset.tags.split(',');
      if (tag === 'all' || tags.includes(tag)) {
        entry.style.display = 'block';
      } else {
        entry.style.display = 'none';
      }
    });

    const buttons = document.querySelectorAll('.tag-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-tag="${tag}"]`);
    if (activeBtn) activeBtn.classList.add('active');
  }
</script>