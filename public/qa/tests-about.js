suite('About Page Tests', function(){
    test('Page should contain link to contact page', function(){
        assert(document.title == 'About - Meadowlark Travel');
    });
});