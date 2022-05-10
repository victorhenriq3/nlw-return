import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase"

const submitFeedback = new SubmitFeedbackUseCase(
    {create: async() => {}},
    {sendMail: async() => {}}
)

describe('Submit feedback', () => {
    it('should be able to submit a feddback', async () => {

        expect(submitFeedback.execute({
            type: 'bug',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64asdasd'
        })).resolves.not.toThrow()
    })
    
    it('should not be able to submit without type', async () => {
        
        expect(submitFeedback.execute({
            type: '',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64asdasd'
        })).rejects.toThrow()
    })
})