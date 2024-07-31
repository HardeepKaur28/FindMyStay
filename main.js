v=window.localStorage.getItem("mydata")
document.getElementById('mydata').innerHTML=v;

document.getElementById('search-btn').addEventListener('click', (e) => {
    e.preventDefault();

    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const adultCount = document.getElementById('adult-count').value;
    const rooms = document.getElementById('rooms').value;

    console.log(checkIn);
    console.log(checkOut);
    console.log(adultCount);
    console.log(rooms);

    
    if(checkIn == checkOut ||adultCount>29 ||rooms>29){
        alert("no result found");
        return;
    }
    document.querySelector('#heading-two').textContent = "Popular Hotels";

    const xhr = new XMLHttpRequest();
    const url = `https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=0&arrival_date=${checkIn}&departure_date=${checkOut}&guest_qty=${adultCount}&dest_ids=-3712125&room_qty=${rooms}&search_type=city&children_qty=2&children_age=5%2C7&search_id=none&price_filter_currencycode=USD&order_by=popularity&languagecode=en-us&travel_purpose=leisure`;

    // search hotel
    xhr.open('GET', url);
    xhr.setRequestHeader('X-RapidAPI-Key', '210e16b5c9msha94201f49a80e2cp101a33jsna5b37d148676');
    xhr.setRequestHeader('X-RapidAPI-Host', 'apidojo-booking-v1.p.rapidapi.com');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response);

                let output = '';

                for (const result of response.result) {
                   
                    output += `
                    
                        <div style="width: 23%; margin: 10px;">
                            <div style="margin:10px;" class="main-div">
                                <div class="img-div"> 
                                <a href="${result.url} target="_blank" rel="noopener noreferrer">   
                                    <img style="width:100%; height:262px; border:2px solid black"; src="${result.main_photo_url}" />
                                </a>
                                </div>    
                                <div style="margin-top:20px" class="text-div">
                                    <p><b>City: </b>${result.city}</p>
                                    <p><b>Name: </b>${result.hotel_name}</p>
                                    <p><b>Id: </b>${result.id}</p>
                                    <p><b>Review Score: </b>${result.review_score}</p>
                                    <p><b>Currency: </b>${result.price_breakdown.currency}</p>
                                   
                                </div>
                                <a href="${result.url}" target="_blank" id="btn-book">Book Now</a>
                            </div>
                        </div>
                    `;
                }

                document.getElementById('my-div').innerHTML = output;
             }
            
        }
    };

    xhr.send();
});
