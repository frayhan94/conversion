const getCountry = (skip) => {
    return  `
        {       
          countries(skip: ${skip},limit: 10) {
              name                     
              alpha2Code
              alpha3Code
              vatRate
              population             
              location                    
              capital {
                name
              }             
              cities {
                name
              }                           
              languages {
                name
              }       
                                              
              currencies {
                  name
                  unitSymbols   
                  isoCode                             
              }
              continent {
                name
              }
                                                                     
          }      
      }
      `;
}

const getConvertion = (from, to, value) => {
    return  `
         {
      currencies(where:{isoCode:{eq:"${from}"}}){
          convert(amount:${value}, to:"${to}")
          id
          isoCode
          name
          unitSymbols
          countries{
            name    
          }
      }
    }
      `;
}





export {
    getCountry,
    getConvertion
}
