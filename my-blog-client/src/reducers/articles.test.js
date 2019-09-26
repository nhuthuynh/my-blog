import { describe } from 'riteway';
import { reducer, create, upvote, comment, load } from './articles';

describe('', async assert => {
    assert({
        given: 'no arguments',
        should: 'return the valid initial state',
        actual: reducer(),
        expected: 0
    });
});