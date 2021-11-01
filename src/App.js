import React, {useState, useEffect, useRef} from 'react';
import {
  URL,
  POST_CONFIG
} from './constant';
import check from './checkmark.png';
import Detail from './component/detail';
import { dropdownStyle } from './style';
import './App.css';
import {getCountry,getConvertion} from "./graphql";
import {
  Loading
} from './component/index';


function App() {

  const skip = 10;
  const [countryFrom, setCountryFrom] = useState(null);
  const [countryTo, setCountryTo] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loadingFrom, setLoadingFrom] = useState(false);
  const [loadingTo, setLoadingTo] = useState(false);
  const [convertionValue, setConvertionValue] = useState(null);
  const [countryFromSkip, setCountryFromSkip] = useState(0);
  const [countryToSkip, setCountryToSkip] = useState(0);
  const inputConvertionText = useRef(null);

  const onConvert = async () => {

    console.log('inputConvertionText',inputConvertionText.current.value);



    if(!selectedCountry) {
      alert("Please Specify Country From and Country To")
      return false;
    }

    if(selectedCountry["detailFrom"] === undefined) {
      alert("Please Specify Country From")
      return false;
    }

    if(selectedCountry["detailTo"] === undefined) {
      alert("Please Specify Country To")
      return false;
    }


    if(inputConvertionText.current.value === "") {
      alert("Please Specify Value to convert")
      return false;
    }




    try {
      const res = await fetch(URL, {
        ...POST_CONFIG,
        body: JSON.stringify({query:getConvertion(
              selectedCountry.detailFrom.currencies[0].isoCode,
              selectedCountry.detailTo.currencies[0].isoCode,
              inputConvertionText.current.value
          )}),
      });
      let {data} = await res.json();
      setConvertionValue(data.currencies[0].convert)
    } catch (e) {
    }
  };

  const fetchApiFrom = async (skip) => {
    try {
      setLoadingFrom(true);
      const res = await fetch(URL, {
        ...POST_CONFIG,
        body: JSON.stringify({query:getCountry(skip)}),
      });
      let {data} = await res.json()
      setCountryFrom(data)
      setLoadingFrom(false);
    }catch (e) {
      setLoadingFrom(false);
    }
  }

  const fetchApiTo = async (skip) => {
    try {
      setLoadingTo(true);
      const res = await fetch(URL, {
        ...POST_CONFIG,
        body: JSON.stringify({query:getCountry(skip)}),
      });
      let {data} = await res.json()
      setCountryTo(data)
      setLoadingTo(false);
    }catch (e) {
      setLoadingTo(false);
    }
  }

  useEffect(() => {
    fetchApiFrom(countryFromSkip);
  }, [countryFromSkip]);

  useEffect(() =>{
    fetchApiTo(countryToSkip);
  },[countryToSkip]);


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>

      <div style={{ marginBottom: '10px' }}>
        <input
           ref={inputConvertionText}
            type={'number'}
            className={'search'}
        />
        <input
            value={'Convert'}
            type={'button'}
            onClick={async () => {
          await onConvert();
        }}/>
      </div>
      {
        convertionValue ? (
            <h1>
              Convertion Value: {parseInt(convertionValue)}
            </h1>
        ) : (
            <h1>
              Convertion Not Found. Please specify other input
            </h1>
        )
      }

      <div style={{
        display: 'flex'
      }}>

      <div className={'dropdown-wrapper'} id={'dropdown-wrapper-from'}>
        <div className={'small-title'}>
          From
        </div>
      <div className={'pagination-wrapper'}>
        <input
            className={'btn-small pagination'}
            type={'button'}
            value={'Prev'} onClick={() => {
              if(countryFromSkip > 0) {
                setCountryFromSkip(countryFromSkip -  skip);
                setSelectedCountry(
                    {
                      ...selectedCountry,
                      detailFrom: null,
                    })
              }
            }}/>
        <input
            className={'btn-small pagination'}
            type={'button'}
            value={'Next'}
            onClick={() => {
              setCountryFromSkip(countryFromSkip +  skip);
              setSelectedCountry(
                  {
                    ...selectedCountry,
                    detailFrom: null,
                  })
            }}/>
      </div>
      {
        loadingFrom ? (
              <Loading />
            ) : (
                <>
                  {
                    countryFrom && countryFrom.countries.map((valueCountry) => {
                      return (
                          <div style={dropdownStyle} onClick={() => {
                            setSelectedCountry({
                              ...selectedCountry,
                              from :valueCountry.alpha2Code,
                              detailFrom: {
                                cities: valueCountry.cities,
                                capital: valueCountry.capital,
                                languages: valueCountry.languages,
                                currencies: valueCountry.currencies,
                                continent: valueCountry.continent
                              }
                            })
                          }}>
                            <div>
                              {valueCountry.name}
                            </div>
                            {
                              selectedCountry && selectedCountry.from === valueCountry.alpha2Code && (
                                  <div>
                                    <img src={check} alt={'checkmark'} style={{ width: '20px'}} />
                                  </div>
                              )
                            }
                          </div>
                      )
                    })
                  }
                </>
        )
      }

      {
        selectedCountry && selectedCountry.detailFrom && (
            <Detail data={ selectedCountry.detailFrom}/>
        )
      }
    </div>
      <div className={'dropdown-wrapper'} id={'dropdown-wrapper-to'}>
        <div className={'small-title'}>
          To
        </div>

        <div className={'pagination-wrapper'}>
          <input
              className={'btn-small pagination'}
              type={'button'}
              value={'Prev'} onClick={() => {

            if(countryToSkip > 0) {
              setCountryToSkip(countryToSkip -  skip);
              setSelectedCountry(
                  {
                    ...selectedCountry,
                    detailTo: null,
                  })
            }

          }}/>
          <input
              className={'btn-small pagination'}
              type={'button'}
              value={'Next'}
              onClick={() => {
                setCountryToSkip(countryToSkip +  skip);
                setSelectedCountry(
                    {
                      ...selectedCountry,
                      detailTo: null,
                    })
              }}
          />
        </div>

      {
        loadingTo ? (
            <Loading />
            ) : (
                <>
                  {
                    countryTo && countryTo.countries.map((valueCountry) => {
                      return (
                          <div
                              style={dropdownStyle}
                              onClick={() => {
                                setSelectedCountry({
                                  ...selectedCountry,
                                  to :valueCountry.alpha2Code,
                                  detailTo: {
                                    cities: valueCountry.cities,
                                    capital: valueCountry.capital,
                                    languages: valueCountry.languages,
                                    currencies: valueCountry.currencies,
                                    continent: valueCountry.continent
                                  }
                                })
                              }}
                          >
                            <div>
                              {valueCountry.name}
                            </div>
                            {
                              selectedCountry && selectedCountry.to === valueCountry.alpha2Code && (
                                  <div>
                                    <img src={check} alt={'checkmark'} style={{ width: '20px'}} />
                                  </div>
                              )
                            }
                          </div>
                      )
                    })
                  }
                </>
        )
      }
      {
        selectedCountry && selectedCountry.detailTo && (
            <Detail data={selectedCountry.detailTo}/>
        )
      }
    </div>
      </div>
    </div>
  );
}

export default App;
