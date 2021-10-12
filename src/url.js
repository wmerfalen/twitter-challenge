import Config from "./config/";
var Url = function(uri){
	console.log(Url.base());
	return Url.base() + uri;
}
Url.base = function(){
	return Config.BASE_URL;
};
Url.shouldFetch = function(href){
	console.log(href);
	if(href.match(/\/home/)){
		return true;
	}
};

export default Url;
