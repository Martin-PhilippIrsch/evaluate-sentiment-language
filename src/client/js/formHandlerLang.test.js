import { checkInputLang } from "./formHandlerLang";

window.alert = jest.fn();

test('Input for language form', () => {
    const result = checkInputLang("no");
    expect(result).toBe(false);
});