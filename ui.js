$('#submitBtn').on('click',(e)=>{
    const inputField = $('#inputText');
    const inputPage = $('#page').val();
    const inputMood = $('#mood').val();
    const inputTheme = $('#thcolor').val();
    const inputPlImages = $('input[name="plimages"]:checked').val();
    let userInput = '';
    if(inputField.val().length === 0){
      userInput = 'Generate'+inputField.prop('placeholder').split('e.g.')[1]
    } else {
      userInput = 'Generate responsive '+inputPage+' that has a header and footer with '+inputMood+' styling in '+inputTheme+' theme, with '+inputPlImages+', '+inputField.val()+'.';
    }
    $('#toggleBtn').hide();
    $('#prompt').html('')
    $('#codeRender pre').text('').removeClass('border border-info-subtle')
    $('#htmlRender iframe').attr('srcdoc','').removeClass('border border-info-subtle');
    $.ajax({
      type:'post',
      url: 'http://localhost:3000/submit',
      data:"inputText="+ encodeURIComponent(userInput),
      beforeSend: ()=>{
        $('#loading').show();
      },
      success:(res, status)=>{
        console.log(status)
        if(status === 'success') {
          $('#prompt').html('<strong>'+userInput+'</strong>:');
          $('#codeRender pre').text(res).addClass('border border-info-subtle');
          $('#htmlRender iframe').attr('srcdoc',$('#codeRender pre').text()).addClass('border border-info-subtle');
        } else {
          console.error('Request failed with status ' + status);
        }
        $('#loading').hide();
        $('#toggleBtn').show();
      },
      error: function (request, status, error) {
        console.log("ERROR: " + request.responseText);
      }
    })
  });
  $('#toggleBtn').on('click',e=>{
    const _this = $(e.currentTarget); 
    if(_this.text().indexOf('Code') !== -1){
      _this.text('View Render');
    } else {
      _this.text('View Code');
    }
    $('.toggleView').toggle()
  })