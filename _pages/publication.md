---
layout: page
permalink: /publication/
title: Publication
nav: publication
description: <nobr><em>*</em></nobr> denotes equal contribution and joint lead authorship.
years: [2025,2024,2023]
---

<br/>

<!-- ✅ Filter UI should be placed OUTSIDE the loop so it's not duplicated -->
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

<!-- ✅ JavaScript for Filtering Papers by Tags -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
      generateTagButtons();
  });

  function generateTagButtons() {
      var tags = new Set();
      document.querySelectorAll(".publication-entry").forEach(function (pub) {
          pub.getAttribute("data-tags").split(",").forEach(function (tag) {
              tags.add(tag.trim());
          });
      });

      var tagButtonsContainer = document.getElementById("tagFilterButtons");
      tagButtonsContainer.innerHTML = "";
      
      tags.forEach(function (tag) {
          var btn = document.createElement("span");
          btn.className = "badge badge-primary tag-filter-button m-1";
          btn.textContent = tag;
          btn.setAttribute("onclick", `filterByTag('${tag}')`);
          tagButtonsContainer.appendChild(btn);
      });

      // Add reset button
      var resetBtn = document.createElement("span");
      resetBtn.className = "badge badge-secondary m-1";
      resetBtn.textContent = "Clear Filter";
      resetBtn.setAttribute("onclick", "resetFilter()");
      tagButtonsContainer.appendChild(resetBtn);
  }

  function filterByTag(tag) {
      var publications = document.querySelectorAll(".publication-entry");

      publications.forEach(function(pub) {
          var tags = pub.getAttribute("data-tags").toLowerCase();
          if (tags.includes(tag.toLowerCase())) {
              pub.style.display = "";
          } else {
              pub.style.display = "none";
          }
      });

      // Highlight active filter
      document.querySelectorAll(".tag-filter-button").forEach(function(btn) {
          if (btn.textContent === tag) {
              btn.classList.add("badge-dark");
          } else {
              btn.classList.remove("badge-dark");
          }
      });
  }

  function resetFilter() {
      document.querySelectorAll(".publication-entry").forEach(function(pub) {
          pub.style.display = "";
      });

      // Remove highlight from buttons
      document.querySelectorAll(".tag-filter-button").forEach(function(btn) {
          btn.classList.remove("badge-dark");
      });
  }
</script>