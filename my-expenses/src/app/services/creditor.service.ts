import { Injectable } from '@angular/core';
import { Creditor } from '../models/creditor';
import { FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

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
            paid: false,
            username: "admin"
        },
        {
            name: 'Patrick',
            amount: 12,
            description: 'Ciné',
            date: new Date(),
            paid: false,
            username: "admin"
        }
    ];
    paidCredits: Creditor[] = [
        {
            name: 'Jean',
            amount: 200,
            description: 'Vacances',
            date: new Date(),
            paid: true,
            username: "admin"
        }
    ];


    constructor(private loginService: LoginService) {

    }

    public addCreditor(form: FormGroup) {
        form.value.paid = false;
        form.value.date = new Date();
        form.value.username = this.loginService.currentUser.username;
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