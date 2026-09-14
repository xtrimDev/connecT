import Project from "./Project";
import Event from "./Event";
import Channel from "./Channel";

abstract class Workspace {
    #projects: Project[] = [];
    #events: Event[] = [];
    #channels: Channel[] = [];

    addProject(project: Project) {
        this.#projects.push(project);
    }

    removeProject(project: Project) {
        this.#projects = this.#projects.filter(p => p !== project);
    }

    addEvent(event: Event) {
        this.#events.push(event);
    }

    removeEvent(event: Event) {
        this.#events = this.#events.filter(e => e !== event);
    }

    addChannel(channel: Channel) {
        this.#channels.push(channel);
    }

    removeChannel(channel: Channel) {
        this.#channels = this.#channels.filter(c => c !== channel);
    }
}

export default Workspace;