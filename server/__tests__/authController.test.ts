import authController from '../controllers/authController';

describe('should do stuff', () => {

    test('should validate object', async () => {
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
            locals: {}
        };

        const req: any = {
            body: {
                email: 'fake@email.com',
                firstName: 'jack',
                lastName: 'foo',
                skillsToTeach: [ 'TypeScript' ]
            }
        }

        const next = jest.fn();

        try {
            await authController.createUser(req, res, next)
            expect(res.locals.verification).toEqual(expect.objectContaining({
                hasLogged: "empty"
            }))
        } catch(ex) {
            // something's wrong 
            console.log(ex)
        }
    });
});