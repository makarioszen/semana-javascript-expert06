import { jest } from "@jest/globals";

import {
    Readable,
    Writable
} from 'stream'

export default class TestUtil {
    static generateReadableStream(data) {
        return new Readable({
            read() {
                for (const item of data) {
                    this.push(item)
                }
                this.push(null)
            }
        })

    }
    static generateWritebleStream(onData) {
        return new Writable({
            write(chunck, enc, cb) {
                onData(chunck)
                cb(null, chunck)
            }
        })
    }

    static defaultHandlerParams() {
        const requestStream = TestUtil.generateReadableStream(['request body'])
        const responseStream = TestUtil.generateWritebleStream(() => { })
        const data = {
            request: Object.assign(requestStream, {
                headers: {},
                mehotd: '',
                url: ''
            }),
            response: Object.assign(responseStream, {
                writeHead: jest.fn(),
                end: jest.fn()
            })
        }

        return{
            values: ()=> Object.values(data),
            ...data,
        }


    }
}