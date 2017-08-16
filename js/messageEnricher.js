export default class MessageEnricher {
    constructor(name, messageEvents) {
        this._name = name;
        this.messageEvents = messageEvents;
        this.implements = ['enrich', 'action'];
    }

    get name() {
        return this._name;
    }

    init() {
        SYMPHONY.services.make(this._name, this, this.implements, true);
    }

    register() {
        const entity = SYMPHONY.services.subscribe('entity');

        this.messageEvents.forEach((messageEvent) => {
            entity.registerRendererEnricher(messageEvent, {}, this._name);
        });
    }
}