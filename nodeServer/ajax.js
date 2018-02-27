function get() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("data").innerHTML = xhr.responseText;
        }
    };
    xhr.send(null);
}