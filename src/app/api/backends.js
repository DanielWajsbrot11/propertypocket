// Chat-GPT showed how to create and load environment variables in Javascript.
// Chat-GPT also showed how to access env variables stored in Firebase. 
require('dotenv').config()

// API calls copied and pasted from Rapid API Zillow API code snippet
// https://rapidapi.com/s.mahmoud97/api/zillow56/playground/apiendpoint_444379e9-126c-4fd2-b584-1c9c355e3d8f
// https://rapidapi.com/s.mahmoud97/api/zillow56/playground/apiendpoint_574a8e83-d743-4353-833f-be1731a63081

// const propertyListUrl = 'https://zillow56.p.rapidapi.com/search?location=34683&output=json&status=forSale&sortSelection=priorityscore&listing_type=by_agent&doz=any';
// const singlePropertyURL = 'https://zillow56.p.rapidapi.com/propertyV2?zpid=47271437';

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': 'process.env.API_KEY',
// 		'x-rapidapi-host': 'zillow56.p.rapidapi.com'
// 	}
// };

// let testListAPI = async () => {

//     try {

//         const response = await fetch(propertyListUrl, options);
//         const result = await response.json()
//         const property = result.results[0];

//         console.log(`Bathrooms: ${property.bathrooms}
//             Bedrooms: ${property.bedrooms}
//             Photo: ${property.imgSrc}
//             SQFT: ${property.livingArea}
//             Lot Area (acres): ${property.lotAreaValue}
//             Price: ${property.price}
//             Address: ${property.streetAddress}
//             zpid: ${property.zpid}
//             `
//         );
//     } catch (error) {
//         console.error(error);
//     }

// }

// let testPropertyAPI = async () => {

//     try {

//         const response = await fetch(singlePropertyURL, options);
//         const result = await response.json();

//         console.log(`Photo: ${result.responsivePhotos[0].url}
//                     Posted: ${result.datePostedString}
//                     Sold: ${result.dateSoldString}
//                     Description: ${result.description}
//                     SQFT: ${result.livingAreaValue}
//                     Lot Area (acres): ${result.lotAreaValue}
//                     Price: ${result.price}
//                     Address: ${result.abbreviatedAddress}
//                     `
//             );
//     } catch (error) {
//         console.error(error);
//     }

// }


// testListAPI();
// testPropertyAPI();

