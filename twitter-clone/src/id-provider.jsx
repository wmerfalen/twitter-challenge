
function IdProvider(){
    const ID_KEY = 'id-keys';
    let current = window.localStorage.getItem(ID_KEY);
    if(!current){
        current = (new Date()).getTime();
    }
    current = parseInt(current);
    return {
        next: function() { 
            current = (new Date()).getTime();
            window.localStorage.setItem(ID_KEY,current);
            return current;
        },
    };
}

export default IdProvider;

