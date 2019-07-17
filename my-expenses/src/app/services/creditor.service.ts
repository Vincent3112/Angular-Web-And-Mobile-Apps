import { Injectable } from '@angular/core';
import { Creditor } from '../models/creditor';
import { FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Debt } from '../models/debt';

@Injectable({
    providedIn: 'root'
})

export class CreditorService {

    private paidCreditors: Observable<Creditor[]>;
    private unPaidCreditors: Observable<Creditor[]>;
    private unPaidCreditorsCollection: AngularFirestoreCollection<Creditor>;
    private paidCreditorsCollection: AngularFirestoreCollection<Creditor>;

    constructor(private loginService: LoginService, private afs: AngularFirestore) {
        this.unPaidCreditorsCollection = this.afs.collection<Creditor>('unPaidCreditors');
        this.unPaidCreditors = this.unPaidCreditorsCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                })
            })
        )

        this.paidCreditorsCollection = this.afs.collection<Creditor>('paidCreditors');
        this.paidCreditors = this.paidCreditorsCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                })
            })
        )
    }

    public getUnPaidCreditors(): Observable<Creditor[]> {
        return this.unPaidCreditors;
    }

    public getPaidCreditors(): Observable<Creditor[]> {
        return this.paidCreditors;
    }

    public addUnPaidCreditor(creditor: Creditor) {
        creditor.paid = false;
        creditor.date = new Date();
        creditor.username = this.loginService.currentUser.username;
        this.unPaidCreditorsCollection.add(creditor);
    }

    public addPaidCreditor(creditor: Debt) {
        creditor.date = new Date();
        this.paidCreditorsCollection.add(creditor);
    }

    public removePaidCreditor(username: string) {
        this.unPaidCreditorsCollection.doc(username).delete();
    }
}