let displayData = () => {
    const pincodeInput = document.getElementById('pincodeInput');
    const pincodeError = document.getElementById('pincodeError');
    const pincode = pincodeInput.value;
    const URL = `https://api.postalpincode.in/pincode/${pincode}`;

    if (!pincode) {
        pincodeError.style.display = 'inline'; // Show error message
        return false;
    } else {
        pincodeError.style.display = 'none'; 

        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const pincodeDataDiv = document.getElementById('pincodeData');
                pincodeDataDiv.innerHTML = ''; // Clears the previously entered data

                if (data && data.length > 0 && data[0].Status === 'Success') {
                    const { PostOffice } = data[0];
                    let html = '<h3 class ="postal-display-head">Postal Data:</h3><ul class="display-postal-ul">';

                    PostOffice.forEach(post => {
                        html += `<li>Place: ${post.Name},${post.District}, ${post.State}, ${post.Country},${post.Pincode}</li>
                        <li class="delivery-stat">${post.DeliveryStatus}</li>`;
                    });

                    html += '</ul>';
                    const paragraphElement = document.createElement('p');
                    paragraphElement.innerHTML = html;
                    pincodeDataDiv.appendChild(paragraphElement);
                } else {
                    pincodeDataDiv.innerText = 'Pincode is wrong or no data exists for this pincode.';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                const pincodeDataDiv = document.getElementById('pincodeData');
                pincodeDataDiv.innerText = 'An error occurred while fetching data. Please try again later.';
            });

        return false;
    }
}