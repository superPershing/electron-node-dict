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
    var appSecret = 'ZkBGtajsNvWat6byR00ptQ9PSKdo2H8N' // 应用密钥
    var appID = '12b7c2d926c74565'// 应用ID
    var salt = (new Date()).getTime()
    // var query = 'test';
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    // var from = 'zh-CHS';
    // var to = 'en';
    // var from = 'en';
    // var to = 'zh-CHS';
    var str1 = appID + query + salt + appSecret
    var sign = MD5(str1)
    $.ajax({
      url: 'http://openapi.youdao.com/api',
      type: 'post',
      dataType: 'jsonp',
      data: {
        q: query,
        appKey: appID,
        salt: salt,
        // from: from,
        // to: to,
        sign: sign
      },
      success: function (data) {
        console.log(data)

        parseJsonCreateDom(data)
      }
    })
  })

  function parseJson (data) {
    // parse json
    if (data['errorCode'] == 0) {
      console.log(data['query'] + ' ' + data['translation'][0])
      // phonetic
      var u = data['basic']['us-phonetic']
      var e = data['basic']['uk-phonetic']
      var c = data['basic']['phonetic']

      if (u != null && e != null) {
        console.log('(U: ' + u + ')')  // us-phonetic
        console.log('(E: ' + e + ')')  // uk-phonetic
      } else if (c != null) {
        console.log('(PinYin:  ' + c + ')')  // phonetic
      }

      // explains
      var explains = data['basic']['explains']
      if (explains != null) {
        for (var i in explains) {
          console.log(explains[i])
        }
      }

      // phrase
      var phrase = data['web']
      if (phrase != null) {
        for (var p in phrase) {
          console.log(phrase[p]['key'] + ':  ' + phrase[p]['value'].toString())
        }
      }
    }
  }

    function parseJsonCreateDom (data) {
        // parse json and create dom for translate-result Div
        if (data['errorCode'] == 0) {
            var lastDiv = document.getElementById("translate-result")
            lastDiv.parentNode.removeChild(lastDiv)

            var currentDiv = document.createElement("div")
            document.body.appendChild(currentDiv)
            currentDiv.id = "translate-result"
            currentDiv = document.getElementById("translate-result")

            // console.log(data['query'] + ' ' + data['translation'][0])
            var translationP = document.createElement("p")
            var translationContent = document.createTextNode(data['query'] + ' ' + data['translation'][0])
            translationP.appendChild(translationContent)
            currentDiv.appendChild(translationP)

            // phonetic
            var u = data['basic']['us-phonetic']
            var e = data['basic']['uk-phonetic']
            var c = data['basic']['phonetic']

            if (u != null && e != null) {
                // console.log('(U: ' + u + ')')  // us-phonetic
                // console.log('(E: ' + e + ')')  // uk-phonetic
                var phoneticP = document.createElement("p")
                var phoneticContent = document.createTextNode('(U: ' + u + ') (E: ' + e + ')')
                phoneticP.appendChild(phoneticContent)
                currentDiv.appendChild(phoneticP)
            } else if (c != null) {
                // console.log('(PinYin:  ' + c + ')')  // phonetic
                var phoneticP = document.createElement("p")
                var phoneticContent = document.createTextNode('(PinYin:  ' + c + ')')
                phoneticP.appendChild(phoneticContent)
                currentDiv.appendChild(phoneticP)
            }

            // explains
            var explains = data['basic']['explains']
            if (explains != null) {
                for (var i in explains) {
                    // console.log(explains[i])
                    var explainP = document.createElement("p")
                    var explainContent = document.createTextNode(explains[i])
                    explainP.appendChild(explainContent)
                    currentDiv.appendChild(explainP)
                }
            }

            // phrase
            var phrase = data['web']
            if (phrase != null) {
                for (var p in phrase) {
                    // console.log(phrase[p]['key'] + ':  ' + phrase[p]['value'].toString())
                    var phraseP = document.createElement("p")
                    var phraseContent = document.createTextNode(phrase[p]['key'] + ':  ' + phrase[p]['value'].toString())
                    phraseP.appendChild(phraseContent)
                    currentDiv.appendChild(phraseP)
                }
            }
        }
    }
})
