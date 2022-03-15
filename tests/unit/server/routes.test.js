import { jest, expect, describe, test, beforeEach } from '@jest/globals'
import config from '../../../server/config.js'
import { Controller } from '../../../server/controller.js'

import { handler } from '../../../server/routes.js'
import TestUtil from '../_util/testUtil.js'


const {
    pages,
    location
} = config

describe('#Routes - test site for API response', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        jest.clearAllMocks()
    })

    test(`GET / - should redirect to home page`, async () => {
        const params = TestUtil.defaultHandlerParams()
        params.request.method = 'GET'
        params.request.url = '/'

        await handler(...params.values())

        expect(params.response.writeHead).toBeCalledWith(
            302,
            {
                'Location': location.home
            }
        )
    })
    test(`GET /home - should response with ${pages.homeHtml} file stream`, async () => {
        const params = TestUtil.defaultHandlerParams()
        params.request.method = 'GET'
        params.request.url = '/home'
        const mockFileStream = TestUtil.generateReadableStream(['data'])

        jest.spyOn(
            Controller.prototype,
            Controller.prototype.getFileStream.name,

        ).mockResolvedValue({
            stream: mockFileStream,
        })

        jest.spyOn(
            mockFileStream,
            "pipe"
        ).mockReturnValue()

        await handler(...params.values())


        expect(Controller.prototype.getFileStream).toBeCalledWith(pages.homeHtml)
        expect(mockFileStream.pipe).toBeCalledWith(params.response)
    })
    test(`GET /controller - should response with ${pages.controllerHtml} file stream`, async () => {
        const params = TestUtil.defaultHandlerParams()
        params.request.method = 'GET'
        params.request.url = '/home'
        const mockFileStream = TestUtil.generateReadableStream(['data'])

        jest.spyOn(
            Controller.prototype,
            Controller.prototype.getFileStream.name,

        ).mockResolvedValue({
            stream: mockFileStream,
        })

        jest.spyOn(
            mockFileStream,
            "pipe"
        ).mockReturnValue()

        await handler(...params.values())


        expect(Controller.prototype.getFileStream).toBeCalledWith(pages.homeHtml)
        expect(mockFileStream.pipe).toBeCalledWith(params.response)
    })
    test.todo(`GET /file.txt - should response with file stream`)
    test.todo(`GET /unknow - given an inexistent it should response with 404`)

    describe('exception', () => {
        test.todo('given inexistent file it should respond with 404')
        test.todo('given an error it should respond with 500')
    })



})