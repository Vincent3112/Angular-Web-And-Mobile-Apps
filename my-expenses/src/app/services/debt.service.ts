
import { Injectable } from '@angular/core';
import { Debt } from '../models/debt';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class DebtService {


    debts: Debt[] = [
        {
            name: 'Alfred',
            amount: 15,
            description: 'Peacock',
            date: new Date(),
            paid: false
        },
        {
            name: 'John',
            amount: 12,
            description: 'DGTL',
            date: new Date(),
            paid: false
        },
        {
            name: 'Jean',
            amount: 150,
            description: 'Holidays',
            date: new Date(),
            paid: true
        },
    ];

    unPaidDebts: Debt[] = [];
    paidDebts: Debt[] = [];


    public updateDebts() {
        for (let i = 0; i < this.debts.length; i++) {
            if (!this.debts[i].paid) {
                this.unPaidDebts.push(this.debts[i]);
            }
        }
        for (let i = 0; i < this.debts.length; i++) {
            if (this.debts[i].paid) {
                this.paidDebts.push(this.debts[i]);
            }
        }
    }

    public getUnPaidDebts() {
        return this.unPaidDebts;
    }

    public addDebt(form: FormGroup) {
        form.value.paid = false;
        form.value.date = new Date();
        this.unPaidDebts.push(form.value);
    }
}