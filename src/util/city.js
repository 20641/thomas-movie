export function getCityList(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.CITY_LIST_API,
            method: 'GET'
        })
        .then(({data, status})=>{
            if(status != 200){
                return;
            }else{
                let cityMap = {};
                data.cts.map((item)=>{
                    let letter = item.py[0];
                    if(!cityMap[letter]){
                        cityMap[letter] = [];
                    }
                    cityMap[letter].push(item);
                })
                let keys = Object.keys(cityMap);
                for(let i = 0; i < keys.length; i++){
                    for(let j = i+1; j < keys.length; j++){
                        if(keys[i] > keys[j]){
                            let tmp = keys[i];
                            keys[i] = keys[j];
                            keys[j] = tmp;
                        }
                    }
                }
                let newData = keys.map(letter=>{
                    return {
                        key: letter,
                        value: cityMap[letter]
                    }
                })
                resolve({
                    keys,
                    data: newData
                });
            }
        })
        .catch(error=>{
        })
    })
}
