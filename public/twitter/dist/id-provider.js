
function IdProvider() {
    var ID_KEY = 'id-keys';
    var current = window.localStorage.getItem(ID_KEY);
    if (!current) {
        current = new Date().getTime();
    }
    current = parseInt(current);
    return {
        next: function next() {
            current = new Date().getTime();
            window.localStorage.setItem(ID_KEY, current);
            return current;
        }
    };
}

export default IdProvider;