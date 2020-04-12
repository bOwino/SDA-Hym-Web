const content = document.querySelector(".favorites");
const coffees = [];

function like(){
    coffees.push[
        {
        name: "001 - Nyasachwa man Malo",
        text: "Reginald herber",
        link: "songs/song1.html"
    }
];
document.getElementById("content").innerHTML = coffees;
}

const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, text, link}) =>
      (output += `
        <div class="col m4 s12">
            <a href="${link}">
                <div class="card">
                    <div class="card-content" style="height:100px;">
                    <p style="color:black; font-size:16px;">${name}</p>
                    <small style="color:orange; font-size:13px;">${text}</small>
                    </div>
                </div>
            </a>
        </div>
              
              `)
  );
  favorites.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);

