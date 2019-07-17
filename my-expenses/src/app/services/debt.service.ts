
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Debt } from '../models/debt';
import { FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})

export class DebtService {

    private paidDebts: Observable<Debt[]>;
    private unPaidDebts: Observable<Debt[]>;
    private unPaidDebtsCollection: AngularFirestoreCollection<Debt>;
    private paidDebtsCollection: AngularFirestoreCollection<Debt>;

    constructor(private loginService: LoginService, private afs: AngularFirestore) {
        this.unPaidDebtsCollection = this.afs.collection<Debt>('unPaidDebts');
        this.unPaidDebts = this.unPaidDebtsCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                })
            })
        )

        this.paidDebtsCollection = this.afs.collection<Debt>('paidDebts');
        this.paidDebts = this.paidDebtsCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                })
            })
        )
    }

    public getUnPaidDebt(): Observable<Debt[]> {
        return this.unPaidDebts;
    }

    public getPaidDebt(): Observable<Debt[]> {
        return this.paidDebts;
    }

    public addUnPaidDebt(debt: Debt) {
        debt.paid = false;
        debt.date = new Date();
        debt.username = this.loginService.currentUser.username;
        this.unPaidDebtsCollection.add(debt);
    }

    public addPaidDebt(debt: Debt) {
        debt.date = new Date();
        this.paidDebtsCollection.add(debt);
    }

    public removePaidDebt(username: string) {
        this.unPaidDebtsCollection.doc(username).delete();
    }

    public updateDebt(id: string, debt: Debt): Promise<void> {
        return this.unPaidDebtsCollection.doc(id).update({ name: debt.name, amount: debt.amount, description: debt.description })
    }


}