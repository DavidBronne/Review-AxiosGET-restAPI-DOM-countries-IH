const countryAPI = axios.create(
    {
        baseURL:"https://restcountries.eu/rest/v2/name/"
    }
);

function getCountryAPI (countryNameInput) {
    countryAPI.get(countryNameInput)
        .then(APIrecievedCountry => {
            removeErrDiv();
            
            console.log('APIrecievedCountry', APIrecievedCountry.data[0])
           
            const countryName = APIrecievedCountry.data[0].name;
            const countryCapital = APIrecievedCountry.data[0].capital;
            document.getElementById('countryName').innerHTML = countryName;
            document.getElementById('countryCapital').innerHTML = 'Capital: ' + countryCapital;
        })
        .catch(err => {
            console.log(`Error APIrecievedCountry:${err}`);
            if (err.response.status === 404) {
                removeCountryInfo();
                createErrorDiv();
                const errMessage = document.createTextNode(`What is ${countryNameInput}`);
                document.getElementById('error').appendChild(errMessage);
            } else {
                console.log('err', err)
            }
        })
}

const createErrorDiv = () => {
    errDiv = document.createElement("div");
    errDiv.setAttribute('id','error');
    document.body.appendChild(errDiv);
}

const removeErrDiv = () => {
    if (document.getElementById("error")) {
        const error = document.getElementById("error");
        error.parentNode.removeChild(error);
      }
}

const removeCountryInfo = () => {
    document.getElementById('countryName').innerHTML = '';
    document.getElementById('countryCapital').innerHTML = '';
}

const checkInput = () => {
    
    removeErrDiv();
    if (document.getElementById("theInput").value === "") {
      document.getElementById("theButton").disabled = true;
      removeCountryInfo();
      createErrorDiv();
      const theErr = document.createTextNode(`Wanna input something? `);
      errDiv.appendChild(theErr);
    } else {
      document.getElementById("theButton").disabled = false;
    }
}

document.getElementById('theButton').onclick = () => {
    removeErrDiv();
    const countryInput = document.getElementById('theInput').value;
    getCountryAPI(countryInput);

}
