import {KinesisStreamHandler} from 'aws-lambda/trigger/kinesis-stream';

export const handler: KinesisStreamHandler = async (event, context?) => {
    console.log('Event', {event});

    event.Records.forEach((record, index) => {
        const data = JSON.parse(Buffer.from(record.kinesis.data, 'base64').toString('utf-8'));
        
        console.log('data', {data});
        /// do whatever
    });
};
