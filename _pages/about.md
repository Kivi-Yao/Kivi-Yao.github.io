---
layout: page
permalink: /
title: about
nav: About
description: <a href="https://siebelschool.illinois.edu/academics/graduate/ms-program" class="page-description" target="_blank">MSCS</a> • <a href="https://siebelschool.illinois.edu/" class="page-description" target="_blank">Sibel Computer Science Center</a> • <a href="https://illinois.edu/" class="page-description" target="_blank">UIUC</a>
address: <a href="https://www.google.com/maps/place/Thomas+M.+Siebel+Center+for+Computer+Science/@40.1138069,-88.2274801,17z/data=!3m2!4b1!5s0x880cd76a5762dfb7:0xcf6a023935717398!4m6!3m5!1s0x880cd76baa8479a9:0x4e9f01d40d359630!8m2!3d40.1138028!4d-88.2249052!16s%2Fm%2F0yqkg1s?entry=ttu" class="page-description" target="_blank">201 N Goodwin Ave, Urbana, IL 61801</a>
---

<div class="col p-0 pt-4 pb-4">
  <h1 class="title text-left font-weight-bold">Jinwei Yao</h1> 
  <h6 class="pb-3 m-0 mb-2" style="font-size: 0.83em;">Kivi</h6>
  <h6 class="m-0 mb-2" style="font-size: 0.83em;">{{ page.description }}</h6>
  {% if page.address %}
      <h6 class="m-0 mb-2" style="font-size: 0.83em;">{{ page.address }}</h6>
  {% endif %}
</div>


<!-- Introduction -->

<div style="display: flex; flex-wrap: wrap;">
    <section class="profile">
        <!-- Avoid inline styles where possible and use a separate CSS file or <style> block -->
        <div class="profile-image-container">
            <!-- Use alt attribute for accessibility and descriptive image names -->
            <img class="profile-img" src="{{ '/assets/img/self_pic_jw.jpg' | prepend: site.baseurl | prepend: site.url }}" alt="Profile Picture">
            <figcaption class="profile-caption">Taken at Zakynthos, Greece</figcaption>
        </div>

        <!-- Use <p> tag for paragraphs instead of <br> for better semantics and readability -->
        <h4>Background</h4>
        <p>
            I am currently in the first year at UIUC, pursuing a (research-based) <a href="https://siebelschool.illinois.edu/academics/graduate/ms-program" target="_blank" rel="noopener">Master of Science in Computer Science(MSCS)</a>. My advisor is <a href="https://cs.stanford.edu/~jiaxuan/" target="_blank" rel="noopener">Prof.Jiaxuan You</a>.
        </p>

        <p>
            Before my journey at UIUC, I spent one year at <a href="https://www.epfl.ch/schools/ic/" target="_blank" rel="noopener">EPFL</a> as a felloship PhD student in distributed systems, where I laid my academic foundations. Leaving peaceful and beautiful Switzerland is a hard decision: after one year of thinking and discussion with my career mentor <a href="https://people.epfl.ch/katerina.argyraki?lang=en" target="_blank" rel="noopener">Prof. Katerina Argyraki</a>, I followed my heart to explore ML System research. In <a href="https://www.zju.edu.cn/english/" target="_blank" rel="noopener">Zhejiang University</a>, I obtained my Bachelor's degree in Electronic Science and Technology, with Outstanding Thesis Award for designing FPGA subsystem for GNN acceleration, where was the start of my MLSys research. During my ML System research journey, I was lucky to work with wonderful advisors-- <a href="https://wangzeke.github.io/" target="_blank" rel="noopener">Prof. Zeke Wang(Zhejiang University)</a>,
            <a href="https://scholar.google.ch/citations?user=QE9pa_cAAAAJ&hl=en" target="_blank" rel="noopener">Prof. Tao Lin(Westlake University)</a>,  and
            <a href="https://binhangyuan.github.io/site/" target="_blank" rel="noopener">Prof. Binhang Yuan(HKUST)</a>.
        </p>

        <p>
            At UIUC, my research focuses on Gen-AI Systems, like LLM inference efficiency. I am also interested in bringing distributed systems/database systems with LLMs.
        </p>

        <h4>Research Interest</h4>
        <p>
            I am intersted in machine learning systems (ML System), especially system designs for LLMs. My primary goal is to provide efficient, cheap and robust system services for real-world LLM applications. To achieve this goal, I identified three main challenges: 
        </p>
        <p>
        <strong>Challenge1 LLM Inference Efficiency</strong> <br>
        How to provide cheap and fast LLM inference service.
        </p>

        <p>
        <strong>Challenge2 LLM Training Efficiency</strong> <br>
        How to provide efficient and robust LLM training.
        </p>
        
        <p>
        <strong>Challenge3 Trade-off between service-level-objects (SLOs) in ML and System</strong> <br>
        How to do trade-offs between machine learning metrics (accuracy, PPL, etc) and system metrics (latency, throughtputs)
        </p>

        <!-- <p> The following figure is an overview of 3 challenges in the observation-feedback loop for multimodal agent, accompanied by a snapshot of my current research progress on each of them, including ongoing work.</p> -->

        <!-- <div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center;">
            <!-- Use alt attribute for accessibility and descriptive image names -->
            <img class="profile-img" src="{{ '/assets/img/statement.png' | prepend: site.baseurl | prepend: site.url }}" alt="Research Line">
        </div> -->
    </section>
</div>

<!-- Add CSS (either inline or preferably in a separate stylesheet) -->
<style>
.profile {
    padding: 0;
}
.profile-image-container {
    display: flex;
    flex-direction: column;
    justify-content: center; /*Center horizontally */
    align-items: center;     /* Center vertically*/
    max-width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 1.5rem;
}
.profile-img {
    width: 100%;
    height: auto; /*to maintain aspect ratio*/
}
.profile-caption {
    text-align: center; /* Centers the text of the caption */
    padding-top: 0.5rem; /* Adds some space between the image and the caption */
    font-style: italic;
    /* Add any additional styling you need for the caption here */
}
@media screen and (max-width: 576px) {
    .profile-image-container {
        max-width: 100%;
        padding-left: 0;
        padding-bottom: 1rem;
    }
}
</style>


<!-- News -->
<div class="news mt-3 p-0">
  <h3 class="title mb-4 p-0">News</h3>
  {% assign news = site.news | reverse %}
  {% for item in news limit: site.news_limit %}
    <div class="row p-0">
      <div class="col-sm-2 p-0">
        <span class="badge danger-color-dark darken-1 font-weight-bold text-uppercase align-middle date ml-3">
          {{ item.date | date: "%b %-d, %Y" }}
        </span>
      </div>
      <div class="col-sm-10 mt-2 mt-sm-0 ml-3 ml-md-0 p-0 font-weight-light text">
        <p>{{ item.content | remove: '<p>' | remove: '</p>' | emojify }}</p>
      </div>
    </div>
  {% endfor %}
</div>

<script type="text/javascript" id="clustrmaps" src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=700&t=tt&d=NhXj4joI7G-QcI07Qz4cPPkmnIj_bE-Zi4HhgEt-oCs"></script>
