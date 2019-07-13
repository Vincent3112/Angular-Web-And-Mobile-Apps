
import { Injectable } from '@angular/core';
import { Debt } from '../models/debt';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class DebtService {

    unPaidDebts: Debt[] = [
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
        }
    ];
    paidDebts: Debt[] = [
        {
            name: 'Jean',
            amount: 150,
            description: 'Holidays',
            date: new Date(),
            paid: true
        }
    ];


    public getUnPaidDebts() {
        return this.unPaidDebts;
    }

    public getPaidDebts() {
        return this.paidDebts;
    }

    public addDebt(form: FormGroup) {
        form.value.paid = false;
        form.value.date = new Date();
        this.unPaidDebts.push(form.value);
    }

    public debtIsPaid(id: number, debt: Debt){
        this.unPaidDebts.splice(id, 1);
        this.paidDebts.push(debt);
    }
}