const fortune = require('./lib/fortune.js');
const expect = require('chai').expect;

suite('Fotune cookie test', function(){
    test('getFortune() should return string', function(){
        expect(typeof fortune.getFortune() === 'string');
    });
});