import axios from "axios";

const countreis = document.getElementById('list of countries');
const errorMessage = document.getElementById('error');

async function fetchCountries(){
    try {
        const response = await axios.get('https://restcountries.com/v2/all');
        const country = await response.data;
        const sorteer = country.sort((a, b) => {
            return a.population - b.population;
        });

        countreis.innerHTML = sorteer.map((message)=>{
            let color = '';
            const region = message.region;
            switch (region){
                case "Americas":
                    color = "green";
                    break;

                case "Africa":
                    color = "blue";
                    break;

                case "Asia":
                    color = "red";
                    break;

                case "Europe":
                    color =  "yellow";
                    break;

                case "Oceania":
                    color = "purple";
            }
            return `<li style="color: ${color}"><img src=${message.flag} 
alt="flag" class="flag"> ${message.name}<p>Has a population of ${message.population} people</p></li>`;

        });
    } catch (e) {
        console.error(e);
        console.log(e.response);
        if (e.response.status === 500){
            errorMessage.textContent = 'Er ging iets mis in de server';
        } else if (e.response.status === 404){
            errorMessage.textContent = 'Het verzoek is mislukt';
        }
    }
}

fetchCountries();