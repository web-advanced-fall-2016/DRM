//Global Variables
var names = "Jewell Munter:854370;Alden Ehrhard:852014;Chance Hunnewell:158189;Adriana Geffers:17473;Celia Schnieders:746599;Corliss Denk:791623;Sally Zehnpfennig:185749;Jayme Behrends:462289;Jesica Farmsworth:720507;Laree Chime:822125;Henrietta Chandsawangbh:400455;Regine Criado:593497;Louann Rull:437496;Raylene Bodell:230709;Lenora Heidorn:84678;Terica Bacote:53904;Dena Picket:584555;Laurie Arambuia:912065;Freeda Barbar:725347;Arlena Blenden:512319;Toshia Siaperas:623512;Randell Hassig:117809;Denise Litsey:461117;Ron Blankenbecler:147578;Quincy Wileman:626921;Cherish Patz:744193;Burma Erskin:5184;Arron Bulfer:803810;Tiny Pokorski:482737;Mitzie Hadef:253250;Genie Malys:421633;Robbin Steenburg:356368;Delsie Gallegos:76374;Kaycee Leone:924465;Lorna Komar:474375;Joie Warf:448658;Zana Philpot:710606;Caroline Koles:87033;Joey Heine:740998;Pilar Gividen:714223;Kesha Rushforth:157566;Phebe Yournet:979838;Casimira Wohlenhaus:244810;Glenda Prestridge:466791;Bianca Derienzo:510015;Earnest Lapage:888249;Argentina Arnoux:672254;Elva Wieto:786812;Tomi Kirgan:684709;Jacquelynn Drader:666873;Robert Dasen:449309;";

//Immediately Invoked Function that runs when DOM is ready
(function() {
    if (document.readyState != "loading") {
        var dictionary = new Dictionary(names, ";", ":");
        dictionary.init();
        var searchField = new SearchField('input', '#searchResults', dictionary); //make this class
        searchField.init();
    } else {
        document.addEventListener("DOMContentLoaded", function() {
            var dictionary = new Dictionary(names, ";", ":");
            dictionary.init();
            var searchField = new SearchField('input', '#searchResults', dictionary); //make this class
            searchField.init();
        });
    }
})();

/**
 * SearchField Class
 * 
 * @param {any} searchFieldSelector
 * @param {any} resultsContainerSelector
 */
function SearchField(searchFieldSelector, resultsContainerSelector, d) {
    this.searchField = document.querySelector(searchFieldSelector);
    this.resultsContainer = document.querySelector(resultsContainerSelector);
    this.dictionary = d;
}

SearchField.prototype.init = function() {
    this.attachEventListener();
};
SearchField.prototype.attachEventListener = function() {
    this.searchField.addEventListener('input', () => this.handleInput(), false);
};
SearchField.prototype.handleInput = function(evnt) {
    let value = event.target.value;
    clearTimeout(this.viewHandler);
    this.viewHandler = setTimeout(() => {
        this.updateView(this.dictionary.getMatches(value));
    }, 0);
}
SearchField.prototype.updateView = function(array) {
    this.resultsContainer.innerHTML = '';
    if (array.length === 0) {
        this.resultsContainer.style.display = 'none';
        return;
    }
    this.resultsContainer.style.display = 'block';
    for (item of array) {
        this.resultsContainer.innerHTML += '<li>' + '<span id="listSpan">Rank: ' + item.id + ': </span> ' + item.name + '</li>';
    }
};
/**
 * Dictionary Class
 * 
 * @param {string} nameString
 * @param {string} eD
 * @param {string} rD
 */
function Dictionary(nameString, eD, rD) {
    this.entryDelimiter = eD;
    this.recordDelimiter = rD;
    this.names = nameString;
    this.namesArray = [];
}

/**
 * Dictionary Method
 * init()
 * 
 * initializes the Dictionary.
 */
Dictionary.prototype.init = function() {
    this.processNames();
}

/**
 * Dictionary Method
 * processNames()
 * 
 * Processes the names, it fetches the names from input string and puts them
 * an array using the delimiters..
 */
Dictionary.prototype.processNames = function() {
    let entryArray = this.names.split(this.entryDelimiter);

    for (i = 0; i < entryArray.length; i++) {
        let tempHolder = entryArray[i].split(this.recordDelimiter);
        this.namesArray.push({ name: tempHolder[0], id: tempHolder[1] });
    }
}
Dictionary.prototype.getMatches = function(key) {
    //this function searches for matches to key and returns an array
    let results = [];
    if (!key) {
        return results;
    }
    let expression = new RegExp(key, 'i');
    for (item of this.namesArray) {
        if (expression.test(item.name)) {
            results.push(item);
        }
    }
    return results;
}