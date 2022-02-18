import { GuildChannel } from '@structures/GuildChannel';
import { Client } from '@client/Client';
import { Message } from '@structures/Message';
import { ParseApiError } from '@utils/ParseApiError';

/**
 * Represents a text channel.
 * @extends {GuildChannel}
 */
export class TextChannel extends GuildChannel {
    #client: Client;

    /**
     * Creates a new TextChannel instance.
     * @param id The channel ID.
     * @param client The client instance.
     */
    public constructor(data: any = {}, client: Client) {
        super(data, client);

        this.#client = client;
    }

    /**
     * Sends a message to the channel.
     * @param content The message content.
     * @returns {Promise<Message>} The sent message.
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
            throw new Error(ParseApiError(_));
        }
    }
}