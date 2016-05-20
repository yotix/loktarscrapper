var request = require('request');
var cheerio = require('cheerio');
var url = '';

var len = process.argv.length;
if(len < 3){
	console.log('No keywords Specified !!');
	process.exit(1);
}
else if (len == 3) {
	console.log('The keyword provided is',process.argv[2]);
	url = 'http://www.shopping.com/products?KW='+process.argv[2];

}
else if (len == 4) {
	console.log('The keywords provided are',process.argv[2],process.argv[3]);
	url = 'http://www.shopping.com/products~PG-'+process.argv[2]+'?KW='+process.argv[3];

}
else{
	console.log('Process doesnt take more than two keywords. Exiting...');
	process.exit(1);
}
console.log(url);
request({url:url,headers:{'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36','Connection':'keep-alive'}},function(err,resp,body){
  if(err){
    console.log(err);
  }
  else//If no error, start scraping
	{
    var $ = cheerio.load(body);
		if ($('span[class=nomatch]').text().trim() === 'no matches')// if search term doesnt exists end program
		{
			console.log('Search term doesnt exists.','Process Ended');
			process.exit(1);
		}
		else//if exists find info
		{
		data = $('form[name=compareprd]').children('div').length;
		console.log('Total:',data);
		console.log('////////////////////////////');
		for (var i=0;i<data;++i){
			pname = $('#nameQA'+(i+1)).attr('title')
			if (pname === undefined){
				pname = '';
			}
			else{
				pname = pname.trim();
			console.log('Data #'+i+$('a#DCTmerchNameLnk'+i+'.newMerchantName').text().trim()+$('#DCTmerchNameLnk'+i).text().trim()+pname);
		}
	}
	}
    }
	});
