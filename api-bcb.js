
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = url => $.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
  const today = new Date()
  // return (today.getMonth() + 1) + '-' + 8 + '-' + today.getFullYear()
  return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
}

const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async () => {
  try {
    const today = getToday()
    const url = getUrl(today)
    const res = await getCotacaoAPI(url) // '10-8-2021'
    const cotacao = extractCotacao(res)
    return cotacao

  } catch (error) {
    console.log('##################### erro: ', error)
    return 'ERROR'
  }

}

module.exports = {
  getCotacaoAPI,
  getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }),
  extractCotacao,
  getToday,
  getUrl,
  pure: {
    getCotacao
  }
}