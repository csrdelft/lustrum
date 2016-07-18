describe('LustrumApp', function () {
    beforeEach(function () {
        browser.get('');
    });
    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('Onontdekt');
    });
    it('should have <nav>', function () {
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
    });
});
