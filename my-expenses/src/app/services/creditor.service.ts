import { Injectable } from '@angular/core';
import { Creditor } from '../models/creditor';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class CreditorService {

    unPaidCredits: Creditor[] = [
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
        }
    ];
    paidCredits: Creditor[] = [
        {
            name: 'Jean',
            amount: 200,
            description: 'Vacances',
            date: new Date(),
            paid: true
        }
    ];

    public addCreditor(form: FormGroup) {
        form.value.paid = false;
        form.value.date = new Date();
        this.unPaidCredits.push(form.value);
    }


    public getUnPaidCredits() {
        return this.unPaidCredits;
    }

    public getPaidCredits() {
        return this.paidCredits;
    }

    public creditIsPaid(id: number, creditor: Creditor) {
        this.unPaidCredits.splice(id, 1);
        this.paidCredits.push(creditor);
    }
}