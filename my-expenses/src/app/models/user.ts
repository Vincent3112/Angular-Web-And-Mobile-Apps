import { Debt } from './debt';
import { Creditor } from './creditor';

export class User {

    constructor(public username: string,
        public password: string,
        public unPaidDebts: Debt[],
        public paidDebts: Debt[],
        public unPaidCreditors: Creditor[],
        public paidCreditors: Creditor[]) {
    }
}