'use strict';
require('should');

const fs = require('fs');
const { sign } = require('../lib/util');

const privateKey = fs.readFileSync(__dirname + '/fixtures/app-private-key.pem', 'ascii');

describe('util', function() {
  it('sign', function() {
    const data = sign('alipay.marketing.cashlessitemvoucher.template.create', { publicArgs: 1, bizContent: { a_b: 1, aBc: 'Ab', PID: "XX", STORE: "1" } }, { 
      appId: 'app111',
      charset: 'utf-8',
      version: '1.0.0',
      signType: 'RSA2',
      privateKey,
    });
    
    data.method.should.eql('alipay.marketing.cashlessitemvoucher.template.create');
    data.app_id.should.eql('app111');
    data.charset.should.eql('utf-8');
    data.version.should.eql('1.0.0');
    data.sign_type.should.eql('RSA2');
    data.public_args.should.eql(1);
    data.biz_content.should.eql('{"a_b":1,"a_bc":"Ab","PID":"XX","STORE":"1"}');
    (data.sign !== '').should.eql(true);
  });
});
