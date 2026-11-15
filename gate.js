const correctPassword = "0541";

const currentPage = window.location.pathname;

if (!currentPage.endsWith("index.html") &&
    currentPage !== "/" &&
    sessionStorage.getItem("archiveAccess") !== "granted") {

    window.location.href = "index.html";
}