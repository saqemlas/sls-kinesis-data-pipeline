import {KinesisClient, PutRecordCommand} from '@aws-sdk/client-kinesis';
import {v4 as uuid} from 'uuid';
import {TextEncoder} from 'util';

const region: string = process.env.REGION || '';
const streamName: string = process.env.KINESIS_STREAM || '';

const kinesis = new KinesisClient({region: region});

const encoder = new TextEncoder();

export const handler = async () => {
    const partitionKey: string = uuid();    
    const data = JSON.stringify({data: 'example'});

    const response = await kinesis.send(new PutRecordCommand({
        StreamName: streamName,
        PartitionKey: partitionKey,
        Data: encoder.encode(data),
    }));

    console.log('putRecord Response :', {response});
};
