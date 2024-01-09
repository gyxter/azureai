$('#submitBtn').on('click',(e)=>{
    const userInput = $('#inputText').val();
    $('#toggleBtn').hide();
    $('#prompt').html('')
    $('#codeRender pre').text('')
    $('#htmlRender iframe').attr('srcdoc','');
    $.ajax({
      type:'post',
      url: '/submit',
      data:"inputText="+ encodeURIComponent(userInput),
      beforeSend: ()=>{
        $('#loading').show();
      },
      success:(res, status)=>{
        console.log(status)
        if(status === 'success') {
          $('#prompt').html('<strong>'+userInput+'</strong>:');
          $('#codeRender pre').text(res);
          $('#htmlRender iframe').attr('srcdoc',$('#codeRender pre').text());
        } else {
          console.error('Request failed with status ' + status);
        }
        $('#loading').hide();
        $('#toggleBtn').show();
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