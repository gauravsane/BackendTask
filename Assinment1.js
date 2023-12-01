// =============Assignment 1 ===================
const fs = require("fs").promises;
const axios = require("axios");



//1] Log the response AS-IS to a text file-------------------------
const url = "https://catfact.ninja/breeds";
const resultTextFile = "apiData.text";

async function getData(api) {
  try {
    const res = await axios.get(api);
    return res.data;
  } catch (err) {
    console.error("Error when fetching the data:", err.message);
    throw err;
  }
}

async function JsonToTextFile(res) {
  try {
    await fs.writeFile(resultTextFile, JSON.stringify(res, null, 2));
    console.log(`Data present in  ${resultTextFile}`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

(async () => {
  try {
    const response = await getData(url);
    await JsonToTextFile(response);
  } catch (err) {
    console.log(err);
  }
})();
// ----------------------------------------------------------





// 2] Console log the number of pages of data that are available on this URL 
async function getAllPages(api) {
  const resultData = [];
  let nextPage = api;

  do {
    const dataOfPages = await getData(nextPage);
    resultData.push(...dataOfPages.data);
    nextPage = dataOfPages.next_page_url;
  } while (nextPage);
  return resultData;
}
(async () => {
  try {
    const resultData = await getAllPages(url);
    // console.log(resultData); ---showing all the data of pages
    console.log('Total no. of pages data: ',resultData.length)
  } catch (err) {
    console.log(err);
  }
})();
//---------------------------------------------------------------------------------




// 3] Get data from ALL the pages 
async function getAllPages(api) {
  const resultData = [];
  let nextPage = api;

  do {
    const dataOfPages = await getData(nextPage);
    resultData.push(...dataOfPages.data);
    nextPage = dataOfPages.next_page_url;
  } while (nextPage);
  return resultData;
}
(async () => {
  try {
    const resultData = await getAllPages(url);
    console.log('Get data from all of the pages are following: \n',resultData);    //---showing all the data of pages
  } catch (err) {
    console.log(err);
  }
})();
//--------------------------------------------------





// 4] Using the data from ALL the pages ------------------------------------
//  4a) Return cat breeds grouped by Country 
function groupBreedsByCountry(data) {
  const breedCountry = {};

  data.forEach(catBreed => {
    const country = catBreed.country;
    if (!breedCountry[country]) {
      breedCountry[country] = [];
    }
    breedCountry[country].push({
      breed: catBreed.breed,
      origin: catBreed.origin,
      coat: catBreed.coat,
      pattern: catBreed.pattern,
    });
  });
  return breedCountry;
}
(async () => {
  try {
    const resultData = await getAllPages(url);
    const breedCountry = groupBreedsByCountry(resultData);
    console.log('Cat Breeds Grouped By Country:', JSON.stringify(breedCountry, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
// --------------------------------------------------------------------------------