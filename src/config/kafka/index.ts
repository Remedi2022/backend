import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "REMEDI",
    brokers: ["localhost:9092"],
});

class InitKafka {
    public producer;
    public consumer;
    constructor() {
        this.producer = kafka.producer();
        this.consumer = kafka.consumer({
            groupId: "REMEDI-group",
        });
        this.initPubKafka();
        this.initSubKafka();
    }

    initPubKafka = async () => {
        console.log("start publish kafka");
        await this.producer.connect().then(result => console.log(result));
    };

    initSubKafka = async () => {
        console.log("start subscribe");
        await this.consumer.connect();
        await this.consumer.subscribe({
            topic: "REMEDI-kafka",
            fromBeginning: true,
        });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if (message.value) {
                    console.log({
                        value: message.value.toString(),
                    });
                }
            },
        });
    };
}

export default new InitKafka();
