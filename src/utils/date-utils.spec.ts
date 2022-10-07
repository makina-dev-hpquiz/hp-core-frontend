import { DateUtils } from './date-utils';

describe('DateUtils', () => {

    it('Comparation de string date', ()=> {
        const dateActuelString = new Date().toISOString();
        const date2String = new Date(2022, 1, 1, 0, 0, 1).toISOString();

        let result =  DateUtils.compare(dateActuelString, date2String);
        expect(-1).toEqual(result);

        result =  DateUtils.compare(date2String, dateActuelString);
        expect(1).toEqual(result);

        result =  DateUtils.compare(dateActuelString, dateActuelString);
        expect(0).toEqual(result);
    });
});
