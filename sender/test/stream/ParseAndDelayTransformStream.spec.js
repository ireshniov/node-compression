"use strict";

const sinon = require('sinon');
const chai = require('chai');
const ParseAndDelayTransformStream = require('../../src/stream/ParseAndDelayTransformStream');

describe('ParseAndDelayTransformStream', () => {
    let clock;

    beforeEach(async () => {
        clock = sinon.useFakeTimers();
    });

    afterEach(async () => {
        clock.restore();
    });

    it('#ParseAndDelayTransformStream should return json objects after timeout', async () => {
        const stream = new ParseAndDelayTransformStream({ objectMode: true });

        const object1 = {"deviceId":"9bde4d3e-dfc7-4b31-90bc-9032961793c0","readings":[{"path":"","meaning":"humidity","value":24.012}],"received":1479907316977};
        const object2 = {"deviceId":"e6d081cb-ed06-4817-bd7a-5eb781a4109c","readings":[{"path":"","meaning":"angularSpeed","value":{"x":0.366,"y":0,"z":2.075}}],"received":1479907324887};
        const object3 = [{"bn":"amb1/modbus/etima-strom/","bt":1480001428.655},{"n":"V a-n","v":230.5494384765625,"u":"V"},{"n":"V b-n","v":230.12722778320312,"u":"V"},{"n":"V c-n","v":230.29534912109375,"u":"V"},{"n":"I a","v":24.63257598876953,"u":"A"},{"n":"I b","v":25.195981979370117,"u":"A"},{"n":"I c","v":23.139299392700195,"u":"A"},{"n":"P a","v":5462.740234375,"u":"W"},{"n":"P b","v":5624.10302734375,"u":"W"},{"n":"P c","v":5121.3876953125,"u":"W"},{"n":"MP a","v":13727.556640625,"u":"W"},{"n":"MP b","v":14837.0654296875,"u":"W"},{"n":"MP c","v":13078.4951171875,"u":"W"}];

        const expected = [object1, object2, object3];

        const result = [];

        stream
            .on('data', (data) => {
                result.push(data);
            })
            .on('end', () => {
                chai.expect(result).to.deep.equal(expected);
            })

        stream.write('');
        stream.write('{"deviceId":"9bde4d3e-dfc7-4b31-90bc-9032961793c0","readings":[{"path":"","meaning":"humidity","value":24.012}],"received":1479907316977}');
        stream.write('{"deviceId":"e6d081cb-ed06-4817-bd7a-5eb781a4109c","readings":[{"path":"","meaning":"angularSpeed","value":{"x":0.366,"y":0,"z":2.075}}],"received":1479907324887}');
        stream.write('[{"bn":"amb1/modbus/etima-strom/","bt":1480001428.655},{"n":"V a-n","v":230.5494384765625,"u":"V"},{"n":"V b-n","v":230.12722778320312,"u":"V"},{"n":"V c-n","v":230.29534912109375,"u":"V"},{"n":"I a","v":24.63257598876953,"u":"A"},{"n":"I b","v":25.195981979370117,"u":"A"},{"n":"I c","v":23.139299392700195,"u":"A"},{"n":"P a","v":5462.740234375,"u":"W"},{"n":"P b","v":5624.10302734375,"u":"W"},{"n":"P c","v":5121.3876953125,"u":"W"},{"n":"MP a","v":13727.556640625,"u":"W"},{"n":"MP b","v":14837.0654296875,"u":"W"},{"n":"MP c","v":13078.4951171875,"u":"W"}]');
        stream.end();

        clock.tick(6000);
    });

    it('#ParseAndDelayTransformStream should catch JSON parse error', async () => {
        const stream = new ParseAndDelayTransformStream({ objectMode: true });

        stream
            .on('error', (err) => {
                chai.expect(err.message).to.be.equal("Can't parse: asdasd. SyntaxError: Unexpected token a in JSON at position 0");
            });

        stream.write('asdasd');
        stream.end();

        clock.tick(2000);
    });
});
