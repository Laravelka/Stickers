
class Websocket {
	constructor(args) {
		if (typeof args === 'string')
		{
			this.ws = new WebSocket(args);
		}
		else
		{
			this.wss = (args.wss ? 'wss://' : 'ws://');
			this.port = (args.port ? args.port : 3000);
			this.query = (
				args.query ? this.toQuery(args.query) : ''
			);
			this.domain = (args.domain ? args.domain : false);

			if (!this.domain)
			{
				throw new Error('Параметр "domain" обязателен.');
			}
			else
			{
				this.ws = new WebSocket(this.wss + this.domain + ':' + this.port + '/?' + this.query);
			}
		}
	}

	on(type = 'error', callback) {
		this.ws.addEventListener(type, callback)
	}

	sub(channel, callback) {
		this.on('message', (e) => {
			const event = JSON.parse(e.data);
			
			if (channel == event.channel)
			{
				callback(event.data, channel);
			}
		});
	}

	pub(channel, data) {
		const objectData = {
			data: data,
			channel: channel,
		};
		return this.send(objectData);
	}

	send(data) {
		if (typeof data === 'object')
		{
			return this.ws.send(JSON.stringify(data, null, 4));
		}
		else
		{
			return this.ws.send(data);
		}
	}

	toQuery(data) {
		let i = 0;
		let query = '';

		for(vakey in data)
		{
			i++;
			query += key + '=' + data[key] + (Object.keys(data).length !== i ? '&' : '');
		}
		return query;
	}
}
module.exports = Websocket;
