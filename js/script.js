let current_fact_number;

async function loadFacts() {
  let response = await fetch("../facts/facts.json");
  let factsJson = await response.json();
  let facts = factsJson.facts;
  return facts;
}

function getFactUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const factNumberStr = urlParams.get("fact");
  const factNumber = parseInt(factNumberStr);
  if (isNaN(factNumber) || factNumber < 0) {
    return null;
  } else return factNumber;
}

function setFactUrl(factNumber = -1) {
  if (factNumber === -1) {
    history.pushState({}, null, "./");
  } else {
    history.pushState({}, null, "?fact=" + factNumber.toString());
  }
}

function displayFact(fact) {
  let { content, author } = fact;
  let contentElement = document.getElementById("fact-id");
  contentElement.innerHTML = content; // TODO: parse to valid HTML later...
  let authorElement = document.getElementById("author-id");
  authorElement.innerHTML = "@" + author; // TODO: put links to github
}

function goToFact(factNumber, facts, setUrl = true) {
  if (setUrl) {
    setFactUrl(factNumber);
  } else {
    setFactUrl();
  }
  let fact = facts[factNumber];
  current_fact_number = factNumber;
  displayFact(fact);
}

function toNextFact(facts) {
  let current = current_fact_number;
  let next = (current + 1) % facts.length;
  goToFact(next, facts);
}

function toPreviousFact(facts) {
  let current = current_fact_number;
  let previous = (facts.length + current - 1) % facts.length;
  goToFact(previous, facts);
}

function toRandomFact(facts) {
  let random = Math.floor(Math.random() * facts.length);
  goToFact(random, facts, false);
}

async function renderPage() {
  let facts = await loadFacts();
  let factNumber = getFactUrl();
  if (factNumber === null || factNumber >= facts.length) {
    toRandomFact(facts);
  } else {
    goToFact(factNumber, facts);
  }
  let prev = document.getElementById("prev");
  let next = document.getElementById("next");
  let rand = document.getElementById("rand");
  prev.onclick = () => toPreviousFact(facts);
  next.onclick = () => toNextFact(facts);
  rand.onclick = () => toRandomFact(facts);
}

renderPage();
