
const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=f9e74ed6610c442984ef818666a50dbf";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}