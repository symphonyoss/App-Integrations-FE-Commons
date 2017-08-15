export default class Renderer {
    constructor(name, messageEvents) {
        this._name = name;
        this.messageEvents = messageEvents;
        this.implements = ['render', 'action'];
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
            entity.registerRenderer(messageEvent, {}, this._name);
        });
    }
}