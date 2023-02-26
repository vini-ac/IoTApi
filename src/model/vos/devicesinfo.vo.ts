export class DevicesInfo {
    constructor(
        public readonly name: string,
        public readonly temperature: string,
        public readonly moisture: string,
        public readonly brightness: string
    ) {}
}