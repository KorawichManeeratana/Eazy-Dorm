function openSearchPage() {
  sessionStorage.setItem("search", document.getElementsByClassName("searchbar")[0].value);
  sessionStorage.setItem("minprice", document.getElementById("minprice").value);
  sessionStorage.setItem("maxprice", document.getElementById("maxprice").value);
  window.open(`/selectdorm`, "_self");
}