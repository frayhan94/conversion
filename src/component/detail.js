import React from "react";


function Detail({data}) {

    return (
        <div style={{ marginTop: '10px'}}>
            <div className={'row'}>
                <div className={'row-label'}>
                    Capital
                </div>
                <div className={'row-text'}>
                    {data.capital ? data.capital.name: '-'}
                </div>
            </div>
            <div className={'row'}>
                <div className={'row-label'}>
                    Languages
                </div>
                <div className={'row-text'}>
                    {
                        data.languages.map((valueLanguages) => {
                            return (
                                <div>
                                    {valueLanguages.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={'row'}>
                <div className={'row-label'}>
                    Currency
                </div>
                <div className={'row-text'}>
                    {
                        data.currencies.map((valueCurrency) => {
                            return (
                                <div>
                                    {valueCurrency.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={'row'}>
                <div className={'row-label'}>
                    Continent
                </div>
                <div className={'row-text'}>
                    {data.continent.name}
                </div>
            </div>

            <div className={'row'}>
                <div className={'row-label'}>
                    Cities
                </div>
                <div className={'row-text'}>
                    {
                        data.cities.map((valueCities) => {
                            return (
                                <div className={'space right'}>
                                    {valueCities.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>


        </div>
    )
}


export default Detail;
