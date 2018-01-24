$(function () {
  $('#translate').click(function (event) {
    event.preventDefault()
    // 百度翻译API 太垃圾了,弃之
    // var $word = $('#word').val()
    // var appid = '2015063000000001'
    // var key = '12345678'
    // var salt = (new Date()).getTime()
    //     // var query = 'apple';
    // var query = $word
    //     // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    // var from = 'en'
    // var to = 'zh'
    // var str1 = appid + query + salt + key
    // var sign = MD5(str1)
    // $.ajax({
    //   url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
    //   type: 'get',
    //   dataType: 'jsonp',
    //   data: {
    //     q: query,
    //     appid: appid,
    //     salt: salt,
    //     from: from,
    //     to: to,
    //     sign: sign
    //   },
    //   success: function (data) {
    //     console.log(data)
    //     // alert(data['trans_result'][0]['dst'])
    //     $('#translate-result').text(data['trans_result'][0]['dst'])
    //   }
    // })
    
    var $word = $('#word').val()
    var query = $word
    // 有道翻译API
    var appSecret = ''; //应用密钥 
    var appID = '';//应用ID 
    var salt = (new Date).getTime();
    // var query = 'test';
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    // var from = 'zh-CHS';
    // var to = 'en';
    var from = 'en';
    var to = 'zh-CHS';
    var str1 = appID + query + salt + appSecret;
    var sign = MD5(str1);
    $.ajax({
      url: 'http://openapi.youdao.com/api',
      type: 'post',
      dataType: 'jsonp',
      data: {
        q: query,
        appKey: appID,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      },
      success: function (data) {
        console.log(data);
      }
    });

  })
})
