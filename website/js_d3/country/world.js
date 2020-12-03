d3.csv("/data/data.csv", function(data){
    var dictCountriesNetflix = {}
    data.forEach(function(d) {
        countries = d.Country.split(",")
        countries.forEach(function(g) {
            if(g != ""){
                if (g in dictCountriesNetflix) {
                    dictCountriesNetflix[g] += 1
                }
                else{
                    dictCountriesNetflix[g] = 1
                }
            }         
        });
    });

    lang_value = []
    for(let k in dictCountriesNetflix){
        lang_value.push({Country: k, Value: dictCountriesNetflix[k]})
    } 

    

});