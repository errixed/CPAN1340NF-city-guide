const API_KEY = "";
// https://newsdata.io
const url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=Toronto&language=en`;

fetch(url)
  .then(resp => resp.json())
  .then(data => {
    const container = document.getElementById("news-container");
    container.innerHTML = "";

    if (!data.results) {
      container.innerText = "No news available.";
      return;
    }

    data.results.slice(0, 10).forEach(article => {
      const item = document.createElement("div");
      item.className = "news-item";

      item.innerHTML = `
          <a href="${article.link}">${article.title}</a>
      `;

      container.appendChild(item);
    });
  })
  .catch(err => {
    console.error("Error fetching:", err);
    document.getElementById("news-container").innerText =
      "Failed to load.";
  });



const highlights = [
  {
    id: "cn-tower",
    title: "CN Tower",
    // image taken by Amir
    image: "../images/highlights-CNTower.jpg",
    figcaption: "CN Tower - city under your feet",
    intro: "Start with an observation! By getting a ticket to CN Tower, you can access observation level and enjoy the view. Don't forget to visit the gift shop!",
    fullText: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequatur molestias impedit asperiores. In sed eveniet ex esse incidunt dolores ab! Molestias, quos eum unde excepturi laboriosam velit quo quae!
        `
  },
  {
    id: "360-restaurant",
    title: "360 Restaurant",
    // https://breathedreamgo.com/whats-special-cn-tower/
    image: "../images/highlights-360Restaurant.png",
    figcaption: "360 Restaurant - enjoy the food luxury",
    intro: "Rib or chicken, doesn't matter, every ingredient is organic! Enjoy your food while enjoying the view.",
    fullText: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequatur molestias impedit asperiores. In sed eveniet ex esse incidunt dolores ab! Molestias, quos eum unde excepturi laboriosam velit quo quae!
        `
  },
  {
    id: "harbourfront",
    title: "Harbourfront",
    // image taken by Amir
    image: "../images/highlights-harbourfront.jpg",
    figcaption: "Harbourfront — lakeside walk",
    intro: "Walk the boardwalk, visit the Power Plant gallery, or take a short ferry to the islands for golden-hour views.",
    fullText: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequatur molestias impedit asperiores. In sed eveniet ex esse incidunt dolores ab! Molestias, quos eum unde excepturi laboriosam velit quo quae!
        `
  }
];

function renderHighlights() {
  const list = document.getElementById("highlights-list");

  highlights.forEach(item => {
    const article = document.createElement("article");
    article.className = "card highlight-card";
    article.id = item.id;

    article.innerHTML = `
         <div class="article-container">
            <div class="article-image">
                <figure>
                    <a href="../images/${item.image}" data-lightbox="vecta" data-title="${item.title}">
                    <img src="${item.image}" alt="${item.title}">                    
                    </a>
                    <figcaption>${item.figcaption}</figcaption>
                </figure>            
            </div>
            <div class="article">
                <h2>${item.title}</h2>
                <p><strong>Overview:</strong> ${item.intro}</p>
                <br>
                <p>${item.fullText.trim().replace(/\n\s*\n/g, '</p><p>')}</p>
            </div>
        </div>
        `;

    list.appendChild(article);
  });
}

document.addEventListener("DOMContentLoaded", renderHighlights);
