async function loadFacts() {
  let response = await fetch("../facts/facts.json");
  let factsJson = await response.json();
  let facts = factsJson.facts;
  return facts;
}

function displayFact(fact) {
  let { content, author } = fact;
  let contentElement = document.getElementById("fact-id");
  contentElement.innerHTML = content; // TODO: parse to valid HTML later...
  let authorElement = document.getElementById("author-id");
  authorElement.innerHTML = "@" + author; // TODO: put links to github
}

function goToFact(factNumber, facts) {
  setFactUrl(factNumber);
  let fact = facts[factNumber];
  displayFact(fact);
}

function getFactUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const factNumber = urlParams.get("fact");
  if (isNaN(factNumber) || factNumber < 0) {
    return null;
  } else return factNumber;
}

function setFactUrl(factNumber) {
  history.pushState({}, null, "?fact=" + factNumber.toString());
}

function toNextFact(facts) {
  let current = getFactUrl();
  let next = (current + 1) % facts.length;
  goToFact(next, facts);
}

function toPreviousFact(facts) {
  let current = getFactUrl();
  let previous = (facts.length + current - 1) % facts.length;
  goToFact(previous, facts);
}

function toRandomFact(facts) {
  let random = facts.length;
  goToFact(random, facts);
}

async function renderPage() {
  let facts = await loadFacts();
  let factNumber = getFactUrl();
  if (factNumber === null || factNumber >= facts) {
    factNumber = Math.floor(Math.random() * facts.length);
  }
  goToFact(factNumber, facts);
}

renderPage();
