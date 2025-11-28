---
layout: page
permalink: /
title: about
nav: About
description: <a href="https://siebelschool.illinois.edu/academics/graduate/ms-program" class="page-description" target="_blank">Master of Science in Computer Science</a> • <a href="https://siebelschool.illinois.edu/" class="page-description" target="_blank">Sibel Computer Science Center</a> • <a href="https://illinois.edu/" class="page-description" target="_blank">UIUC</a>
address: <a href="https://www.google.com/maps/place/Thomas+M.+Siebel+Center+for+Computer+Science/@40.1138069,-88.2274801,17z/data=!3m2!4b1!5s0x880cd76a5762dfb7:0xcf6a023935717398!4m6!3m5!1s0x880cd76baa8479a9:0x4e9f01d40d359630!8m2!3d40.1138028!4d-88.2249052!16s%2Fm%2F0yqkg1s?entry=ttu" class="page-description" target="_blank">201 N Goodwin Ave, Urbana, IL 61801</a>
---

<div class="col p-0 pt-4 pb-4">
  <h1 class="title text-left font-weight-bold">Jinwei Yao</h1> 
  <h6 class="pb-3 m-0 mb-2" style="font-size: 0.83em;">My English name is Kivi.</h6>
  <h6 class="m-0 mb-2" style="font-size: 0.83em;">{{ page.description }}</h6>
  {% if page.address %}
      <h6 class="m-0 mb-2" style="font-size: 0.83em;">{{ page.address }}</h6>
  {% endif %}
</div>


<!-- Introduction -->

<div style="display: flex; flex-wrap: wrap;">
    <section class="profile">
        <!-- Avoid inline styles where possible and use a separate CSS file or <style> block -->
        <!--
        To add more photos:
             1. Upload the image to /assets/img/ (e.g., self_pic_4.jpg)
             2. Copy a <div class="carousel-item">...</div> block below and update image path + caption
             3. Ensure only one <div> has class="carousel-item active"
        -->
        <div id="profileCarousel" class="carousel slide profile-image-container" data-interval="false">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100 profile-img" src="{{ '/assets/img/self_pic_jw.jpg' | prepend: site.baseurl | prepend: site.url }}" alt="Zakynthos, Greece">
              <figcaption class="profile-caption">Taken at Zakynthos, Greece</figcaption>
            </div>
            <div class="carousel-item">
              <img class="d-block w-100 profile-img" src="{{ '/assets/img/Jinwei_pic.jpg' | prepend: site.baseurl | prepend: site.url }}" alt="Photo 2">
              <figcaption class="profile-caption">Taken at Bali, Indonesia</figcaption>
            </div>
            <!-- <div class="carousel-item">
              <img class="d-block w-100 profile-img" src="{{ '/assets/img/self_pic_3.jpg' | prepend: site.baseurl | prepend: site.url }}" alt="Photo 3">
              <figcaption class="profile-caption">Sunny Campus Day</figcaption>
            </div> -->
          </div>
          <a class="carousel-control-prev" href="#profileCarousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#profileCarousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  var $c = $('#profileCarousel');
  if ($c.length) {
    var $items = $c.find('.carousel-item');
    var n = $items.length;
    if (n > 0) {
      // Pick a random starting slide
      var idx = Math.floor(Math.random() * n);
      $items.removeClass('active');
      $items.eq(idx).addClass('active');
    }
    // Initialize Bootstrap carousel with manual control only
    $c.carousel({ interval: false, ride: false, wrap: true, keyboard: true });
    // Ensure no auto-cycling
    $c.carousel('pause');
  }
});
</script>

        <div class="motto-enhanced">
    ❄️ <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" fill="#E84A27" style="vertical-align: middle;">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 2l1.41 1.41L10.83 6H20v2h-9.17l2.58 2.59L12 12l-4-4 4-4zm0 20l-1.41-1.41L13.17 18H4v-2h9.17l-2.58-2.59L12 12l4 4-4 4z"/>
    </svg>
    <span class="motto-text">Imagination...dissolves, diffuses, dissipates, in order to re-create.</span>
    <div style="text-align:right; font-size:0.9em; margin-top:0.3em;">— Samuel Taylor Coleridge</div>
    ❄️
  </div>

        <!-- Use <p> tag for paragraphs instead of <br> for better semantics and readability -->
        <h4 style="color: #E84A27;">Background</h4>
        <p>
            I am currently in the second year at UIUC, pursuing a (research-based)
            <a href="https://siebelschool.illinois.edu/academics/graduate/ms-program" target="_blank" rel="noopener">
              Master of Science in Computer Science (MSCS)
            </a>.
            My advisor is
            <a href="https://cs.stanford.edu/~jiaxuan/" target="_blank" rel="noopener">
              Prof. Jiaxuan You
            </a>.
            I have also gained invaluable insights into modeling from
            <a href="https://www.mit.edu/~geliu/" target="_blank" rel="noopener">
              Prof. Ge Liu (UIUC)
            </a>
            and into systems from
            <a href="https://www.fanlai.me/" target="_blank" rel="noopener">
              Prof. Fan Lai (UIUC)
            </a>,
            which together inspired my current research interest in system–modeling co-design.
        </p>
        

        <p>
            Before my journey at UIUC, I spent one year at <a href="https://www.epfl.ch/schools/ic/" target="_blank" rel="noopener">EPFL</a> as a fellowship PhD student in distributed systems, where I laid my academic foundations. Leaving peaceful and beautiful Switzerland is a hard decision: after one year of thinking and discussion with my career mentor <a href="https://people.epfl.ch/katerina.argyraki?lang=en" target="_blank" rel="noopener">Prof. Katerina Argyraki</a>, I followed my heart to explore ML System research. In <a href="https://www.zju.edu.cn/english/" target="_blank" rel="noopener">Zhejiang University</a>, I obtained my Bachelor's degree in Electronic Science and Technology, with Outstanding Thesis Award for designing FPGA subsystem for GNN acceleration, where was the start of my MLSys research. During my ML System research journey, I was lucky to work with wonderful advisors-- <a href="https://wangzeke.github.io/" target="_blank" rel="noopener">Prof. Zeke Wang(Zhejiang University)</a>,
            <a href="https://scholar.google.ch/citations?user=QE9pa_cAAAAJ&hl=en" target="_blank" rel="noopener">Prof. Tao Lin(Westlake University)</a>,  and
            <a href="https://binhangyuan.github.io/site/" target="_blank" rel="noopener">Prof. Binhang Yuan(HKUST)</a>.
        </p>

        <p>
            At UIUC, my research focuses on system-algorithm co-design for large models. System is my start point but I am doing algorithms as well. You can find my research interests as follows.
        </p>
        <hr class="section-divider">
        <h4 style="color: #E84A27;">Research Interest</h4>
        
        <div style="text-align: center; margin-top: 1rem; margin-bottom: 1rem;">
        <img src="{{ '/assets/img/research_overview.svg' | prepend: site.baseurl | prepend: site.url }}" alt="Research Overview" style="max-width: 100%; height: auto;">
        <figcaption style="font-style: italic; margin-top: 0.5rem;">An overview of past research.I am currently focusing on efficient and effective system-algorithm co-designs.</figcaption>
        </div>

        <p>
        <span style="color: #E60000;">
            I am interested in machine learning systems (MLSys), especially in algorithm co-design across modeling, systems, and hardware.
        </span>
        There exists a significant gap between generative model design, system implementation, and hardware capabilities. My research aims to bridge this gap by developing efficient, robust, and scalable algorithms/systems for real-world large model applications.
        </p>

        <p>
        I categorize my research interests into three interdependent dimensions:
        </p>

        <ul>
        <li>
            <strong>System: Efficiency & Robustness in LLM Infrastructure</strong><br>
            <ul>
            <li>LLM Inference Efficiency: How to provide cheap and fast LLM inference services?</li>
            <li>LLM Training Efficiency: How to train LLMs with limited resources while ensuring robustness?</li>
            <li>ML-System SLO Trade-off: How to balance ML performance metrics (e.g., accuracy, perplexity) with system metrics (e.g., latency, throughput)?</li>
            </ul>
        </li>

          <li style="margin-top: 1rem;">
        <strong>Modeling: Beyond Auto-Regressive Patterns</strong><br>
        <ul>
        <li>How can we rethink or extend generative modeling paradigms beyond the auto-regressive (AR) models?</li>
        <li>How to design architectures that are more expressive and efficient than AR models?</li>
        <li>How to unify multimodal inputs (e.g., text, vision, code) into a shared and coherent representation space?</li>
        </ul>
        </li>

        <li style="margin-top: 1rem;">
            <strong>Hardware: Hardware-Aware Algorithm Design</strong><br>
            <ul>
            <li>How can we design algorithms that fully leverage heterogeneous hardware such as FPGAs, GPUs, and NPUs?</li>
            <li>How to abstract hardware features into software libraries to simplify hardware-efficient algorithm development?</li>
            <li>How to co-design algorithms with low-level primitives to maximize hardware utilization?</li>
            </ul>
        </li>
        </ul>
        <hr class="section-divider">
        <!-- <p>
            <span style="color: #0455A4;">
            I am interested in machine learning systems (ML System), especially algorithms co-design for systems and modeling.
            </span> 
        My primary goal is to provide efficient, cheap and robust system services for real-world LM applications. To achieve this goal, I identified three main challenges: 
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
        </p> -->

        <h4 style="color: #E84A27;">Open Source Contributions</h4>
        <ul>
          <li>
            <a href="https://github.com/sgl-project/sglang" target="_blank" rel="noopener">
              <strong>sglang</strong>
            </a>
            — Leading the SGLang diffusion LLM team. Contributor and learner at this wonderful community. 
          </li>
          <li>
            <a href="https://github.com/EleutherAI/lm-evaluation-harness" target="_blank" rel="noopener">
              <strong>lm-evaluation-harness</strong>
            </a>
            — <a href="https://www.linkedin.com/posts/sgl-project_sglang-powers-lm-eval-harness-the-gold-standard-activity-7300198413252317185-vc2E/" target="_blank" rel="noopener">lead the integration of SGLang as a backend in lm-eval-harness</a>.
          </li>
        </ul>

        <h4 style="color: #E84A27;">Miscellaneous</h4>
        <p>
            I am active in sharing paper readings on my another <a href="https://monstertail.github.io/#/" target="_blank" rel="noopener">Github Blog</a> and  <a href="https://www.zhihu.com/people/jing-wei-38-12" target="_blank" rel="noopener">Zhihu(知乎)</a>.

            I like 🏀, 💪, 📚, 🐱, and 🎬.
        </p>

        
    </section>
</div>

<!-- Add CSS (either inline or preferably in a separate stylesheet) -->
<style>
.profile {
    padding: 0;
}
.motto {
    text-align: center;
    font-size: 1.25rem;
    font-style: italic;
    font-weight: 500;
    color: #444;
    margin-top: 1rem;
    margin-bottom: 2rem;
    transition: all 0.3s ease;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.motto:hover {
    color: #E84A27; /* UIUC orange */
    text-shadow: 0 2px 8px rgba(232, 74, 39, 0.4);
    transform: scale(1.03);
}
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&display=swap');

.motto-enhanced {
    text-align: center;
    font-family: 'Playfair Display', serif;
    font-size: 1.35rem;
    font-style: italic;
    font-weight: 500;
    color: #fff;
    background: linear-gradient(135deg, #e84a27cc, #f0c9b2cc);
    padding: 1.2rem 1rem;
    margin: 2rem auto;
    border-radius: 1rem;
    max-width: 800px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
    z-index: 0;
}

.motto-enhanced .motto-text {
    z-index: 2;
    position: relative;
}

.motto-enhanced:hover {
    transform: scale(1.02);
    transition: all 0.3s ease;
    box-shadow: 0 6px 18px rgba(232, 74, 39, 0.3);
}

/* ❄️ Snow animation effect */
.motto-enhanced::before, .motto-enhanced::after {
    content: "❄️";
    position: absolute;
    font-size: 1.2rem;
    animation: snow 8s linear infinite;
    opacity: 0.8;
}

.motto-enhanced::after {
    animation-delay: 4s;
    left: 60%;
}

@keyframes snow {
    0% {
        top: -10%;
        left: 20%;
        transform: translateX(0);
    }
    50% {
        transform: translateX(30px);
    }
    100% {
        top: 110%;
        transform: translateX(-30px);
    }
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
#star-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>


<!-- News -->
<hr class="section-divider">
<div class="news mt-3 p-0">
  <h3 class="title mb-4 p-0" style="color: #E60000;">News</h3>
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

<script type="text/javascript" id="clustrmaps" src="//clustrmaps.com/map_v2.js?d=rh8EaugEE0CSbdOsjboVgNsiqIwoLvWU-B59Ft11K5k&cl=ffffff&w=a"></script>
