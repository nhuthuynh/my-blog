import 'mocha';
import { assert, expect } from 'chai';

const getSecret = (secret: any) => {
    return {
        get: () => secret
    }
}

describe('Closure for object privacy', () => {

    const msg = '.get() should have access to the closure';
    const expected = 1;
    const obj = getSecret(1);

    const actual = obj.get();
    
    it(msg, async () => {
        expect(expected).to.equal(actual);
    });
    
});