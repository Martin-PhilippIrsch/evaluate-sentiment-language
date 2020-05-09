import { checkInputPhrase } from "./formHandlerAylien";

window.alert = jest.fn();

test('short input for phrase form', () => {
    const result = checkInputPhrase("not yet");
    expect(result).toBe(false);
});

test('Long input for phrase form', () => {
    const result = checkInputPhrase("rugby is a brutal sport");
    expect(result).toBe(true);
});