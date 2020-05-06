describe("Speedshots", function() {
    describe("answer tests", function(){
        it("answer return wrong", function(){
            expect(selection("USA", "Russia")).toBe(false);
        });
        it("answer return correct", function(){
            expect(selection("USA", "USA")).toBe(true);
        });
    });
});