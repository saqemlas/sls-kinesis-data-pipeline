# Kinesis Data Stream Pipeline

## Info 

This handles deployment for a producer (lambda), a kinesis data stream, a consumer (lambda), and an sqs dead letter queue as a destination for any failed record consumption attempts. Configuration for the pipeline optimizes the flow of data at scale.

Kinesis Data Streams to collect and process large streams of data records in real time, this means;
- The delay between the time a record is put into the stream and the time it can be retrieved is typically **less than 1 second**. 
- Each PutRecords request can support up to 500 records. 
- Each record in the request can be as large as 1 MiB, up to a limit of 5 MiB for the entire request, including partition keys. 
- Each shard can support writes up to 1,000 records per second, up to a maximum data write total of 1 MiB per second.

When putting data into the stream, the partition key is used to determine which shard in the stream the data record is added to. All the data in the shard is sent to the same worker that is processing the shard. *The partition key used depends on your application logic*. The number of partition keys should typically be much greater than the number of shards. This is because the partition key is used to determine how to map a data record to a particular shard. If you have enough partition keys, the data can be evenly distributed across the shards in a stream.

A kinesis consumer is an application that processes all data from a Kinesis data stream. When a consumer uses enhanced fan-out, it gets its own 2 MB/sec allotment of read throughput, allowing multiple consumers to read data from the same stream in parallel, without contending for read throughput with other consumers. By default, shards in a stream provide 2 MB/sec of read throughput per shard. This throughput gets shared across all the consumers that are reading from a given shard. In other words, the default 2 MB/sec of throughput per shard is fixed, even if there are multiple consumers that are reading from the shard.

For more information...
- [AWS Documentation: Kinesis Data Streams](https://docs.aws.amazon.com/streams/latest/dev/amazon-kinesis-streams.html)
- [AWS Documentation: Reading Data from Amazon Kinesis Data Streams](https://docs.aws.amazon.com/streams/latest/dev/building-consumers.html)
- [AWS Documentation: Error handling and automatic retries in AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/invocation-retries.html)
- [Api Reference: PutRecords](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html)
- [AWS Documentatin: SQS Dead Letter Queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)
- [Serverless Framework: Kinesis Events](https://www.serverless.com/framework/docs/providers/aws/events/streams)

## Architecture

<p align="center">
  <img src="/architecture-diagram.drawio.svg" />
</p>

## Usage 

### Credentials:
```bash
export AWS_PROFILE=<profile_name>
```

### Install Dependencies:

```bash
yarn run install
```

### Deploy:

```bash
yarn run deploy
```

### Remove:

```bash
yarn run remove
```
