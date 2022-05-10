import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase"

const createFeedbackSpy = jest.fn();
const sendMailsSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailsSpy}
)

//spies

describe('Submit feedback', () => {
    it('should be able to submit a feddback', async () => {

        await expect(submitFeedback.execute({
            type: 'bug',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64asdasd'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailsSpy).toHaveBeenCalled()
    })
    
    it('should not be able to submit without type', async () => {
        
        expect(submitFeedback.execute({
            type: '',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64asdasd'
        })).rejects.toThrow()
    })
    
    it('should not be able to submit without comment', async () => {
        
        expect(submitFeedback.execute({
            type: 'type',
            comment: '',
            screenshot: 'data:image/png;base64asdasd'
        })).rejects.toThrow()
    })
    
    it('should not be able to submit with an invalid screenshot', async () => {
        
        expect(submitFeedback.execute({
            type: 'type',
            comment: 'ta tudo bugado',
            screenshot: 'teste.jpg'
        })).rejects.toThrow()
    })
})