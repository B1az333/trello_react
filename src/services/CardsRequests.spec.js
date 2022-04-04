import CardsRequests from './CardsRequests';
import HTTPService from './HTTPService';
import UserStorage from '../utils/UserStorage.js'

const token = "token";
jest.mock('../utils/UserStorage.js', () => ({
    token: token,
}));

jest.mock('./HTTPService.js', () => ({
    request: jest.fn(),
}));

describe('loadUser', () => {
    beforeEach(() => {
        HTTPService.request.mockResolvedValue("value");
    })

    test('Should be 4: ', async () => {
        const res1 = await HTTPService.request();
        console.log(res1);
        expect(2+2).toBe(4);
    });
})
