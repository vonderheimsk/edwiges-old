import { Client } from '@client/Client';
import { Message } from '@structures/Message';

/**
 * Represents a text channel.
 * @property {string} id The channel ID.
 */
export class TextChannel {
    public id: string;
    #client: Client;

    /**
     * Creates a new TextChannel instance.
     * @param id The channel ID.
     * @param client The client instance.
     */
    public constructor(id: string, client: Client) {
        if(!id) {
            throw new Error('Invalid id');
        }
        if(!client) {
            throw new Error('Invalid client');
        }

        this.#client = client;
        this.id = id;
    }

    /**
     * Sends a message to the channel.
     * @param content The message content.
     * @returns {Message} The sent message.
     */
    public async sendMessage(content: string): Promise<Message> {
        try {
            return new Message(await this.#client.rest.request({
                endpoint: `/channels/${this.id}/messages`,
                method: 'post',
                authorization: true,
                data: {
                    content
                }
            }), this.#client);
        } catch(_: any) {
            return _;
        }
    }
}