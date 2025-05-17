---
layout: page
permalink: /publication/
title: Publication
nav: publication
description: <nobr><em>*</em></nobr> denotes equal contribution and joint lead authorship.
years: [2025,2024,2023]
---

<br/>

<!-- ✅ Tag selection UI -->
<div class="mb-3">
  <strong>Filter by Tag:</strong>
  <div id="tagFilterButtons"></div>
</div>

{% for y in page.years %}
  <div class="row m-0 p-0" style="border-top: 1px solid #ddd; flex-direction: row-reverse;">
    <div class="col-sm-1 mt-2 p-0 pr-1">
      <h3 class="bibliography-year">{{y}}</h3>
    </div>
    <div class="col-sm-11 p-0">
      {% bibliography -f papers -q @*[year={{y}}]* %}
    </div>
  </div>
{% endfor %}

<!-- ✅ JavaScript for Multi-Tag Filtering (Fixed AND Logic) -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
      generateTagButtons();
  });

  let selectedTags = new Set(); // ✅ Stores selected tags

  function generateTagButtons() {
      let tags = new Set();
      document.querySelectorAll(".publication-entry").forEach(function (pub) {
          let tagAttr = pub.getAttribute("data-tags");
          if (tagAttr) {
              tagAttr.split(",").forEach(function (tag) {
                  tags.add(tag.trim());
              });
          }
      });

      let tagButtonsContainer = document.getElementById("tagFilterButtons");
      tagButtonsContainer.innerHTML = "";

      // Ensure "Highlight" always appears first and styled differently
      if (tags.has("Highlight")) {
          let highlightBtn = document.createElement("span");
          highlightBtn.className = "badge badge-danger font-weight-bold tag-filter-button m-1";
          highlightBtn.textContent = "🏅 Highlight";
          highlightBtn.setAttribute("onclick", `toggleTag('Highlight')`);
          tagButtonsContainer.appendChild(highlightBtn);
          tags.delete("Highlight"); // Remove it to avoid duplication
      }

      tags.forEach(function (tag) {
          let btn = document.createElement("span");
          btn.className = "badge badge-primary tag-filter-button m-1";
          btn.textContent = tag;
          btn.setAttribute("onclick", `toggleTag('${tag}')`);
          tagButtonsContainer.appendChild(btn);
      });
  }

  function toggleTag(tag) {
      if (selectedTags.has(tag)) {
          selectedTags.delete(tag); // ✅ Unselect tag if clicked again
      } else {
          selectedTags.add(tag); // ✅ Select tag
      }
      updateFilter();
  }

  function updateFilter() {
      let publications = document.querySelectorAll(".publication-entry");

      publications.forEach(function(pub) {
          let pubTags = pub.getAttribute("data-tags").toLowerCase().split(",").map(t => t.trim());

          // ✅ Correct AND logic: Show publication if it contains *all* selected tags
          if (selectedTags.size === 0 || [...selectedTags].every(t => pubTags.includes(t.toLowerCase()))) {
              pub.style.display = "";
          } else {
              pub.style.display = "none";
          }
      });

      // ✅ Update button styles based on selection
      document.querySelectorAll(".tag-filter-button").forEach(function(btn) {
          if (selectedTags.has(btn.textContent)) {
              btn.classList.add("badge-dark");
          } else {
              btn.classList.remove("badge-dark");
          }
      });
  }
</script>