import { Injectable } from '@angular/core';
import { Creditor } from '../models/creditor';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class CreditorService {

    unPaidCredits: Creditor[] = [];
    paidCredits: Creditor[] = [];
    creditors: Creditor[] = [
        {
            name: 'Vincent',
            amount: 20,
            description: 'Pizza',
            date: new Date(),
            paid: false
        },
        {
            name: 'Patrick',
            amount: 12,
            description: 'Ciné',
            date: new Date(),
            paid: false
        },
        {
            name: 'Jean',
            amount: 200,
            description: 'Vacances',
            date: new Date(),
            paid: true
        },
    ];

    public resetTables() {
        this.unPaidCredits = [];
        this.paidCredits = [];
    }

    public getCreditors() {
        return this.creditors;
    }

    public addCreditor(form: FormGroup) {
        form.value.paid = false;
        form.value.date = new Date();
        this.unPaidCredits.push(form.value);
    }


    public updateCredits() {
        this.resetTables();
        for (let i = 0; i < this.creditors.length; i++) {
            if (!this.creditors[i].paid) {
                this.unPaidCredits.push(this.creditors[i]);
            }
            else {
                this.paidCredits.push(this.creditors[i]);
            }
        }
    }

    public getUnPaidCredits() {
        return this.unPaidCredits;
    }
}