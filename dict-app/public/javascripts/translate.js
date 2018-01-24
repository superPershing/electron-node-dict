$(function () {
  $('#translate').click(function (event) {
    event.preventDefault()
    var $word = $('#word').val()
    var appid = '2015063000000001'
    var key = '12345678'
    var salt = (new Date()).getTime()
        // var query = 'apple';
    var query = $word
        // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'en'
    var to = 'zh'
    var str1 = appid + query + salt + key
    var sign = MD5(str1)
    $.ajax({
      url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
      type: 'get',
      dataType: 'jsonp',
      data: {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      },
      success: function (data) {
        console.log(data)
        // alert(data['trans_result'][0]['dst'])
        $('#translate-result').text(data['trans_result'][0]['dst'])
      }
    })
  })
})
