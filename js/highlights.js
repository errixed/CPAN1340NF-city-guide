const API_KEY = "pub_8cc490a353dd48e3a9c176679a4c4753";
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
The CN Tower is one of Canada's greatest engineering feats and one of the tallest buildings in the world that doesn't have any supports.
This famous landmark, which rises 553 meters above downtown Toronto, is a must-see for tourists from all over the world.

The CN Tower is more than just a place to look at things; it has a lot of other fun things to do. Visitors can see all of Toronto and
Lake Ontario from all sides, walk across the famous glass floor, or test their bravery on the EdgeWalk, the world's highest full-circle
hands-free walk on a building. The 360 Restaurant slowly turns around every 72 minutes, giving you amazing views while you eat world-class food.
This is a great place to eat if you want something different.

The CN Tower is both an architectural wonder and a symbol of Canadian creativity. In 1995, the American Society of Civil Engineers named
it one of the Seven Wonders of the Modern World. The building was finished in just 40 months and cost $63 million. It weighs more than 117,900
metric tons, which is about the same as 16,800 large male elephants.

The CN Tower still draws millions of visitors each year. The CN Tower has something for everyone, day or night. You can see the skyline, have
dinner high above the city, or try the EdgeWalk for a thrill. It is still a big part of what makes Toronto unique, and it is a true 
celebration of Canadian creativity and engineering skill.
        `
  },
  {
    id: "360-restaurant",
    title: "360 Restaurant",
    // https://viewthevibe.com/cn-tower-360-restaurant-toronto-review/
    image: "../images/highlights-360Restaurant.jpeg",
    figcaption: "360 Restaurant - enjoy the food luxury",
    intro: "Rib or chicken, doesn't matter, every ingredient is organic! Enjoy your food while enjoying the view.",
    fullText: `
A Unique Dining Experience Above Toronto at Restaurant 360 in the CN Tower
Restaurant 360, one of Canada's best places to eat, is inside the famous CN Tower.  The restaurant is 351 meters (1,151 feet) above the 
city and makes a full rotation every 72 minutes. This means that guests can always see a new view of Toronto while they eat.
There are two levels in the dining room.  There are window-side tables in a part that is a little lower, and you can get to them by goingdown
two steps.  A metal ramp that folds down is available upon request, but visitors should be aware that it is very steep and narrow.
The upper-level seating area is completely wheelchair accessible, has great views, and is set up so that mobility devices can easily get around.
Some chairs are taken out before dinner to make sure there is enough space for everyone.
Guests can walk around the restaurant on a circular walkway, but the path is a little narrow, and the floor slowly turns, so staff and other
diners need to pay attention.  The CN Tower's website has menus that you can look at, but they are in PDF format.  There are accessible
restrooms on the same level, which is great.
Restaurant 360 is known for its Canadian-inspired food that changes with the seasons and its great wine program,
which includes Ontario varietals and wines from around the world that are stored in a unique sky-high wine cellar.
The restaurant is open every day and is a great place for special occasions, fine dining, and views that will stay with you forever.
It is highly recommended that you make a reservation.
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
Harbourfront Centre is the place to go in Toronto for arts and culture along the waterfront.
Harbourfront Centre is one of Toronto's most exciting cultural spots, and it is right by Lake Ontario. This waterfront complex is open all
year and has a lot of different arts programs, exhibitions, shops, restaurants, and public gathering spaces. It's a great place to visit any
time.
Visitors can take a peaceful walk along Toronto's beautiful shoreline, shop at one-of-a-kind stores, or eat at one of the many restaurants
with views of the lake. The 10-hectare site hosts a wide range of indoor and outdoor events that celebrate modern Canadian creativity in many
fields, such as visual arts, crafts, literature, music, dance, and theater.
Harbourfront Centre is a lively place that shows off the artistic talent of people from Toronto and around the country. It's a great place to
spend the day enjoying culture, community, and the beauty of Toronto's waterfront.
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
