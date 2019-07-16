export class Creditor {

    constructor(public name: string,
        public amount: number,
        public description: string,
        public date: Date,
        public paid: boolean,
        public username: string,
        public id?: string) {

    }
}