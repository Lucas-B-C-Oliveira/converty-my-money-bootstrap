
const getNewCotation = async () => {
  const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
  const getCotacaoAPI = url => $.get(url)
  const extractCotacao = res => res.value[0].cotacaoVenda
  const getToday = () => {
    const today = new Date()
    // return (today.getMonth() + 1) + '-' + 8 + '-' + today.getFullYear()
    return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
  }

  try {
    const today = getToday()
    const url = getUrl(today)
    const res = await getCotacaoAPI(url)
    const cotacao = extractCotacao(res)
    return cotacao

  } catch (error) {
    console.log('##################### erro: ', error)
    return 'ERROR'
  }
}



$(async function () {


  const currentDolarCotation = await getNewCotation()
  $('#dolarCotation').val(currentDolarCotation)

  $('#btn-convert').click(function () {

    const dolarCotation = parseFloat($('#dolarCotation').val())

    const dollarAmount = parseFloat($('#dollarAmount').val()).toFixed(2)
    const quantityInReais = (dollarAmount * dolarCotation).toFixed(2)

    const defaultText = `$${dollarAmount} dólares na cotação ${dolarCotation}, é igual a: R$${quantityInReais} Reais`

    $('#defaultText').text(defaultText)
  })

})